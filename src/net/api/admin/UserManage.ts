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

function batchDeleteUserByAccountIds(ids: number[], success: any, error: any) {
  let url = "/api/admin/delete/batch/user";
  http.post(
    url,
    ids,
    success,
    error
  );
}
function searchUserBykeywords(params: any, success: any, error: any) {
  let url = "/api/admin/search/user/info/keywords";
  http.post(
    url,
    {
      keyWords: params.value.keyWords,
      pageSize: params.value.pageSize,
      pageSizeIndex: params.value.currentPage,
    },
    success,
    error
  );
}

export default { getUserInfoList, batchDeleteUserByAccountIds, searchUserBykeywords };
