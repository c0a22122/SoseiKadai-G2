<template>
  <div id="app">
    <MenuBar /> <!-- MenuBarを追加 -->
    <router-view /> <!-- ここでルートコンポーネントが表示される -->
  </div>
</template>

<script>
// MenuBarコンポーネントをインポート
import MenuBar from './layouts/MenuBar.vue';

export default {
  name: 'App',
  components: {
    MenuBar, // MenuBarをコンポーネントとして登録
  },
};
</script>

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
