<template>
  <div id="app">
    <router-view></router-view>
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
