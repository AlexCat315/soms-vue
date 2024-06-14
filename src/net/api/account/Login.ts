import http from "@/net/ApiService";

function login(data: any,success: any,error: any) {
    const url = "api/account/login";
    http.post(
      url,
      {
        username: data.username,
        password: data.password,
        rememberMe: data.rememberMe,
      },
      success,
      error
    );
}
export default {
  login,
};
