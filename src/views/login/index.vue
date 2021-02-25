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
      <van-button class="login-btn" block  @click="handleUserLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { userLogin } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
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
    },
    // 用户登录函数
    async handleUserLogin () {
      // 启动loading效果
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      try {
        const response = await userLogin(this.user)
        console.log('登录成功', response)
        this.$toast.success('登录成功')
      } catch (error) {
        if (error.response.status === 400) {
          console.log('登录失败', error)
          this.$toast.fail('登录失败,手机号或验证码错误')
        }
      }
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

  .van-cell {
    align-items: center;
  }
</style>
