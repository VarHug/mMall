<template>
  <transition appear name="slide">
    <div class="checkout">
      <common-header title="填写订单" @back="back"></common-header>
      <div class="address-area" @click="showAddress">
        <div v-if="checkedAddress.name" class="text">
          <div class="people">
            <span class="name">{{checkedAddress.name}}</span>
            <span class="tel">{{checkedAddress.tel}}</span>
          </div>
          <div class="address">{{checkedAddress.area + checkedAddress.detailAddress}}</div>
        </div>
        <div v-else class="text">请选择收货地址</div>
        <i class="cubeic-arrow"></i>
      </div>
      <ul class="checked-list">
        <li class="checked-list-item" v-for="(item, index) in checkedList" :key="index">
          <div class="img-wrapper">
            <img width="100%" :src="item.pic">
          </div>
          <div class="good-content">
            <p class="good-name">{{item.name}}</p>
            <div class="good-line">
              <div class="good-price">{{item.price | price}}</div>
              <div class="good-count">数量：{{item.num}}</div>
            </div>
          </div>
        </li>
      </ul>
      <div class="submit">
        <div class="checked-preice">{{getCheckedTotalPrice() | price}}</div>
        <div class="submit-btn">提交订单</div>
      </div>
      <m-address ref="address"></m-address>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import Address from 'views/address/address'
import CommonHeader from 'components/common-header/common-header'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapGetters([
      'checkedList',
      'addressList',
      'checkedAddress'
    ])
  },
  methods: {
    back() {
      this.$router.back()
    },
    getCheckedTotalPrice() {
      let totalPrice = 0
      for (let i = 0, len = this.checkedList.length; i < len; i++) {
        totalPrice += this.checkedList[i].num * this.checkedList[i].price
      }
      return totalPrice
    },
    showAddress() {
      this.$refs.address.show()
    }
  },
  components: {
    MAddress: Address,
    CommonHeader
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"

.checkout
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  z-index 10
  background #f8f8f8
  .address-area
    display flex
    align-items center
    padding 0.5rem
    margin-bottom 0.5rem
    background #fff
    font-size 0.8rem
    .text
      flex 1
      line-height 1.5
    .people
      font-size 0.8rem
      font-weight 400
      .name
        margin-right 2rem
    .address
      font-size 0.7rem
    .cubeic-arrow
      font-size 1rem
  .checked-list
    padding 0.5rem
    background #fff
    .checked-list-item
      display flex
      align-items center
      padding 0.5rem 0
      .img-wrapper
          flex 0 0 5rem
          margin-right 0.5rem
          width 5rem
        .good-content
          flex 1
          line-height 1.5
          .good-name
            font-size 0.7rem
          .good-line
            display flex
            justify-content space-between
            align-items center
            font-size 0.8rem
            .good-price
              color #e93b3d
            .good-count
              color #999
  .submit
    display flex
    position fixed
    bottom 0
    width 100%
    height 50px
    line-height 50px
    .checked-preice
      flex 1
      color #e93b3d
      &:before
        content ""
        position absolute
        z-index 1
        pointer-events none
        background #ddd
        height 1px
        top 0
        right 0
        left 0
    .submit-btn
      flex 0 0 110px
      width 110px
      height 50px
      text-align center
      line-height 50px
      font-size 0.8rem
      font-weight 700
      color #fff
      background #e4393c

.slide-enter-active, .slide-leave-active
  transition all .5s
.slide-enter, .slide-leave-to
  position absolute
  transform translate3d(100%, 0, 0)

</style>
