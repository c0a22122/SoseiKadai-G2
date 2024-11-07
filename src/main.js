import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js'; // routerがundefinedでないことを確認

const app = createApp(App);

app.use(router); // routerを使用している場合、ここが問題になることがあります

app.mount('#app');
