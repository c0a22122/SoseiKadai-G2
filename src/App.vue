<template>
  <div id="app">
    <HelloWorld /> <!-- ここで使用されているか確認 -->
  </div>
</template>

<script>
import HelloWorld from './components/Calendar.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

export default {
  name: 'App'
}

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
