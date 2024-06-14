import { createApp, ref} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from "axios";
import App from './App.vue'
import router from "@/routers/Router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import VueCookies from "vue-cookies";
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus)
app.use(router);
app.use(VueCookies);
app.mount('#app')

// 开发
const devIP = ref("http://localhost:12345/supermarket-order-management-system/");
//生产
const prodIP = ref("ontip.xyz")

axios.defaults.baseURL = devIP.value;