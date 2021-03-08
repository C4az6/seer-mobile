<template>
  <div class="article-item">
    <van-cell is-link :to="{name: 'article', params: {articleId: this.article.art_id}}">
      <div
        slot="title"
        class="title van-multi-ellipsis--l3"
      >
        {{ article.title }}
      </div>
      <div slot="label">
        <div class="cover-wrap" v-if="article.cover.type === 3">
            <van-image
              class="cover-item"
              fit="cover"
              v-for="(item, index) in article.cover.images"
              :key="index"
              :src="item"
            />
        </div>

        <div class="label-wrap">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate | relativeTime}}</span>
        </div>
      </div>
      <!-- 默认插槽名字叫 default，可以省略不写 -->
      <van-image
        class="right-cover"
        v-if="article.cover.type === 1"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.title {
  font-size: 16px;
  color: #3a3a3a;
  word-break: break-all;
}

.van-cell__title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/deep/ .van-cell__value {
  flex: unset;
  width: 116px;
  height: 73px;
  margin-left: 15px;
}

.right-cover {
  width: 116px;
  height: 73px;
}

.cover-wrap {
  display: flex;
  padding: 15px 0;
  .cover-item {
    flex: 1;
    height: 73px;
    &:not(last-child) {
      padding-right: 4px;
    }
  }
}

.label-wrap {
  font-size: 11px;
  color: #b4b4b4;
  span {
    margin-right: 12px;
  }
}

.van-cell:not(:last-child)::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 0.42667rem;
    border-bottom: 0.02667rem solid #ebedf0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
}

.van-cell:last-child::after {
    display: block;
}
</style>
