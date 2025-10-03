import { CIcon } from '@coreui/icons-vue';
import * as icons from '@coreui/icons';
import { createApp } from 'vue'
import App from './app.vue'
import '@coreui/coreui/dist/css/coreui.min.css'

createApp(App)
  .provide('icons', icons)
  .component('CIcon', CIcon)
  .mount('#app');
