import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import "./assets/base.css";

const app = createApp(App)
    .use( createPinia() )
    .use( router );

app.mount('#app')