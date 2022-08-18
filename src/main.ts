import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import "./assets/base.css"
import "uno.css";
import {loadDirectives} from "@/directives/load";
const app = createApp(App)

app.use(createPinia()).use( loadDirectives );

app.mount('#app')

/**
 * Add Export Data to Window Object(for dev)
 */
declare global {
    interface Window {
        exportData: () => void
    }
}