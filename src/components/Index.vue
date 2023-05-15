<template>
<div style="text-align:center;" :style="{height: scrollerHeight}">
  <P>
    <span style="font-family:微软雅黑;font-size:40px;font-weight:bold;color: #999;">库存管理系统</span>
  </P>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Index',
  data() {
    return {}
  },
  created() {},
  computed: {
    scrollerHeight: function() {
      return (window.innerHeight - 100) + 'px'; //自定义高度需求
    }
  },
}
</script>

<style scoped>

</style>
