<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <common-nav></common-nav>
  </div>
</template>

<script>
import commonNav from 'components/common-nav/common-nav'

export default {
  name: 'App',
  components: {
    commonNav
  }
}
</script>

<style>
</style>
