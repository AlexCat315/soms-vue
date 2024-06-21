import http from "@/net/ApiService";

// 获取账单列表
function getBillList(success: any, error: any) {
  const url = "/api/bill/info/all";
  http.post(url, {}, success, error);
};

function getBillListByPage(params: any, success: any, error: any) {
  const url = "/api/bill/info/page";
  http.post(
    url,
    {
      pageSize: params.value.pageSize,
      pageSizeIndex: params.value.currentPage,
    },
    success,
    error
  );
};

function getBillInfoById(id: any, success: any, error: any)
{
  const url = "/api/bill/info/" + id.value;
  http.post(url, { }, success, error);
};
function batchDeleteBill(params: any, success: any, error: any)
{
  const url = "/api/bill/delete/batch";
  http.post(url,  params.value , success, error);
};
function getProviderMap(success: any, error: any) {
  const url = "/api/bill/provider/map";
  http.post(url, {}, success, error);
};
function insertBill(params: any, success: any, error: any) {
  const url = "/api/bill/insert";
  http.post(url, params.value, success, error);
};
function updateBill(params: any, success: any, error: any) {
  const url = "/api/bill/update";
  http.post(url, params.value, success, error);
};
function searchBill(params: any, success: any, error: any) {
  const url = "/api/bill/search";
  http.post(url, params.value, success, error);
};
function exportExcel(success: any, error: any) {
  // 导出excel
  http
    .fileDownload(
      "/api/bill/export/excel",
      {},
      {
        method: "post",
      },
      "订单信息"
    )
    .then(success)
    .catch(error);
}

export default {
  getBillList,
  getBillListByPage,
  getBillInfoById,
  batchDeleteBill,
  getProviderMap,
  insertBill,
  updateBill,
  searchBill,
  exportExcel,
};
