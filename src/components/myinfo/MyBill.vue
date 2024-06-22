<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import {
  Search,
  DeleteFilled,
  SoldOut,
  Delete,
} from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import httpBill from "@/net/api/my/MyBill";
import PayInfo from "@/components/bill_manager/PayInfo.vue";
const pageSizeOptions = ref([5, 10, 20, 30, 40, 50]);
const currentPage = ref(1);
const pageSizeIndexValue = ref(pageSizeOptions.value[0]);

const requestParams = ref({
  pageSize: pageSizeIndexValue.value,
  currentPage: currentPage.value - 1,
});

const UserList = ref([
  {
    id: "",
    nickname: "",
    username: "",
    address: "",
    role: "",
    registerTime: "",
    recommendCode: "",
    recommendId: 0,
  },
]);

const BillList = ref([
  {
    id: "",
    billCode: "",
    productName: "",
    productDesc: "",
    productUnit: "",
    productCount: "",
    totalPrice: "",
    isPayment: "",
    createdBy: "",
    creationDate: "",
    modifyBy: "",
    modifyDate: "",
    proName: "",
  },
]);

const total = ref(0);
const getTotal = () => {
  const requestParams = ref({
    pageSize: 1000,
    currentPage: 0,
  });
  httpBill.getBillListByPage(
    requestParams,
    (data: any) => {
      total.value = data.length;
      console.log(total.value);
    },
    (err: any) => {
      console.log(err);
      ElMessage.error("未获得相关权限");
    }
  );
};

const fetchBillList = () => {
  httpBill.getBillListByPage(
    requestParams,
    (data: any) => {
      BillList.value = data;
      // 修改时间格式
      for (let i = 0; i < BillList.value.length; i++) {
        // 将时间格式化为 yyyy-MM-dd
        BillList.value[i].creationDate = BillList.value[i].creationDate.slice(
          0,
          10
        );
      }
    },
    (err: any) => {
      console.log(err);
      ElMessage.error("未获得相关权限");
    }
  );
};

onMounted(() => {
  fetchBillList();
  getTotal();
});

const handleSizeChange = (size: number) => {
  // 将页码定位到第一页
  currentPage.value = 1;
  // 更新请求参数
  requestParams.value.currentPage = 0;
  requestParams.value.pageSize = size;
  pageSizeIndexValue.value = size;
  fetchBillList();
};

const handleCurrentChange = (page: number) => {
  currentPage.value = page;
  requestParams.value.currentPage = (page - 1) * pageSizeIndexValue.value;
  fetchBillList();
};

const isCheckboxColumnVisible = ref(false); // 控制多选框列的显示
const selectedBillIds = ref([]); // 用来存储选中的用户ID列表

const handleBatchDelete = () => {
  httpBill.batchDeleteBill(
    selectedBillIds,
    () => {
      ElMessage.success("删除成功");
      fetchBillList();
      selectedBillIds.value = []; // 重置选中的用户ID列表
      isCheckboxColumnVisible.value = false; // 隐藏多选框列
    },
    (err: any) => {
      console.log(err);
      ElMessage.error("删除失败");
    }
  );
};

const delectIdList = ref([]); // 用来存储选中的用户ID列表
const delectBill = () => {
  httpBill.batchDeleteBill(
    delectIdList,
    () => {
      ElMessage.success("删除成功");
      fetchBillList();
      selectedBillIds.value = []; // 重置选中的用户ID列表
      isCheckboxColumnVisible.value = false; // 隐藏多选框列
    },
    (err: any) => {
      console.log(err);
      ElMessage.error("删除失败");
    }
  );
};

const delectBillById = (row: any) => {
  // 转换为never类型，防止类型检查报错
  delectIdList.value.push(row as never);
  if (delectIdList.value.length > 0) {
    // 在某个地方调用 open 函数
    open()
      .then((result) => {
        // 用户确认删除
        delectBill();
      })
      .catch((error) => {
        // 处理错误
        console.info("取消删除:", error);
      });
  } else {
    isCheckboxColumnVisible.value = !isCheckboxColumnVisible.value;
    selectedBillIds.value = []; // 重置选中的用户ID列表
  }
};

const toggleCheckboxColumn = () => {
  if (selectedBillIds.value.length > 0) {
    // 在某个地方调用 open 函数
    open()
      .then((result) => {
        // 用户确认删除
        handleBatchDelete();
      })
      .catch((error) => {
        // 处理错误
        console.error("发生错误:", error);
      });
  } else {
    isCheckboxColumnVisible.value = !isCheckboxColumnVisible.value;
    selectedBillIds.value = []; // 重置选中的用户ID列表
  }
};

const handleSelectionChange = (selection: any) => {
  selectedBillIds.value = selection.map((item: any) => item.id);
  console.log(selectedBillIds.value);
};
const open = () => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm("确定进行批量删除操作吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "error",
    })
      .then(() => {
        resolve(true); // 用户确认删除，resolve(true)
      })
      .catch(() => {
        reject(false); // 用户取消删除，reject(false)
      });
  });
};

const searchParams = ref({
  pageSize: 100,
  pageSizeIndex: 0,
  keyWords: "",
});
const SearchBillList = () => {
  if (searchParams.value.keyWords === "") {
    ElMessage.warning("请输入搜索内容");
    return;
  }

  httpBill.searchBill(
    searchParams,
    (data: any) => {
      console.log(data);
      BillList.value = data;
    },
    (err: any) => {
      console.log(err);
      ElMessage.error("发生错误");
    }
  );
};

watch(
  [() => requestParams.value.pageSize, () => requestParams.value.currentPage],
  () => {
    fetchBillList();
  }
);
const showBillManagehPanel = ref(false);

const bilId = ref("");
const onEditBill = (id: string) => {
  bilId.value = id;
  toggleEditBill();
};

const toggleClosePanel = () => {
  showBillManagehPanel.value = false;
  showEditBill.value = false;
  showAddBill.value = false;
};

const showEditBill = ref(false);
const toggleEditBill = () => {
  showEditBill.value = true;
  showBillManagehPanel.value = true;
};

const showAddBill = ref(false);
const toggleAddUser = () => {
  showAddBill.value = true;
  showBillManagehPanel.value = true;
};
const addBill = () => {
  toggleAddUser();
};

// 导出excel
const exportExcel = () => {
  httpBill.exportExcel(
    () => {
      ElMessage.success("导出成功");
    },
    (err: any) => {
      console.log(err);
      ElMessage.error("导出失败");
    }
  );
};

const handleUploadSuccess = () => {
  ElMessage.success("导入成功");
  fetchBillList();
};
const handleUploadError = () => {
  ElMessage.error("导入失败");
};
const parentMessage = ref("");

const receivedMessage = ref(false);

const handleChildData = (data: boolean) => {
  receivedMessage.value = data;
};
const showPayInfo = (id: string) => {
  parentMessage.value = id;
  receivedMessage.value = true;
};
</script>

<template>
  <div></div>
  <!-- 商品详情 -->
  <div v-if="receivedMessage" class="pay-info-container">
    <div class="pay-card">
      <PayInfo :message="parentMessage" @childData="handleChildData" />
    </div>
  </div>

  <!-- 搜索框 -->
  <div style="padding: 10px 0">
    <el-input
      v-model="searchParams.keyWords"
      style="width: 190px"
      suffix-icon="el-icon-search"
      placeholder="请输入名称"
    ></el-input>
    <el-button style="margin-left: 10px" @click="SearchBillList" :icon="Search"
      >搜索</el-button
    >
  </div>

  <!-- 按钮 -->
  <el-button type="danger" :icon="DeleteFilled" @click="toggleCheckboxColumn"
    >批量删除</el-button
  >

  <el-button type="primary" @click="exportExcel" :icon="SoldOut"
    >导出</el-button
  >

  <!-- 表格 -->
  <el-table
    @selection-change="handleSelectionChange"
    :data="BillList"
    border
    style="margin-top: 10px"
  >
    <el-table-column
      v-if="isCheckboxColumnVisible"
      type="selection"
      width="45"
    ></el-table-column>

    <el-table-column
      fixed
      prop="billCode"
      label="账单编码"
      width="100"
    ></el-table-column>
    <el-table-column
      prop="creationDate"
      label="创建日期"
      width="120"
    ></el-table-column>
    <el-table-column
      prop="productName"
      label="商品日期"
      width="70"
    ></el-table-column>
    <el-table-column
      prop="productDesc"
      label="商品描述"
      width="120"
    ></el-table-column>
    <el-table-column
      prop="isPayment"
      label="是否支付"
      width="120"
    ></el-table-column>
    <el-table-column
      width="100"
      prop="productUnit"
      label="商品数量"
    ></el-table-column>
    <el-table-column
      width="100"
      prop="totalPrice"
      label="商品价格"
    ></el-table-column>
    <el-table-column
      width="110"
      prop="proName"
      label="供应商"
    ></el-table-column>
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button
          @click="showPayInfo(scope.row.id)"
          color="#fa5327"
          icon="View"
          size="small"
          >商品详情
        </el-button>
        <el-button
          @click="delectBillById(scope.row.id)"
          type="danger"
          size="small"
          :icon="Delete"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <div style="padding: 10px 0">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizeOptions"
      :page-size="pageSizeIndexValue"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<style scoped>
.headerBg {
  background-color: #cccccc !important;
}
.pay-info-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.92);
  /* 半透明背景 */
  z-index: 999;
  /* 确保在最顶层 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.92);
  /* 半透明背景 */
  z-index: 999;
  /* 确保在最顶层 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.search_close_button {
  border: none;
  width: 32px;
  height: 32px;
  position: absolute;
  z-index: 101;
  right: 25px;
  top: 20px;
  text-indent: -9999em;
  background: url(@/assets/img/search_panel_close.png) no-repeat;
  background-image: url("@/assets/img/search_panel_close.png");
  background-size: auto;
  background-size: 100%;
}
.card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  z-index: 1;
  border-radius: 20px;
  border: 1px solid #eaebee;
}
.pay-card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 330px;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  z-index: 1;
  border-radius: 20px;
  border: 0px solid #eaebee;
}
</style>
