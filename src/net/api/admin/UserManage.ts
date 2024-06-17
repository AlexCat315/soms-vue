import http from "@/net/ApiService";

function getUserInfoList(params: any, success: any, error: any) {
  let url = "api/admin/account/info";
  http.post(
    url,
    {
      pageSize: params.value.pagesSize,
      pageSizeIndex: params.value.pagesSizeIndex,
    },
    success,
    error
  );
}

export default {getUserInfoList}