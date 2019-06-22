<!--  -->
<template>
  <div class="side_nav" :style="flexStyle">
    <header>
      <h4 v-show="titleShow" class="title_h4" @click="$router.push({name:'indexPage'})">Welcome ！</h4>
      <i :class="iconClass" @click="hanleClick()"></i>
      <div style="overflow:hidden;width: 180px;min-height: 100px; margin: 50px auto 0;">
        <div class="user_info" v-show="titleShow">
          <div class="user_icon">
            <img src="/static/images/head1.jpg" alt="">
          </div>
          <div class="user_name">
            <h4>一家都整整齐齐的</h4>
            <p>超级管理员</p>
          </div>
        </div>
      </div>

    </header>
    <section>
      <sideNavMenu :icons="iconShow" icon="el-icon-mobile" :active="isMenuActive('/user')" :open="isMenuOpen('/user')">
        <sideNavRouterLink to="/tailor">裁剪屏幕</sideNavRouterLink>
        <sideNavRouterLink to="/richExample">富文本编辑器</sideNavRouterLink>
        <sideNavRouterLink to="/vueCropper">裁剪图片</sideNavRouterLink>
        <sideNavRouterLink to="/user/manage">用户列表</sideNavRouterLink>
      </sideNavMenu>


      <sideNavMenu :icons="iconShow" icon="el-icon-mobile" :active="isMenuActive('/statement')"
        :open="isMenuOpen('/user')" />
    </section>
  </div>
</template>

<script>
  import sideNavMenu from './nav/sideNavMenu'
  import sideNavRouterLink from './nav/sideNavRouterLink'
  export default {
    components: {
      sideNavMenu,
      sideNavRouterLink,
    },
    data() {
      return {
        flexStyle: '',
        flexShow: true,
        titleShow: true,
        iconShow: true,
        iconClass: 'el-icon-s-fold'
      };
    },



    computed: {},

    mounted() {},

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      // 点击伸缩
      hanleClick() {
        if (this.flexShow) {
          this.flexStyle = 'width:50px;transition:all .5s linear;';
          this.titleShow = false;
          this.iconClass = 'el-icon-s-unfold';
          this.iconShow = false;
          // setTimeout(() => {
          //   this.titleShow = false;
          // }, 500)
        } else {
          this.flexStyle = 'transition:all .5s linear;';
          this.iconClass = 'el-icon-s-fold';
          this.iconShow = true;
          setTimeout(() => {
            this.titleShow = true;
          }, 500)
        }
        this.flexShow = !this.flexShow
      },
      isMenuActive(url) {
        // return this.$route.path.indexOf(url) === 0
      },
      isMenuOpen(url) {
        // return this.$route.path.indexOf(url) === 0
      }
    }
  }
</script>
<style lang='less' scoped>
  .side_nav {
    height: 100%;
    width: 250px;
    background: #fff;
    overflow: hidden;
    float: left;

    header {
      min-height: 50px;
      padding: 0 10px;
      position: relative;
      overflow: hidden;

      h4.title_h4 {
        text-align: center;
        line-height: 50px;
        width: calc(100% - 25px);
        position: absolute;
        color: #388efd;
        font-weight: bold;
        cursor:pointer;
      }

      i {
        font-size: 25px;
        color: #388efd;
        line-height: 50px;
        position: absolute;
        right: 10px;
        cursor: pointer;
      }

      div.user_info {
        width: 180px;
        height: 100px;
        background: #eff0f2;
        border-radius: 10px;
        // margin: 50px auto 0;
        padding: 5px;

        .user_icon {
          height: 100px;
          float: left;

          img {
            width: 50px;
            height: 50px;
            margin-top: 15px;
            border-radius: 50%;
          }
        }

        .user_name {
          height: 100px;
          float: left;
          overflow: hidden;
          margin-top: 15px;

          h4 {
            width: 120px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 14px;
            line-height: 30px;
          }

          p {
            font-size: 12px;
          }
        }
      }
    }

    section {
      width: 100%;
      height: calc(100% - 50px);
      background: #fff;
      padding: 10px;

      ul {
        li {
          .route_title {}
        }
      }
    }
  }
</style>