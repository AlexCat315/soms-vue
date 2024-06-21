<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import {
  Search,
  CirclePlus,
  DeleteFilled,
  UploadFilled,
  SoldOut,
  EditPen,
  Delete,
} from "@element-plus/icons-vue";
import http from "@/net/api/admin/UserManage";
import httpSupplier from "@/net/api/admin/SupplierManager";
import AddSupplier from "@/components/supplier_manager/AddSupplier.vue";
import EditSupplier from "@/components/supplier_manager/EditSupplier.vue";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";

const pageSizeOptions = ref([5, 10, 20, 30, 40, 50]);
const currentPage = ref(1);
const pageSizeIndexValue = ref(pageSizeOptions.value[0]);

const requestParams = ref({
  pageSize: pageSizeIndexValue.value,
  currentPage: currentPage.value - 1,
});

const ProviderList = ref([
  {
    id: "",
    proCode: "",
    proName: "",
    proDesc: "",
    proContact: "",
    proPhone: "",
    proAddress: "",
    createId: 0,
    creationDate: "",
  },
]);

const total = ref(0);

const getTotal = () => {
  httpSupplier.getSupplierList(
    (data: any) => {
      const list = ref([]);
      list.value = data;
      total.value = data.length;
      // 将获取到的权限名称去重后显示在页面上
    },
    (err: any) => {
      console.log(err);
      ElMessage.error("未获得相关权限");
    }
  );
};
function fetchProviderList() {
  httpSupplier.getSupplierListByPage(
    requestParams,
    (data: any) => {
      ProviderList.value = data;
      // 修改时间格式
      for (let i = 0; i < ProviderList.value.length; i++) {
        // 将时间格式化为 yyyy-MM-dd
        ProviderList.value[i].creationDate = ProviderList.value[
          i
        ].creationDate.slice(0, 10);
      }
    },
    (err: any) => {
      console.log(err);
      ElMessage.error("未获得相关权限");
    }
  );
}

onMounted(() => {
  fetchProviderList();
  getTotal();
});

const handleSizeChange = (size: number) => {
  // 获取页码数
  const pages = Math.ceil(total.value / size);
  // 将页码定位到第一页
  currentPage.value = 1;
  // 更新请求参数
  requestParams.value.currentPage = 0;
  requestParams.value.pageSize = size;
  pageSizeIndexValue.value = size;
  fetchProviderList();
};

const handleCurrentChange = (page: number) => {
  currentPage.value = page;
  requestParams.value.currentPage = (page - 1) * pageSizeIndexValue.value;
  fetchProviderList();
};

const isCheckboxColumnVisible = ref(false); // 控制多选框列的显示
const selectedSupplierIds = ref([]); // 用来存储选中的用户ID列表

const handleBatchDelete = () => {
  httpSupplier.batchDeleteSupplier(
    selectedSupplierIds.value,
    () => {
      ElMessage.success("删除成功");
      fetchProviderList();
      selectedSupplierIds.value = []; // 重置选中的用户ID列表
      isCheckboxColumnVisible.value = false; // 隐藏多选框列
    },
    (err: any) => {
      console.log(err);
      ElMessage.error("删除失败");
    }
  );
};

const delectIdList = ref([]); // 用来存储选中的用户ID列表
const delectSupplier = () => {
  httpSupplier.batchDeleteSupplier(
    delectIdList.value,
    () => {
      ElMessage.success("删除成功");
      fetchProviderList();
      selectedSupplierIds.value = []; // 重置选中的用户ID列表
      isCheckboxColumnVisible.value = false; // 隐藏多选框列
    },
    (err: any) => {
      console.log(err);
      ElMessage.error("删除失败");
    }
  );
};

const delectSupplierById = (row: any) => {
  // 转换为never类型，防止类型检查报错
  delectIdList.value.push(row as never);
  console.log("id:" + delectIdList.value);
  if (delectIdList.value.length > 0) {
    // 在某个地方调用 open 函数
    open()
      .then((result) => {
        // 用户确认删除
        delectSupplier();
      })
      .catch((error) => {
        // 处理错误
        console.info("取消删除:", error);
      });
  } else {
    isCheckboxColumnVisible.value = !isCheckboxColumnVisible.value;
    selectedSupplierIds.value = []; // 重置选中的用户ID列表
  }
};

const toggleCheckboxColumn = () => {
  if (selectedSupplierIds.value.length > 0) {
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
    selectedSupplierIds.value = []; // 重置选中的用户ID列表
  }
};

const handleSelectionChange = (selection: any) => {
  selectedSupplierIds.value = selection.map((item: any) => item.id);
  console.log(selectedSupplierIds.value);
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
  pageSize: 10,
  currentPage: 0,
  keyWords: "",
});
const SearchProviderList = () => {
  if (
    searchParams.value.keyWords === "" ||
    searchParams.value.keyWords == undefined
  ) {
    ElMessage.warning("请输入搜索内容");
    return;
  }
  httpSupplier.searchSupplierList(
    searchParams,
    (data: any) => {
      console.log(data);
      ProviderList.value = data;
      // 修改时间格式
      for (let i = 0; i < ProviderList.value.length; i++) {
        // 将时间格式化为 yyyy-MM-dd
        ProviderList.value[i].creationDate = ProviderList.value[
          i
        ].creationDate.slice(0, 10);
      }
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
    fetchProviderList();
  }
);
const showSupplierManagehPanel = ref(false);

const providerId = ref("");
const onEditSupplier = (id: string) => {
  providerId.value = id;
  console.log(id);
  toggleEditSupplier();
};

const toggleClosePanel = () => {
  showSupplierManagehPanel.value = false;
  showEditSupplier.value = false;
  showAddSupplier.value = false;
};

const showEditSupplier = ref(false);
const toggleEditSupplier = () => {
  showEditSupplier.value = true;
  showSupplierManagehPanel.value = true;
};

const openResetPassword = () => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(
      '<span style="font-family: Arial, sans-serif; font-size: 16px;">确定重置密码?<br><span style=" font-size: 13px;">重置后密码为初始密码：<span style="color: #ff0000;">123456</span></span></span>',
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        dangerouslyUseHTMLString: true, // 允许使用 HTML 字符串
      }
    )
      .then(() => {
        resolve(true); // 用户确认删除，resolve(true)
      })
      .catch(() => {
        reject(false); // 用户取消删除，reject(false)
      });
  });
};

const resetPassword = (id: string) => {
  openResetPassword()
    .then((result) => {
      // 用户确认删除
      http.resetPassword(
        id,
        () => {
          ElMessage.success("重置密码成功");
        },
        (err: any) => {
          ElMessage.error("重置密码失败");
        }
      );
    })
    .catch((error) => {});
};

const showAddSupplier = ref(false);
const toggleAddUser = () => {
  showAddSupplier.value = true;
  showSupplierManagehPanel.value = true;
};
const addSupplier = () => {
  toggleAddUser();
};

// 导出excel
const exportExcel = () => {
  httpSupplier.exportExcel(
    () => {
      ElMessage.success("导出成功");
    },
    (err: any) => {
      console.log(err);
      ElMessage.error("导出失败");
    }
  );
};
const uploadUrl = ref(axios.defaults.baseURL + "api/admin/provider/save/excel");
const handleUploadSuccess = () => {
  ElMessage.success("导入成功");
  fetchProviderList();
};
const handleUploadError = () => {
  ElMessage.error("导入失败");
};
</script>

<template>
  <div v-if="showSupplierManagehPanel" class="search-container">
    <div class="card">
      <el-button
        class="search_close_button"
        type="link"
        @click="toggleClosePanel"
      >
      </el-button>

      <EditSupplier v-if="showEditSupplier" :providerId="providerId" />
      <AddSupplier v-if="showAddSupplier" />
    </div>
  </div>
  <!-- 页签 -->
  <div style="margin-bottom: 20px">
    <el-breadcrumb separator="<">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <!-- 搜索框 -->
  <div style="padding: 10px 0">
    <el-input
      v-model="searchParams.keyWords"
      style="width: 190px"
      suffix-icon="el-icon-search"
      placeholder="请输入名称"
    ></el-input>
    <el-button
      style="margin-left: 10px"
      @click="SearchProviderList"
      :icon="Search"
      >搜索</el-button
    >
  </div>

  <!-- 按钮 -->
  <el-button type="success" @click="addSupplier" :icon="CirclePlus"
    >新增</el-button
  >
  <el-button type="danger" :icon="DeleteFilled" @click="toggleCheckboxColumn"
    >批量删除</el-button
  >
  <el-upload
    :show-file-list="false"
    :with-credentials="true"
    :action="uploadUrl"
    :auto-upload="true"
    :on-success="handleUploadSuccess"
    :on-error="handleUploadError"
    style="margin-left: 210px; margin-top: -31px"
  >
    <el-button type="warning" icon="UploadFilled">导入</el-button>
  </el-upload>
  <el-button
    style="margin-left: 300px; margin-top: -55px"
    type="primary"
    @click="exportExcel"
    :icon="SoldOut"
    >导出</el-button
  >
  <!-- 表格 -->
  <el-table
    @selection-change="handleSelectionChange"
    :data="ProviderList"
    border
    style="margin-top: -5px; width: 100%"
  >
    <el-table-column
      v-if="isCheckboxColumnVisible"
      type="selection"
      width="45"
    ></el-table-column>

    <el-table-column
      fixed
      prop="proCode"
      label="供应商编码"
      width="120"
    ></el-table-column>
    <el-table-column
      prop="creationDate"
      label="注册日期"
      width="105"
    ></el-table-column>
    <el-table-column
      prop="proName"
      label="供应商名称"
      width="150"
    ></el-table-column>
    <el-table-column
      prop="proContact"
      label="联系人"
      width="100"
    ></el-table-column>
    <el-table-column
      prop="proPhone"
      label="联系电话"
      width="120"
    ></el-table-column>
    <el-table-column
      width="180"
      prop="proAddress"
      label="地址"
    ></el-table-column>
    <el-table-column width="175" prop="proDesc" label="详情"></el-table-column>
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button
          @click="onEditSupplier(scope.row.id)"
          type="primary"
          size="small"
          :icon="EditPen"
          >编辑</el-button
        >
        <el-button
          @click="delectSupplierById(scope.row.id)"
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
  border: 2px solid #eaebee;
}
</style>
