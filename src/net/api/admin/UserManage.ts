import http from "@/net/ApiService";

function getUserInfoList(params: any, success: any, error: any) {
  let url = "api/admin/account/info";
  http.post(
    url,
    {
      pageSize: params.value.pageSize,
      pageSizeIndex: params.value.currentPage,
    },
    success,
    error
  );
}

export default {getUserInfoList}