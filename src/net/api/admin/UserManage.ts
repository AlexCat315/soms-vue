import http from "@/net/ApiService";
import { tr } from "element-plus/es/locale";
import { register } from "module";

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
  http.post(url, ids, success, error);
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
function getUserInfoById(id: string): Promise<any> {
  let url = "/api/admin/account/info/" + id;
  const data = http.get(url);
  return data;
}

function updateUserInfo(params: any, success: any, error: any) {
  let url = "/api/admin/account/update";
  http.post(
    url,
    {
      id: params.value.id,
      username: params.value.username,
      nickname: params.value.nickname,
      address: params.value.address,
      registerTime: params.value.registerTime,
      role: params.value.role,
    },
    success,
    error
  );
}

function resetPassword(params: any, success: any, error: any) {
  let url = "/api/admin/account/reset/password/" + params;
  http.post(url, {}, success, error);
}
function addUser(params: any, success: any, error: any) {
  let url = "/api/admin/account/insert";
  http.post(
    url,
    {
      id: params.value.id,
      username: params.value.username,
      nickname: params.value.nickname,
      address: params.value.address,
      registerTime: params.value.registerTime,
      role: params.value.role,
    },
    success,
    error
  );
}

export default {
  getUserInfoList,
  batchDeleteUserByAccountIds,
  searchUserBykeywords,
  getUserInfoById,
  updateUserInfo,
  resetPassword,
  addUser
};
