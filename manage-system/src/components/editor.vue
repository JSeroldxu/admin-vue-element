<template>
  <textarea :id='id' :value='value'></textarea>
</template>

<script>
  // Import TinyMCE
  import * as OSS from 'ali-oss'
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/silver/theme'
  import 'tinymce/plugins/advlist' // 这几条引入是因为我的导入不了，不知道为啥
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/textcolor'
  import 'tinymce/plugins/paste'
  import 'tinymce/plugins/textcolor'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/skins/ui/oxide/skin.css'

  const INIT = 0
  const CHANGED = 2
  // var EDITOR = null
  export default {
    props: {
      value: {
        type: String,
        editor: null,
        required: true
      },
      setting: {},
      url: { // 接口
        default: '',
        type: String
      },
      accept: { // 文件类型
        default: 'image/jpeg, image/png',
        type: String
      },
      maxSize: { // 大小
        default: 2097152,
        type: Number
      },
      withCredentials: {
        default: false,
        type: Boolean
      }
    },
    watch: {
      value: function (val) {
        // console.log('init ' + val)
        if (this.status === INIT || tinymce.activeEditor.getContent() !== val) {
          tinymce.activeEditor.setContent(val)
        }
        this.status = CHANGED
      }
    },
    data() {
      return {
        status: INIT,
        id: 'editor-' + new Date().getMilliseconds(),
        init: {
          language_url: '/static/tinymce/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/static/tinymce/skins/lightgray',
          height: 300,
          plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
          toolbar:
            'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
          branding: false
        }
      }
    },
    methods: {},
    mounted() {
      tinymce.init({})
      const _this = this
      const setting =
        {
          selector: '#' + _this.id,
          upload_image_url: '/upload/cloud', // 配置的上传图片的路由
          language_url: '/static/tinymce/zh_CN.js',
          language: 'zh_CN',
          init_instance_callback: function (editor) {
            // EDITOR = editor
            // console.log('Editor: ' + editor.id + ' is now initialized.')
            editor.on('input change undo redo', () => {
              var content = editor.getContent()
              _this.$emit('show', content)
            })
          },
          content_style: `
    *                         { padding:0; margin:0; }
    html, body                { height:100%; }
    img                       { max-width:100%; display:block;height:auto; }
    a                         { text-decoration: none; }
    iframe                    { width: 100%; }
    p                         { line-height:1.6; margin: 0px; }
    table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
    .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
    ul,ol                     { list-style-position:inside; }
  `,
          insert_button_items: 'image link | inserttable',
          paste_retain_style_properties: 'all',
          paste_word_valid_elements: '*[*]', // word需要它
          paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
          paste_convert_word_fake_lists: false, // 插入word文档需要该属性
          paste_webkit_styles: 'all',
          paste_merge_formats: true,
          nonbreaking_force_tab: false,
          paste_auto_cleanup_on_paste: false,
          // CONFIG: Font
          fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',
          // CONFIG: StyleSelect
          style_formats: [
            {
              title: '首行缩进',
              block: 'p',
              styles: { 'text-indent': '2em' }
            },
            {
              title: '行高',
              items: [
                { title: '1', styles: { 'line-height': '1' }, inline: 'span' },
                { title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span' },
                { title: '2', styles: { 'line-height': '2' }, inline: 'span' },
                { title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span' },
                { title: '3', styles: { 'line-height': '3' }, inline: 'span' }
              ]
            }
          ],
          // FontSelect
          font_formats: `
            微软雅黑=微软雅黑;
            宋体=宋体;
            黑体=黑体;
            仿宋=仿宋;
            楷体=楷体;
            隶书=隶书;
            幼圆=幼圆;
            Andale Mono=andale mono,times;
            Arial=arial, helvetica,
            sans-serif;
            Arial Black=arial black, avant garde;
            Book Antiqua=book antiqua,palatino;
            Comic Sans MS=comic sans ms,sans-serif;
            Courier New=courier new,courier;
            Georgia=georgia,palatino;
            Helvetica=helvetica;
            Impact=impact,chicago;
            Symbol=symbol;
            Tahoma=tahoma,arial,helvetica,sans-serif;
            Terminal=terminal,monaco;
            Times New Roman=times new roman,times;
            Trebuchet MS=trebuchet ms,geneva;
            Verdana=verdana,geneva;
            Webdings=webdings;
            Wingdings=wingdings,zapf dingbats`,
          'plugins': [
            'advlist link image',
            'code',
            'table textcolor paste textcolor colorpicker'
          ], // 配置
          'toolbar_items_size': 'small',
          'block_formats': 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;',
          'toolbar1': 'table |insertfile undo redo | formatselect | link unlink | uploadimg image media', // 工具栏1
          'toolbar2': ' fontsizeselect | forecolor backcolor | fontselect bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | removeformat', // 工具栏2
          // 图片上传
          images_upload_handler: function (blobInfo, success, failure) {


            //先用oss解析富文本的内容
            _this.$api.oss.update(data => {
              new OSS.Wrapper({
                region: "oss-cn-hangzhou",
                accessKeyId: data.accessKeyId,
                accessKeySecret: data.accessKeySecret,
                stsToken: data.securityToken,
                // bucket: 'mybg'c
                bucket: 'zhiyuan-hz'
              })
                .put(data.key, blobInfo.blob())
                .then(data => {
                  _this.$emit('on-upload-success', data.url)
                  failure('上传成功')
                })
                .catch(function (err) {
                  console.error("error: %j", err);
                });
            });


            // console.log(blobInfo.blob())
            // const formData = new FormData()
            // formData.append('file', blobInfo.blob())
            // failure(blobInfo)
            // _this.$emit('on-ready', blobInfo.blob().size, blobInfo.blob())
            // if (blobInfo.blob().size > _this.maxSize) {
            //   failure('文件体积过大')
            // }
            // if (_this.accept.indexOf(blobInfo.blob().type) >= 0) {
            //   uploadPic()
            // } else {
            //   failure('图片格式错误')
            // }
            // function uploadPic() { // 发送请求
            //   const xhr = new XMLHttpRequest()
            //   const formData = new FormData()
            //   xhr.withCredentials = _this.withCredentials
            //   xhr.open('POST', _this.url)
            //   xhr.onload = function() {
            //     failure('上传---' + xhr.status)
            //     if (xhr.status !== 200) {
            //       // 抛出 'on-upload-fail' 钩子
            //       _this.$emit('on-upload-fail')
            //       failure('上传失败: ' + xhr.status)
            //       return
            //     }
            //     const json = JSON.parse(xhr.responseText)
            //     // 抛出 'on-upload-success' 钩子
            //     _this.$emit('on-upload-success', [
            //       json, success, failure
            //     ])
            //   }
            //   xhr.onerror = function() {
            //     _this.$emit('on-ready', '上传失败')
            //   }
            //   formData.append('file', blobInfo.blob())
            //   xhr.send(formData)
            // }
          }
        }
      Object.assign(setting, _this.setting)

      tinymce.init(setting)
    },
    beforeDestroy: function () {
      tinymce.get(this.id).destroy()
    }
  }
</script>
