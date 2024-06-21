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
// 新增供应商
function addSupplier(params: any, success: any, error: any) {
  const url = "/api/admin/provider/insert";
  http.post(
    url,
    {
      proCode: params.value.proCode,
      proName: params.value.proName,
      proDesc: params.value.proDesc,
      proContact: params.value.proContact,
      proPhone: params.value.proPhone,
      proAddress: params.value.proAddress,
      proFax: params.value.proFax,
    },
    success,
    error
  );
}
function batchDeleteSupplier(params: number[], success: any, error: any) {
  const url = "/api/admin/provider/delete";
  http.post(url, params, success, error);
}

// 通过供应商id获取供应商信息
function getSupplierInfoById(params: any) {
  const url = "/api/admin/provider/info/" + params;
  const data = http.get(url);
  return data;
}
function updateSupplier(params: any, success: any, error: any) {
  const url = "/api/admin/provider/update";
  http.post(
    url,
    {
      id: params.value.id,
      proCode: params.value.proCode,
      proName: params.value.proName,
      proDesc: params.value.proDesc,
      proContact: params.value.proContact,
      proPhone: params.value.proPhone,
      proAddress: params.value.proAddress,
      proFax: params.value.proFax,
    },
    success,
    error
  );
}
// 导出excel
function exportExcel(success: any, error: any) {
  // 导出excel
  http
    .fileDownload(
      "/api/admin/provider/export/excel",
      {},
      {
        method: "post",
      },
      "供应商信息"
    )
    .then(success)
    .catch(error);
}

export default {
  getSupplierList,
  getSupplierListByPage,
  searchSupplierList,
  addSupplier,
  batchDeleteSupplier,
  getSupplierInfoById,
  updateSupplier,
  exportExcel,
};
