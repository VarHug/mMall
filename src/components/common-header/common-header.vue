<template>
  <header>
    <h1 class="title">
      <div class="back" @click="handleBack">
        <i class="cubeic-back"></i>
      </div>
      <div class="text">{{title}}</div>
    </h1>
  </header>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleBack() {
      this.$emit('back')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"

header
  padding 0 0.5rem
  height 50px
  .title
    text-align center
    line-height 50px
    .back
      extend-click()
      position absolute
      width 1.2rem
</style>
