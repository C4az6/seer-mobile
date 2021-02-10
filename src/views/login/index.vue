<template>
  <div class="login-container">
    <!-- nav-bar部分 start -->
    <div class="nav-bar-wrap">
      <van-nav-bar
      title="注册/登录"
      left-arrow
      @click-left="$router.back()"
    />
    </div>
    <!-- nav-bar部分 end -->

    <!-- 表单部分 start -->
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        clearable
        left-icon="shouji"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button class="send-code" size="small" @click="handleSendCode">发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <!-- 表单部分 end -->
    <div class="login-btn-wrap">
      <van-button class="login-btn" block  @click="handleSendCode">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 发送验证码函数
    handleSendCode () {
      console.log('发送验证码...')
    }
  }
}
</script>

<style scoped lang="less">
  .login-btn-wrap {
    padding: 20px;
    .login-btn {
      background-color: #6db4fb;
      color: #fff;
    }
  }

  .send-code {
    background-color: #6db4fb;
    color: #fff;
  }
</style>
