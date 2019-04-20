<template>
  <div class="input-number">
    <span class="minus" :class="{'disabled': num <= 1}" @click.stop="minus"></span>
    <div class="input-wrap">
      <input
        class="num"
        type="number"
        ref="inputNum"
        min="1"
        max="200"
        :value="num"
        @change="handleChange">
    </div>
    <span class="plus" @click.stop="plus"></span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  model: {
    prop: 'num',
    event: 'change'
  },
  props: {
    num: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleChange($event) {
      // 隐式转换为数字
      let value = +$event.target.value
      if (value < this.min) {
        value = this.min
        $event.target.value = value
      }
      if (value > this.max) {
        value = this.max
        $event.target.value = value
      }
      this.$emit('change', value)
    },
    minus() {
      let value = this.$refs.inputNum.value
      if (value <= this.min) {
        return
      }
      value--
      this.$emit('change', value)
    },
    plus() {
      let value = this.$refs.inputNum.value
      if (value >= this.max) {
        return
      }
      value++
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.input-number
  position relative
  display block
  width 107px
  border-radius 4px
  overflow hidden
  background #f7f7f7
  span
    position relative
    width 30px
    height 30px
    text-align center
    line-height 30px
    &:after
      content ""
      display block
      position absolute
      top 50%
      left 50%
      width 16px
      height 2px
      margin -1px 0 0 -8px
      background #999
      border-radius 1px
  .minus
    float left
    &.disabled
      &:after
        background hsla(0, 0%, 80%, .3)
  .plus
    float right
    &:before
      content ""
      display block
      position absolute
      top 50%
      left 50%
      width 2px
      height 16px
      margin -8px 0 0 -1px
      background #999
      border-radius 1px
  .input-wrap
    float left
    position relative
    border-left 1px solid #fff
    border-right 1px solid #fff
    .num
      float left
      position relative
      border none
      outline 0
      width 45px
      height 30px
      text-align center
      line-height 30px
      font-size 0.6rem
      color #999
      background initial
</style>
