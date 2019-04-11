<template>
  <ul class="common-nav">
    <li>
      <router-link class="c-a-btn" tag="a" to="/index">
        <i class="c-a-icon icon-home"></i>
        <span>首页</span>
      </router-link>
    </li>
    <li>
      <router-link class="c-a-btn" tag="a" to="/commodity">
        <i class="c-a-icon icon-list"></i>
        <span>分类</span>
      </router-link>
    </li>
    <li>
      <router-link class="c-a-btn" tag="a" to="/cart">
        <i class="c-a-icon icon-cart"></i>
        <span>购物车</span>
      </router-link>
    </li>
    <li>
      <router-link class="c-a-btn" tag="a" to="/user">
        <i class="c-a-icon icon-mine"></i>
        <span>我的</span>
      </router-link>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      currentIndex: 0
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable.styl"

.common-nav
  display flex
  align-items center
  position fixed
  left 0
  right 0
  bottom 0
  height 45px
  li
    flex 1
    height 100%
    .c-a-btn
      display flex
      flex-direction column
      justify-content space-around
      align-items center
      padding 0 20px
      height 100%
      font-size 0.6rem
      &.router-link-active
        color #f23030
      .c-a-icon
        font-size $font-size-large-x
</style>
