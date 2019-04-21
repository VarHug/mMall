<template>
  <div class="cart">
    <div class="no-good" v-show="!cartList.length">购物车中还没有商品哦</div>
    <div class="scroll-wapper">
      <cube-scroll>
        <ul class="cart-list" v-show="cartList && cartList.length > 0">
          <div class="cart-list-header">
            <cube-checkbox v-model="isCheckAll" @input="handleCheckAllChange">
              <h2 class="title">北农自营</h2>
            </cube-checkbox>
          </div>
          <li class="cart-list-item" v-for="(item, index) in cartList" :key="index">
            <cube-checkbox
            v-model="checkedState[index]"
            @input="handleCheckedGoodChange(index)"
            :option="{label: ''}">
            </cube-checkbox>
            <div class="img-wrapper">
              <img width="100%" :src="item.pic">
            </div>
            <div class="good-content">
              <p class="good-name">{{item.name}}</p>
              <div class="good-line">
                <div class="good-price">{{item.price | price}}</div>
                <input-number v-model="goodsnum[index]" @change="handleNumChange(index)"></input-number>
              </div>
              <div class="good-sub-line"><span @click.stop="removeGood(item)">删除</span></div>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
    <div class="fix-bar">
      <div class="total">总计：<span class="total-price">{{getCheckedTotalPrice() | price}}</span></div>
      <div class="buy" :class="{'disabled': getCheckedTotalAmount() === 0}" @click="toCheckout()">去结算<span class="total-amount">({{getCheckedTotalAmount()}}件)</span></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex'
import { saveGood, setCheckedState, removeGood } from 'common/js/cache.js'
import InputNumber from 'components/input-number/input-number'

export default {
  data() {
    return {
      checkedState: [],
      goodsnum: [],
      isCheckAll: false
    }
  },
  computed: {
    ...mapGetters([
      'cartList'
    ])
  },
  methods: {
    ...mapMutations({
      setCartList: 'SET_CARTLIST',
      setCheckedList: 'SET_CHECKED_LIST'
    }),
    _initCheckedState(cartList) {
      this.checkedState = []
      for (let i = 0; i < cartList.length; i++) {
        this.checkedState[i] = cartList[i].isChecked
      }
      // 判断是否全选
      this.isCheckAll = this.checkedState.every(state => {
        return state === true
      })
    },
    _initGoodsNum(cartlist) {
      this.goodsnum = []
      for (let i = 0; i < cartlist.length; i++) {
        this.goodsnum[i] = cartlist[i].num
      }
    },
    handleCheckAllChange(val) {
      let states = []
      for (let i = 0; i < this.cartList.length; i++) {
        this.checkedState[i] = val
        let state = {}
        state.gid = this.cartList[i].gid
        state.isChecked = val
        states.push(state)
      }
      this.setCartList(setCheckedState(states))
    },
    handleCheckedGoodChange(index) {
      // 判断是否全选
      let flag = true
      for (let i = 0; i < this.checkedState.length; i++) {
        if (!this.checkedState[i]) {
          flag = false
          break
        }
      }
      this.isCheckAll = flag
      // 提交checkedState
      let states = []
      let state = {}
      state.gid = this.cartList[index].gid
      state.isChecked = this.checkedState[index]
      states.push(state)
      this.setCartList(setCheckedState(states))
    },
    // 单一商品数量改变
    handleNumChange(index) {
      // object深复制
      let goodInfo = JSON.parse(JSON.stringify(this.cartList[index]))
      // 新加入的数量
      goodInfo.num = this.goodsnum[index] - this.cartList[index].num
      this.setCartList(saveGood(goodInfo))
    },
    getCheckedTotalPrice() {
      let totalPrice = 0
      let checkedState = this.checkedState
      for (let i = 0, len = checkedState.length; i < len; i++) {
        if (checkedState[i]) {
          totalPrice += this.cartList[i].num * this.cartList[i].price
        }
      }
      return totalPrice
    },
    getCheckedTotalAmount() {
      let totalAmount = 0
      let checkedState = this.checkedState
      for (let i = 0, len = checkedState.length; i < len; i++) {
        if (checkedState[i]) {
          totalAmount += this.cartList[i].num
        }
      }
      return totalAmount
    },
    toCheckout() {
      let checkedList = []
      this.checkedState.forEach((state, index) => {
        if (state) {
          checkedList.push(this.cartList[index])
        }
      })
      if (checkedList.length > 0) {
        this.setCheckedList(checkedList)
        this.$router.push('/checkout')
      }
    },
    removeGood(good) {
      this.setCartList(removeGood(good.gid))
    }
  },
  created() {
    this._initCheckedState(this.cartList)
    this._initGoodsNum(this.cartList)
  },
  watch: {
    cartList(newCartList, oldCartList) {
      if (newCartList.length !== oldCartList.length) {
        this._initCheckedState(newCartList)
        this._initGoodsNum(newCartList)
      }
    }
  },
  components: {
    InputNumber
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.cart
  position fixed
  top 0
  right 0
  bottom 50px
  left 0
  z-index 1
  .no-good
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    white-space nowrap
  .scroll-wapper
    position absolute
    top 0
    bottom 50px
    width 100%
    .cart-list-header
      border-bottom 1px solid #f5f5f5
      padding 0 0.5rem
    .cart-list
      .cube-checkbox
        padding 0
      >>> .cube-checkbox_checked
        .cubeic-right
          color #e93b3d
      .cart-list-item
        display flex
        align-items center
        padding 0.5rem
        >>> .cube-checkbox-label
          display flex
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
            .good-price
              font-size 0.8rem
              color #e93b3d
          .good-sub-line
            margin-top 0.5rem
            line-height 1.5
            text-align right
            font-size 0.7rem
  .fix-bar
    display flex
    align-items center
    position fixed
    bottom 50px
    width 100%
    height 50px
    &:before, &:after
      content ""
      position absolute
      z-index 1
      pointer-events none
      background #ddd
      height 1px
      right 0
      left 0
    &:before
      top 0
    &:after
      bottom 0
    .total
      flex 1
      text-align right
      .total-price
        color #e93b3d
    .buy
      flex 0 0 110px
      margin-left 0.5rem
      width 110px
      height 50px
      text-align center
      line-height 50px
      font-size 0.8rem
      font-weight 700
      color #fff
      background #e4393c
      &.disabled
        background #d7d7d7
      .total-amount
        font-size 0.6rem
        font-weight 400
</style>
