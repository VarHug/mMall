<template>
  <transition name="slide">
    <div class="address" v-show="isShow">
      <common-header title="收货地址" @back="hide"></common-header>
      <ul class="address-list">
        <li
          class="address-list-item"
          v-for="(item, index) in addressList"
          :class="{'checked': checkedAddress.id === item.id}"
          :key="index"
          @click="selectAddress(item)">
          <div class="item-content">
            <div class="item-people">
              <span class="item-name">{{item.name}}</span>
              <span class="item-tel">{{item.tel | tel}}</span>
            </div>
            <div class="item-address">{{item.area + item.detailAddress}}</div>
          </div>
          <div class="delete-address" @click.stop="deleteAddress(item)">
            <i class="cubeic-close"></i>
          </div>
        </li>
      </ul>
      <div class="add-address" @click="showNewAddress()">新建收货地址</div>
      <new-address ref="newAddress"></new-address>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import CommonHeader from 'components/common-header/common-header'
import NewAddress from 'views/new-address/new-address'
import { mapGetters, mapMutations } from 'vuex'
import { deleteAddress } from 'common/js/cache.js'

export default {
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapGetters([
      'addressList',
      'checkedAddress'
    ])
  },
  methods: {
    ...mapMutations({
      setCheckedAddress: 'SET_CHECKED_ADDRESS',
      setAddressList: 'SET_ADDRESS_LIST'
    }),
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    },
    showNewAddress() {
      this.$refs.newAddress.show()
    },
    selectAddress(address) {
      this.setCheckedAddress(address)
      this.hide()
    },
    deleteAddress(address) {
      // 如果删除的是选中的地址，则将选中地址置空
      if (this.checkedAddress.id === address.id) {
        this.setCheckedAddress({})
      }
      this.setAddressList(deleteAddress(address.id))
    }
  },
  filters: {
    tel(val) {
      let prepend = val.slice(0, 3)
      let append = val.slice(7)
      return `${prepend}****${append}`
    }
  },
  components: {
    CommonHeader,
    NewAddress
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active
  transition all .3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)

.address
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  z-index 100
  background #fff
  .add-address
    position absolute
    left 50%
    bottom 1rem
    transform translateX(-50%)
    padding 0.5rem 2rem
    width 5rem
    text-align center
    font-size 0.8rem
    color #fff
    background #e4393c
    border-radius 40px
  .address-list
    padding 0.5rem
    .address-list-item
      display flex
      align-items center
      border-bottom 1px solid #ebebeb
      padding 0.5rem 0
      line-height 1.5
      &.checked
        border-bottom 1px solid #e4393c
      .item-content
        flex 1
        .item-people
          font-size 0.8rem
          font-weight 400
          .item-name
            margin-right 2rem
        .item-address
          font-size 0.7rem
      .delete-address
        flex 0 0 2rem
        width 2rem
        text-align center
</style>
