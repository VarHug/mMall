<template>
  <transition name="slide">
    <div class="new-address" v-show="isShow">
      <common-header title="新增收货地址" @back="hide"></common-header>
      <cube-input v-model="name" placeholder="请填写收货人姓名">
        <div class="text" slot="prepend">收货人</div>
      </cube-input>
      <cube-input v-model="tel" placeholder="请填写收货人手机号">
        <div class="text" slot="prepend">手机号码</div>
      </cube-input>
      <cube-input v-model="area" placeholder="省市区县、乡镇等" @focus="showAddressPicker">
        <div class="text" slot="prepend">所在地区</div>
      </cube-input>
      <cube-input v-model="detailAddress" placeholder="街道、楼牌号等">
        <div class="text" slot="prepend">详细地址</div>
      </cube-input>
      <div class="save" @click="save">保存</div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import CommonHeader from 'components/common-header/common-header'
import { provinceList, cityList, areaList } from 'data/area.js'
import { random } from 'common/js/random.js'
import { postAddress } from 'common/js/cache.js'
import { mapMutations } from 'vuex'

const addressData = provinceList
addressData.forEach(province => {
  province.children = cityList[province.value]
  province.children.forEach(city => {
    city.children = areaList[city.value]
  })
})

export default {
  data() {
    return {
      isShow: false,
      name: '',
      tel: '',
      area: '',
      detailAddress: ''
    }
  },
  methods: {
    ...mapMutations({
      setAddressList: 'SET_ADDRESS_LIST'
    }),
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    },
    showAddressPicker() {
      this.addressPicker.show()
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.area = selectedText.join(' ')
    },
    save() {
      if (!this.name || !this.tel || !this.area || !this.detailAddress) {
        this.$createToast({
          type: 'error',
          txt: '请填写完整信息后重试',
          time: 1000
        }).show()
      } else {
        let address = {}
        address.name = this.name
        address.tel = this.tel
        address.area = this.area
        address.detailAddress = this.detailAddress
        address.id = random(0, 100000)
        this.setAddressList(postAddress(address))
        this.$createToast({
          type: 'correct',
          txt: '保存成功',
          time: 1000
        }).show()
        this.hide()
      }
    }
  },
  mounted() {
    this.addressPicker = this.$createCascadePicker({
      title: 'City Picker',
      data: addressData,
      onSelect: this.selectHandle
    })
  },
  components: {
    CommonHeader
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active
  transition all .3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)

.new-address
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  z-index 1000
  background #fff
  .cube-input
    padding 0.5rem
    .text
      width 3rem
  .save
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
</style>
