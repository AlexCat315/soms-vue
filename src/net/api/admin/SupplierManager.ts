import http from "@/net/ApiService";

function getSupplierList(success: any, error: any) {
  const url = "/api/admin/provider/info/all";
  http.post(url, {}, success, error);
}

// 分页查询供应商列表
function getSupplierListByPage(params: any, success: any, error: any) {
  const url = "/api/admin/provider/info/page";
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
// 通过关键词搜索供应商列表
function searchSupplierList(params: any, success: any, error: any) {
  const url = "/api/admin/provider/search/info";
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

export default {
  getSupplierList,
  getSupplierListByPage,
  searchSupplierList,
};
