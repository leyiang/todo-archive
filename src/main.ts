import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import "./assets/base.css"
import "uno.css";
const app = createApp(App)

app.use(createPinia())
app.mount('#app')

/**
 * Add Export Data to Window Object(for dev)
 */
declare global {
    interface Window {
        exportData: () => void
    }
}