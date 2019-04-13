<template>
  <div class="commodity">
    <cube-scroll-nav
      v-if="commodityList && commodityList.length > 0"
      :side="true"
      :data="commodityList"
      @change="changeHandler"
      @sticky-change="stickyChangeHandler">
      <cube-scroll-nav-panel
        v-for="(group, gsindex) in commodityList"
        :key="gsindex"
        :label="group.category"
        :title="group.category">
        <ul class="goods-list">
          <li class="good" v-for="(good, gindex) in group.goods" :key="gindex">
            <div class="good-img-wrapper">
              <img width="100%" :src="good.pic">
            </div>
            <div class="good-desc">
              <h3 class="good-name">{{good.name}}</h3>
              <p class="good-price">{{good.price | price}}</p>
              <p class="good-seller">{{good.seller}}</p>
            </div>
          </li>
        </ul>
      </cube-scroll-nav-panel>
    </cube-scroll-nav>
  </div>
</template>

<script type="text/ecmascript-6">
import { getCommodity } from 'api/commodity.js'
import { ERR_OK } from 'api/config.js'

export default {
  data() {
    return {
      commodityList: []
    }
  },
  created() {
    this._getCommodity()
  },
  methods: {
    _getCommodity() {
      getCommodity().then(res => {
        if (res.errno === ERR_OK) {
          this.commodityList = res.data
        }
      })
    },
    changeHandler(label) {
      console.log('changed to:', label)
    },
    stickyChangeHandler(current) {
      console.log('sticky-change', current)
    }
  },
  filters: {
    price(value) {
      return `￥${value}.00`
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.commodity
  position fixed
  top 0
  right 0
  bottom 45px
  left 0
  .cube-scroll-nav
    >>> .cube-scroll-nav-bar
          background #f8f8f8
          .cube-scroll-nav-bar-item_active
            color #e93b3d
            background #fff
    >>> .cube-scroll-nav-panel-title
          padding 0.8rem
          font-size 0.8rem
          font-weight bold
          background #f8f8f8
    .cube-scroll-nav-panel
      .goods-list
        line-height 1.5
        .good
          display flex
          padding 0.5rem
          font-size 0.8rem
          .good-img-wrapper
            flex 0 0 5rem
            margin-right .5rem
            width 5rem
          .good-desc
            flex 1
            .good-name
              display -webkit-box
              -webkit-box-orient vertical
              -webkit-line-clamp 2
              text-overflow ellipsis
              overflow hidden
            .good-price
              padding 0.5rem 0
              font-size 0.7rem
              color #e93b3d
            .good-seller
              font-size 0.6rem
</style>
