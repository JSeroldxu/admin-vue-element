<!--  -->
<template>
  <router-link :to="to">
    <div class="link_box" :class="{active:active}">
      <slot></slot>
    </div>
  </router-link>

</template>

<script>
  export default {
    props: {
      to:String,
      active: {
        type: Boolean,
        default: false
      },
      
    },
    data() {
      return {};
    },

    components: {},

    computed: {},

    mounted() {},

    methods: {
      chageStyle() {

      }
    }
  }
</script>
<style lang='less' scoped>
  .link_box {
    color: #fff;
    text-align: left;
    // margin: 0 0 0 30px;
    padding: 10px;
    color: rgb(77, 75, 75);
    font-size: 14px;
    text-indent: 30px;
    white-space: nowrap;
  }

  .link_box:hover {
    background: #378eff;
    border-radius: 5px;
    color: #fff;
  }
</style>