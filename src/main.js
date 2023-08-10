import './assets/main.css'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { makeServer } from "./server"

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('EasyDataTable', Vue3EasyDataTable);
makeServer();
app.mount('#app')
