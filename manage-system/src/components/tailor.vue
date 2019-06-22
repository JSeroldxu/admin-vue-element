<!-- 裁剪DOM -->
<template>
  <div class="box">
    <div ref="tailor" class="tailor">
      <el-button type="primary" @click="tailorClick()">裁剪</el-button>
      <el-button type="primary" @click="canvasImg = ''">清空</el-button>
    </div>
    <img :src="canvasImg" alt="" style="margin-top:10px;width:100%">
  </div>
</template>

<script>
  import html2canvas from 'html2canvas'
  export default {
    data() {
      return {
        canvasImg: ''
      };
    },

    components: {},

    computed: {},

    mounted() {},

    methods: {
      tailorClick() {
        let app = document.getElementById('app')
        let box = this.$refs.tailor;
        html2canvas(app, {
          backgroundColor: '#fff',
          useCORS: true
        }).then((canvas) => {

          let img = canvas.toDataURL('image/png')
          this.canvasImg = img
        })
      }
    }
  }
</script>
<style lang='less' scoped>
  .box {
    width: 100%;
    // min-height: 100%;
    overflow: auto;

    .tailor {
      width: 100%;
      overflow: hidden;
    }
  }
</style>