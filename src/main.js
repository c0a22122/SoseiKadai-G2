import { createApp } from 'vue';
import App from './App.vue';
import VueTouchEvents from 'vue2-touch-events';
import router from './router.js'; // routerがundefinedでないことを確認

const app = createApp(App);
app.use(VueTouchEvents);

app.use(router); // routerを使用している場合、ここが問題になることがあります

app.mount('#app');
