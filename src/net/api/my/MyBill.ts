import http from "@/net/ApiService";

function getBillList(success: any, error: any) {
  const url = "/api/my/bill/info/all";
  http.post(url, {}, success, error);
};
function getBillListByPage(params: any, success: any, error: any) {
  const url = "/api/my/bill/info/page";
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
function batchDeleteBill(params: any, success: any, error: any)
{
  const url = "/api/my/bill/delete/batch";
  http.post(url,  params.value , success, error);
};
function searchBill(params: any, success: any, error: any) {
  const url = "/api/my/bill/search";
  http.post(url, params.value, success, error);
};
function exportExcel(success: any, error: any) {
  // 导出excel
  http
    .fileDownload(
      "/api/my/bill/export/excel",
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
    batchDeleteBill,
    searchBill,
    exportExcel
};