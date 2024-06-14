import http from "@/net/ApiService";

function register(data: any, success: any, error: any) {
  const url = "api/account/register";
  http.post(
    url,
    {
      username: data.username,
      password: data.password,
      recommendCode: data.recommendCode,
    },
    success,
    error
  );
}

export default {
  register
};