<template>
  <div class="my-container">
    <van-cell-group class="my-info" v-if="user">
      <van-cell
        title="单元格"
        value="内容"
        center
        class="base-info"
        :border="false"
      >
        <van-image
          slot="icon"
          class="avatar"
          round
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div slot="title" class="name">前端扛把子</div>
        <van-button class="update-btn" size="small" round>编辑资料</van-button>
      </van-cell>
      <van-grid
      :border="false"
      class="data-info"
      >
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">123</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">123</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">123</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">123</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div v-else class="not-login">
      <div @click="$router.push('/login')"><img class="mobile" src="./phone.png" /></div>
      <div class="text">登录 / 注册</div>
    </div>
    <!-- 收藏历史部分 start -->
    <van-grid :column-num="2" class="nav-grid mb5">
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="shoucang" text="收藏" />
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="lishi" text="历史" />
    </van-grid>
    <!-- 收藏历史部分 end -->

    <van-cell title="消息通知" is-link to="/" />
    <van-cell class="mb5" title="小智同学" is-link to="/" />
    <van-cell v-if="user" class="login-out" title="退出登录" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState(['user']) // 将state里面的user数据映射到当前组件的data中方便使用
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.my-container {
  .my-info {
    background: url("./banner.png") no-repeat;
    background-size: cover;
    .base-info {
      background-color: unset;
      height: 115px;
      box-sizing: border-box;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        height: 24px;
        font-size: 10px;
        color: #666;
      }
    }

    /deep/ .van-grid-item__content {
      background-color: unset;
    }

    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
  }

  /deep/.nav-grid {
    .nav-grid-item {
      height: 70px;
      .toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }

      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }

  .login-out {
    text-align: center;
    color: #d86262;
  }
  .mb5 {
    margin-bottom: 5px;
  }

  .not-login {
    height: 180px;
    background: url('./banner.png') no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }
}
</style>
