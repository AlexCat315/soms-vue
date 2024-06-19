import http from "@/net/ApiService";

function logout(data: any, success: any, error: any) {
  const url = "api/account/logout";
  http.post(
    url,
    {
    },
    success,
    error
  );
}
export default {
  logout,
};
