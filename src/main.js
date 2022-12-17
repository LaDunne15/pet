import { createApp } from 'vue/dist/vue.esm-bundler'
import App from './App.vue'
import router from './router'
import store from './state/state'
createApp(App).use(router).use(store).mount('#app')