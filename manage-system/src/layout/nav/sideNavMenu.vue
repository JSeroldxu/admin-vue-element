<!--  -->
<template>
  <div class="menu_box">

    <div class="menu_title" @click="openLink">
      <i :class="icon" id="left_icon"></i>
      <p>用户管理</p>
      <i :class="arrowIcon" id="right_icon" v-show="icons"></i>
    </div>
    <div v-show="navChildShow" class="menu_child">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      icon: String,
      to: null,
      active: {
        type: Boolean,
        default: false
      },
      open: {
        type: Boolean,
        default: false
      },
      icons:{
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        arrowIcon: 'el-icon-arrow-left',
        navChildShow: false,
        // iconShow: true,
      };
    },
    upDate(){
      console.log(this.iconBoolean)
    },
    computed: {},

    mounted() {},

    methods: {
      ClickIconShow(){
        this.iconShow = !this.iconShow
      },
      openLink() {
        if (this.arrowIcon == 'el-icon-arrow-left') {
          this.navChildShow = true;
          this.arrowIcon = 'el-icon-arrow-down'
        } else {
          this.navChildShow = false;
          this.arrowIcon = 'el-icon-arrow-left'
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  .menu_box {
    width: 100%;
    min-height: 40px;
    // background: #ccc;
    position: relative;

    .menu_child {
      //   padding: 10px 0;
      transition: all .5s linear;
      cursor: pointer;
    }

    .menu_title {
      overflow: hidden;
      
      p {
        text-align: left;
        line-height: 40px;
        color: rgb(97, 93, 93);
        text-indent: 30px;
        white-space: nowrap;
      }

      i {
        color: #378eff;
        font-size: 16px;
        line-height: 40px;
        position: absolute;
        top: 0;
      }

      #left_icon {
        left: 10px;

      }

      #right_icon {
        right: 10px;
      }
    }

    .active {
      background: #378eff;
      border-radius: 5px;

      i,
      p {
        color: #fff;
      }
    }

    // .open {
    //   background: #fff;

    //   i,
    //   p {
    //     color: rgb(97, 93, 93);
    //   }
    // }

    .menu_title:hover {
      background: #378eff;
      border-radius: 5px;
    }

    .menu_title:hover i,
    .menu_title:hover p {
      color: #fff;
    }
  }
</style>