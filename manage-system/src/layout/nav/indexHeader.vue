<!--  -->
<template>
  <header>
    <h3>{{ $route.meta.title }}</h3>
    <i class="el-icon-arrow-down setting_icon" @click="dialogShow = !dialogShow"></i>
    <i :class="weatherClass" class="weather_icon"></i>
    <div class="cloud" >
      <h4>{{ nowTemperature }}</h4>
      <p>{{ city }} {{ lowTemperature }}~{{ highTemperature }}</p>
    </div>
    <div class="mask" @click="hidePanel"  v-show="dialogShow">
      <div class="table_" v-show="dialogShow" >
        <ul>
          <li><i class="el-icon-setting"></i>修改密码</li>
          <li><i class="el-icon-unlock"></i>退出登录</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    data() {
      return {
        city: '',
        lowTemperature: '',
        highTemperature: '',
        nowTemperature: '',
        weather: '',
        weatherClass: 'el-icon-sunny',
        dialogShow: false,
      };
    },
    mounted() {
      this.getCloud();
    },

    methods: {
      // 获取天气信息
      getCloud() {
        this.$ajax.get('https://www.tianqiapi.com/api/', {
          params: {
            version: 'v1',
            city: '杭州'
          }
        }).then(data => {
          let result = data.data
          this.city = result.city;
          this.lowTemperature = result.data[0].tem2 //白天温度
          this.highTemperature = result.data[0].tem1 //晚上温度
          this.nowTemperature = result.data[0].tem //当前温度
          //   this.weather = result.data[0].wea //当前天气

          switch (result.data[0].wea) {
            case '晴':
              this.weatherClass = 'el-icon-sunny';
              break;
            case '多云转晴':
            case '晴转多云':
              this.weatherClass = 'el-icon-cloudy-and-sunny';
              break;
            case '多云':
            case '阴':
              this.weatherClass = 'el-icon-cloudy';
              break;
            case '暴雨':
            case '大雨':
              this.weatherClass = 'el-icon-heavy-rain';
              break;
            case '雷阵雨':
              this.weatherClass = 'el-icon-lightning';
              break;
            default:
          }
        })
      },
      hidePanel(event) {
        let dialog = document.getElementsByClassName("table_");
        if (dialog) {
          if (!dialog[0].contains(event.target)) { //这句是说如果我们点击到了id为myPanel以外的区域
            this.dialogShow = false;
          }
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  header {
    height: 50px;
    background: #388efd;
    padding-right: 30px;
    h3{
      display: inline-block;
      line-height: 50px;
      padding-left: 25px;
      color: #fff;
    }
    .mask{
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.1);
        z-index: 12;
    }
    .cloud {
      width: 200px;
      height: 100%;
      float: right;
      color: #fff;
      text-align: right;
      margin: 0 15px 0 0;

      h4 {
        font-size: 25px;
      }

      p {
        font-size: 12px;

        i {
          font-size: 12px;
          float: left;
        }
      }
    }

    i.weather_icon {
      float: right;
      font-size: 35px;
      font-weight: bold;
      margin-top: 7px;
      color: #fff;
      float: right;
    }

    i.setting_icon {
      font-size: 15px;
      margin: 20px;
      cursor: pointer;
      color: #fff;
      float: right;
    }
  }

  .table_ {
    width: 200px;
    // height: 100px;
    background: #fff;
    position: fixed;
    right: 20px;
    top: 55px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px #ccc;
    border: 1px solid #ccc;
    border-bottom: 0;
    animation: go_in 1s;

    ul {
      li {
        padding: 10px 30px;
        border-bottom: 1px solid #fff;
        text-align: left;
        cursor: pointer;
        color: #4E5155;

        i {
          margin-right: 30px;
          color: #40d7b6;
          font-weight: bold;
        }
      }

      li:nth-of-type(2) {
        border: none;

        i {
          color: #ffb85c;
        }
      }

      li:hover {
        background: rgba(201, 203, 206,.3);
        //  text-shadow: 5px 2px 2px #fff;
      }
    }
  }

  @keyframes go_in {
    0% {
      opacity: 0;
      //   transform: scale(0);
    }

    100% {
      opacity: 1;
      //   transform: scale(1);
    }

  }
</style>