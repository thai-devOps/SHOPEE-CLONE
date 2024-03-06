import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'animate.css'
import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
const app = createApp(App)
const pinia = createPinia() // Create a Pinia instance
app.use(pinia)
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  }
}
app.use(VueQueryPlugin, vueQueryPluginOptions)
app.use(Vue3Toastify, {
  autoClose: 2000
} as ToastContainerOptions)

app.use(router)
app.mount('#app')
