import axios from "axios";
import { ElMessage } from "element-plus";

// 默认错误处理函数
const defaultError = (err: any) => ElMessage.error("发生了一些错误");
const defaultFailure = (message: any) => ElMessage.warning(message);

// 设置 Axios 全局配置
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";

// POST 请求封装
function post(
  url: string,
  data: any,
  success: (arg0: any) => void,
  failure = defaultFailure,
  error = defaultError
) {
  axios
    .post(url, data)
    .then(({ data }) => {
      if (data.code === 200) {
        success(data.data);
      } else {
        failure(data.message);
      }
    })
    .catch((err) => error(err));
}

// GET 请求封装
// GET 请求封装
function get(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(({ data }) => {
        if (data.code === 200) {
          resolve(data);
        } else {
          reject(data.message);
        }
      })
      .catch((err) => reject(err));
  });
}

export default {
  post,
  get,
};
