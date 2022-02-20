<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">管理员登录</h3>
      </div>

      <el-form-item prop="loginId">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="loginId"
          v-model="loginForm.loginId"
          placeholder="管理员账号"
          name="loginId"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="管理员密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <div class="verification">
        <el-form-item prop="captcha" class="verifi-text">
          <span class="svg-container">
            <i class="el-icon-circle-check"></i>
          </span>
          <el-input
            ref="verifi"
            v-model="loginForm.captcha"
            type="text"
            placeholder="验证码"
            name="captcha"
            tabindex="3"
          />
        </el-form-item>
        <div class="verifiImg" v-html="verifiImg" @click="getVerifiImg"></div>
      </div>
      <el-checkbox v-model="loginForm.checked" class="checked"
        >本周直接登录</el-checkbox
      >
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
// import { validUsername } from "@/utils/validate";
import { loginVerifi } from "@/api/loginVerifi.js";
export default {
  async created() {
    //获取验证码
    const rep = await loginVerifi();
    this.verifiImg = rep;
  },

  name: "Login",
  data() {
    const validateVerifi = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入管理员账号"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("请输入管理员密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        loginId: "",
        password: "",
        captcha: "",
        checked: false,
      },
      verifiImg: "",
      loginRules: {
        loginId: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        captcha: [
          { required: true, trigger: "blur", validator: validateVerifi },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    async getVerifiImg() {
      this.verifiImg = await loginVerifi();
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const userInfo = {
            captcha: this.loginForm.captcha,
            loginId: this.loginForm.loginId,
            loginPwd: this.loginForm.password,
          };
          if (this.loginForm.checked) {
            userInfo.remember = 7;
          }
          this.loading = true;
          this.$store.dispatch("user/login", userInfo).then((r) => {
            let response = r;
            response = typeof r == "string" ? JSON.parse(r) : r;
            if (response.data) {
              this.$router.push({path: '/'});
              this.loading = false;
            } else {
              loginVerifi().then(r=>{
                this.verifiImg = r;
              });
              this.loginForm.captcha = '';
              if (response.msg) {
                this.$message.error(response.msg);
              }else {
                this.$message.error('用户名或密码错误！');
              }
              this.loading = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .checked {
      padding-bottom: 10px;
    }
    .verification {
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      .verifi-text {
        width: 65%;
      }
      .verifiImg {
        cursor: pointer;
        width: 140px;
        margin-bottom: 22px;
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
