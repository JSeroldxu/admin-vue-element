<!-- 随机生成泡泡 -->
<template>
  <div class="pp_box">
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },

    mounted() {
      this.setPaopao()
    },

    methods: {
      setPaopao() {
        let ppNum = Math.floor(Math.random() * 30)
        let ScreenWidth = document.documentElement.clientWidth;
        let ScreenHeight = document.documentElement.clientHeight;
        let ppBox = document.getElementsByClassName('pp_box')
        for (let i = 0; i < ppNum; i++) {
          let pp = document.createElement('div');
          pp.className = 'paopao';
          pp.style.left = Math.random() * ScreenWidth + 'px';
          pp.style.top = Math.random() * ScreenHeight + 'px';
          pp.style.backgroundColor = this.randowColor()
          ppBox[0].appendChild(pp);
        }
      },
    //   随机颜色
      randowColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")"
      }
    }
  }
</script>
<style lang='less' scoped>
  .pp_box {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 1800px 800px;
    position: absolute;
  }
  


</style>
<style>
.paopao {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid transparent;
    animation: mywaves 5s infinite;
  }
  @keyframes mywaves {
    from {
      opacity: .5;
      position: absolute;
      width: 0;
      height: 0;
    }

    to {
      opacity: 0;
      position: absolute;
      width: 150px;
      height: 150px;
    }
  }

</style>
