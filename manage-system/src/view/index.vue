<!-- 首页 -->
<template>
  <div> 
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted(){
      this.getUrl()
  },

  methods: {
      getUrl(){
          let url = 'http://wei.test.51zhiyuan.net/index.html?token_android=0e876ea3dd9d4315af56256ba05e4d64&completeInformation=-1'
          let params = '?'+url.split('?')[1]
          let urlParams = new URLSearchParams(params)

          console.log(urlParams.get('token_android'))
          for(let i of urlParams){
              console.log(i)
          }
      }
  }
}

</script>
<style lang='less' scoped>

</style>