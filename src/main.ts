import { createApp } from 'vue'
import App from './App.vue'
import VScrollLock from 'v-scroll-lock'
// import p5 from '../node_modules/p5/lib/p5.js'
// import p5 from "p5";
createApp(App).use(VScrollLock).mount('#app')
