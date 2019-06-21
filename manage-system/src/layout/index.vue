<!-- 首页布局 -->
<template>
  <div class="box">
    <sideNav />
    <main>
      <indexHeader></indexHeader>
      <router-view class="change_view"></router-view>
    </main>
  </div>
</template>

<script>
import sideNav from './sideNav'
import indexHeader from './nav/indexHeader'
export default {
  components: {
    sideNav,
    indexHeader
  },
  data() {
    return {}
  },

  computed: {},

  mounted() {},

  methods: {}
}
</script>
<style lang='less' scoped>
.box{
    height: 100%;
    main{
      // width: auto;
      overflow: auto;
      height: 100%;
      background: #f8f8f8;
      .change_view{
        padding:10px;
      }
    }
}
</style>