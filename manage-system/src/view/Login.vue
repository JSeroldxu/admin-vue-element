<!--  -->
<template>
  <div class="login_box">
    <main>
      <header>
        <img src="/static/images/head1.jpg" alt="">
      </header>
      <div class="login_info">
        <div class="user_name">
          <p>账号：</p>
          <input type="text" class="input_" v-model="account">
        </div>
        <div class="pass_word">
          <p>密码：</p>
          <input type="password" class="input_"  v-model="password" @keyup.enter="Login()">
        </div>
      </div>
      <div class="btn_submit">
        <input type="submit" value="登录" class="login" @click="Login()">
      </div>
    </main>
    <randowPaopao/>
  </div>
</template>

<script>
import randowPaopao from '../components/randowPaopao'
  export default {
    components:{
      randowPaopao
    },
    data() {
      return {
        account:'',
        password:'',
      };
    },

    computed: {},

    mounted() {},

    methods: {
      Login() {
        this.$api.admin.login(data=>{
          console.log(data)
          window.sessionStorage.setItem('admin.token',data.token)
          this.$router.push({
          name: 'layoutIndex'
        })
        },{
          account:this.account,
          password:this.password,
        })
        
      }
    }
  }
</script>
<style lang='less' scoped>
  .login_box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background: url('/static/images/bg.jpg') no-repeat;
    background-size: cover;
    main {
      width: 300px;
      border:1px solid #ccc;
      border-radius: 5px;
      background: rgba(0,0,0,0.5);
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      padding: 15px;
      z-index: 10;
      header {
        width: 100%;
        overflow: hidden;

        // display: table;
        img {
          width: 50px;
          height: 50px;
          display: block;
          margin: 0 auto;
          border-radius: 50%;
        }
      }

      .login_info {
        overflow: hidden;
        margin-bottom: 15px;

        .pass_word {
          margin-top: 15px;
        }

        .user_name,
        .pass_word {

          p {
            margin-bottom: 10px;
            color: #fff;
          }

          input {
            width: 100%;
            padding: 10px 10px;
            border-radius: 3px;
          }
        }
      }

      div.btn_submit {
        overflow: hidden;

        .login {
          float: right;
          padding: 8px 15px;
          background: #378eff;
          color: #fff;
          border-radius: 3px;
        }
      }
    }

  }
</style>