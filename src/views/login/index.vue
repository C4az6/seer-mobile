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
    <van-form
    @submit="onSubmit"
    @failed="onFailed"
    :show-error="false"
    :show-error-message="false"
    ref="form"
    >
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          icon-prefix="toutiao"
          clearable
          left-icon="shouji"
          placeholder="请输入手机号"
          type="tel"
          name="mobile"
          maxlength="11"
          :rules="formRules.mobile"
        />
        <van-field
          v-model="user.code"
          clearable
          icon-prefix="toutiao"
          left-icon="yanzhengma"
          placeholder="请输入验证码"
          name="code"
          maxlength="6"
          :rules="formRules.code"
        >
          <template #button>
            <van-button class="count-down-btn" type="default" size="small" disabled v-if="isCountDownShow">
              <van-count-down
                class="count-down"
                :time="1000 * 60"
                format="ss s"
                @finish="isCountDownShow = false"
              />
            </van-button>
            <van-button
             v-else
             class="send-code"
             size="small"
             @click.prevent="handleSendCode"
             :loading="isSendSmsLoading">发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <!-- 表单部分 end -->
      <div class="login-btn-wrap">
        <van-button class="login-btn" block  native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { userLogin, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      // 是否正在发送短信验证码
      isSendSmsLoading: false,
      // 是否显示倒计时
      isCountDownShow: false,
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      // 表单验证规则
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 提交表单验证失败函数
    onFailed (error) {
      this.$toast({
        message: error.errors[0].message,
        position: 'top'
      })
    },
    // 提交表单验证通过函数
    onSubmit (value) {
      this.handleUserLogin()
    },
    // 发送验证码函数
    async handleSendCode () {
      try {
        /*
          1. 判断手机号是否存在
          2. 验证手机号是否合法
          3. 以上校验通过则允许发送
        */
        await this.$refs.form.validate('mobile')
        // 验证通过，发送请求获取短信验证码
        /*
          记住一个原则：任何和网络交互有关的视图都应该在网络请求期间禁用，防止请求过慢导致多次触发请求行为
          这里给发送验证码添加一个loading效果，用来防止这种情况
        */
        this.isSendSmsLoading = true
        await sendSms(this.user.mobile)
        // 发送成功，显示倒计时
        this.isCountDownShow = true
      } catch (err) {
        // try 里面任何代码的错误都会进入 catch
        // 不同的错误需要有不同的提示，那就需要进行判断
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = '发送太频繁，请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单验证失败
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      // 无论失败与否都需要关闭loading效果
      this.isSendSmsLoading = false
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

  .count-down-btn {
    min-width: 50px;
    height: 28px;
  }
</style>
