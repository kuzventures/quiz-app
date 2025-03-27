import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import '@/utilities/css/font-file.css'

import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import axiosPlugin from './plugins/axios'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

app.use(router)

app.use(BootstrapVue3)

app.use(axiosPlugin, {
  baseUrl: import.meta.env.VITE_API_BASE_URL
})

app.mount('#app')
