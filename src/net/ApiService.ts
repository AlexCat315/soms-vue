import { ElMessage } from "element-plus";
import axios, { AxiosRequestConfig } from "axios";

// 默认错误处理函数
const defaultError = (err: any) => ElMessage.error(err.message);
const defaultFailure = (message: any) => ElMessage.warning(message);

// 设置 Axios 全局配置
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
// 创建axios对象
const instance = axios.create();
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
        failure(data.msg);
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
/**
 * 文件下载接口
 * @param url
 * @param body
 * @param options
 */
async function fileDownload(
  url: string,
  body: any,
  options: any,
  downloadFileName: string ,
): Promise<any> {
  const { method = "post" } = options;
  try {
    const res = await instance({
      url,
      data: method.toLowerCase() === "post" ? body : {},
      params: method.toLowerCase() === "get" ? body : {},
      method: method,
      responseType: "blob",
      baseURL: axios.defaults.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      // 自定义参数序列化方法
      ...options,
    });
    // 获取文件名 后端需要在响应头增加filename，这样导出的文件名也由后端进行控制
    const filename = res.headers["filename"] || downloadFileName;

    let reader = new FileReader();
    reader.readAsDataURL(res.data);
    reader.onload = (e: any) => {
      let a = document.createElement("a");
      a.download = decodeURIComponent(filename);
      a.href = e.target.result;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    return res;
  } catch (error) {
    console.error("File download error:", error);
    throw error;
  }
}

export default {
  post,
  get,
  fileDownload,
};
