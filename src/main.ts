import { createApp, ref} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from "axios";
import App from './App.vue'
import router from "@/routers/Router";
const app = createApp(App)

app.use(ElementPlus)
app.use(router);
app.mount('#app')

// 开发
const devIP = ref("http://localhost:12345/supermarket-order-management-system/");
//生产
const prodIP = ref("ontip.xyz")

axios.defaults.baseURL = devIP.value;