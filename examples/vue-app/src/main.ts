import { CIcon } from '@coreui/icons-vue';
import * as icons from '@coreui/icons';
import VueComponents from '@scbd/vue-components'
import { createApp } from 'vue'
import './style.css'
import './assets/scss/style.scss';
import '@scbd/vue-components/style.css';
import App from './app.vue'

createApp(App)
  .provide('icons', icons)
  .component('CIcon', CIcon)
  .use(VueComponents)
  .mount('#app');
