<template>
<div class = 'container-fluid body'>
  <div id="app">
    <router-view></router-view>
  </div>
  </div>
</template>

<script>
import Error from './components/Error'
export default {
  name: 'app',
  components:{
    Error
  },
  mounted(){
    this.$store.dispatch('getAuth')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.body{
  background: url('https://slack-imgs.com/?c=1&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1495141929506-f34c93658f5d%3Fdpr%3D1%26auto%3Dcompress%2Cformat%26fit%3Dcrop%26w%3D1199%26h%3D1799%26q%3D80%26cs%3Dtinysrgb%26crop%3D%26bg%3D') no-repeat center center fixed;
}
</style>
