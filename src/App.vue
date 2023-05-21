<template>

  <Index v-if="this.$route.meta.keepAlive"></Index>
  <Login v-else></Login>
</template>

<script>
import Index from "./views/index.vue"
import Login from "./views/login.vue"

export default {
  name: 'App',
  data() {
    return {
      autoheight: 0
    }
  },
  components: {
    Index,
    Login
  },
  computed:{
    isLogin: function(){
      return this.$store.state.isLogin
    }
  },
  created() {},
  methods: {}

}
</script>

<style>


body {
  margin: 0px;
}
</style>
