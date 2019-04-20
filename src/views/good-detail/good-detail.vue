<template>
  <transition name="slide">
    <div class="detail" v-show="showFlag">
      <header>
        <h1 class="title">
          <div class="back" @click="hide">
            <i class="cubeic-back"></i>
          </div>
          <div class="text">商品</div>
        </h1>
      </header>
      <div class="scroll-wrapper">
        <cube-scroll>
          <cube-slide class="good-detail-slide" :data="good.images">
            <cube-slide-item v-for="(item, index) in good.images" :key="index">
              <div class="img-wrapper">
                <img :src="item" width="100%">
              </div>
            </cube-slide-item>
          </cube-slide>
          <div class="good-desc">
            <h2 class="good-name">{{good.name}}</h2>
            <p class="good-price">{{good.price | price}}</p>
          </div>
          <div class="good-detail">
            <img width="100%" :src="item" v-for="(item, index) in good.detail" :key="index">
          </div>
        </cube-scroll>
      </div>
      <footer>
        <div class="cart">
          <i class="icon-cart"></i>
          <div class="cart-text">购物车</div>
        </div>
        <div class="add-cart" @click.stop="addCart(good)">加入购物车</div>
        <div class="buy">立刻购买</div>
      </footer>
      <top-tip ref="topTip" :delay="delay">
        <div class="tip-title">商品已添加至购物车</div>
      </top-tip>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { saveGood } from 'common/js/cache.js'
import { mapGetters, mapMutations } from 'vuex'
import TopTip from 'components/top-tip/top-tip'

export default {
  props: {
    good: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showFlag: false,
      delay: 1000
    }
  },
  computed: {
    ...mapGetters([
      'cartList'
    ])
  },
  methods: {
    ...mapMutations({
      setCartList: 'SET_CARTLIST'
    }),
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    addCart(good) {
      let goodInfo = {
        gid: good.gid,
        num: 1,
        price: good.price,
        name: good.name,
        pic: good.pic,
        isChecked: false
      }
      this.setCartList(saveGood(goodInfo))
      this.$refs.topTip.show()
    }
  },
  components: {
    TopTip
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"

.slide-enter-active, .slide-leave-active
  transition all .3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)

.detail
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  z-index 100
  background #fff
  header
    padding 0 0.5rem
    height 50px
    .title
      text-align center
      line-height 50px
      .back
        float left
        width 1.2rem
        extend-click()
  .scroll-wrapper
    position fixed
    top 50px
    right 0
    bottom 50px
    left 0
    .good-detail-slide
      .img-wrapper
        position relative
        width 100%
        height 0
        padding-top 100%
        img
          position absolute
          top 0
          left 0
          width 100%
          height 100%
    .good-desc
      border-top 1px solid #ddd
      border-bottom 1px solid #ddd
      padding 0.5rem
      line-height 1.5
      .good-name
        font-size 0.8rem
      .good-price
        font-size 0.8rem
        font-weight 600
        color #e4393c
    .good-detail
      padding-top 0.5rem
      font-size 0
  footer
    display flex
    align-items center
    position fixed
    left 0
    right 0
    bottom 0
    height 50px
    background #fff
    .cart
      flex 0 0 2.5rem
      width 2.5rem
      text-align center
      .icon-cart
        font-size 1.3rem
      .cart-text
        line-height 1.5
        font-size 0.6rem
    .add-cart, .buy
      flex 1
      text-align center
      line-height 50px
      font-size 0.8rem
      color #fff
    .add-cart
      background #ff9600
    .buy
      background #e4393c
  .top-tip
    height 50px
    text-align center
    line-height 50px
    color #fff
    font-size 0.8rem
</style>
