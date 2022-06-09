import { createApp } from 'vue'
import { createPinia } from 'pinia'
import accessor from "@/core/accessor/store/plugin";
import router from './router'
import App from './App.vue'
import "./assets/base.css";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(accessor);

app.mount('#app')