<template>
  <div id="app" ref="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  @import './common/style.less';

  #app {
    height: 100%;
    width: 100%;
  }
</style>