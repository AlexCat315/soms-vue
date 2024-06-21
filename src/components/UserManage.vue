<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import axios from "axios";
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
import EditUser from "@/components/user_manage/EditUser.vue";
import AddUser from "@/components/user_manage/AddUser.vue";
import { ElMessage, ElMessageBox } from "element-plus";

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

const total = ref(0);
const getTotal = () => {
  const params = ref({
    pageSize: 0,
    currentPage: 0,
  });

  http.getUserInfoList(
    params,
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
const fetchUserList = () => {
  http.getUserInfoList(
    requestParams,
    (data: any) => {
      UserList.value = data;
    },
    (err: any) => {
      console.log(err);
      ElMessage.error("未获得相关权限");
    }
  );
};

onMounted(() => {
  fetchUserList();
  getTotal();
});

const handleClick = (row: any) => {
  console.log(row);
};

const handleSizeChange = (size: number) => {
  // 获取页码数
  const pages = Math.ceil(total.value / size);
  // 将页码定位到第一页
  currentPage.value = 1;
  // 更新请求参数
  requestParams.value.currentPage = 0;
  requestParams.value.pageSize = size;
  pageSizeIndexValue.value = size;
  fetchUserList();
};

const handleCurrentChange = (page: number) => {
  currentPage.value = page;
  requestParams.value.currentPage = (page - 1) * pageSizeIndexValue.value;
  fetchUserList();
};

const isCheckboxColumnVisible = ref(false); // 控制多选框列的显示
const selectedUserIds = ref([]); // 用来存储选中的用户ID列表

const handleBatchDelete = () => {
  http.batchDeleteBillByIds(
    selectedUserIds.value,
    () => {
      ElMessage.success("删除成功");
      fetchUserList();
      selectedUserIds.value = []; // 重置选中的用户ID列表
      isCheckboxColumnVisible.value = false; // 隐藏多选框列
    },
    (err: any) => {
      console.log(err);
      ElMessage.error("删除失败");
    }
  );
};

const delectIdList = ref([]); // 用来存储选中的用户ID列表
const delectUser = () => {
  http.batchDeleteBillByIds(
    delectIdList.value,
    () => {
      ElMessage.success("删除成功");
      fetchUserList();
      selectedUserIds.value = []; // 重置选中的用户ID列表
      isCheckboxColumnVisible.value = false; // 隐藏多选框列
    },
    (err: any) => {
      console.log(err);
      ElMessage.error("删除失败");
    }
  );
};

const delectUserById = (row: any) => {
  // 转换为never类型，防止类型检查报错
  delectIdList.value.push(row as never);
  console.log("id:" + delectIdList.value);
  if (delectIdList.value.length > 0) {
    // 在某个地方调用 open 函数
    open()
      .then((result) => {
        // 用户确认删除
        delectUser();
      })
      .catch((error) => {
        // 处理错误
        console.info("取消删除:", error);
      });
  } else {
    isCheckboxColumnVisible.value = !isCheckboxColumnVisible.value;
    selectedUserIds.value = []; // 重置选中的用户ID列表
  }
};

const toggleCheckboxColumn = () => {
  if (selectedUserIds.value.length > 0) {
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
    selectedUserIds.value = []; // 重置选中的用户ID列表
  }
};

const handleSelectionChange = (selection: any) => {
  selectedUserIds.value = selection.map((item: any) => item.id);
  console.log(selectedUserIds.value);
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
const SearchUserList = () => {
  if (searchParams.value.keyWords === "") {
    ElMessage.warning("请输入搜索内容");
    return;
  }

  http.searchUserBykeywords(
    searchParams,
    (data: any) => {
      console.log(data);
      UserList.value = data;
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
    fetchUserList();
  }
);
const showUserManagehPanel = ref(false);

const userId = ref("");
const onEditUser = (id: string) => {
  userId.value = id;
  toggleEditUser();
};

const toggleClosePanel = () => {
  showUserManagehPanel.value = false;
  showEditUser.value = false;
  showAddUser.value = false;
};

const showEditUser = ref(false);
const toggleEditUser = () => {
  showEditUser.value = true;
  showUserManagehPanel.value = true;
};
const uploadUrl = ref(axios.defaults.baseURL + "api/admin/account/save/excel");
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

const showAddUser = ref(false);
const toggleAddUser = () => {
  showAddUser.value = true;
  showUserManagehPanel.value = true;
};
const addUser = () => {
  toggleAddUser();
};

// 导出excel
const exportExcel = () => {
  http.exportExcel(
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
  fetchUserList();
};
const handleUploadError = () => {
  ElMessage.error("导入失败");
};
</script>

<template>
  <div v-if="showUserManagehPanel" class="search-container">
    <div class="card">
      <el-button
        class="search_close_button"
        type="link"
        @click="toggleClosePanel"
      >
      </el-button>

      <EditUser v-if="showEditUser" :userId="userId" />
      <AddUser v-if="showAddUser" />
    </div>
  </div>
  <!-- 页签 -->
  <div style="margin-bottom: 20px">
    <el-breadcrumb separator="<">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
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
    <el-button style="margin-left: 10px" @click="SearchUserList" :icon="Search"
      >搜索</el-button
    >
  </div>

  <!-- 按钮 -->
  <el-button type="success" @click="addUser" :icon="CirclePlus">新增</el-button>
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
    :data="UserList"
    border
    style="margin-top: -10px"
  >
    <el-table-column
      v-if="isCheckboxColumnVisible"
      type="selection"
      width="45"
    ></el-table-column>

    <el-table-column fixed prop="id" label="ID" width="200"></el-table-column>
    <el-table-column
      prop="registerTime"
      label="日期"
      width="120"
    ></el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      width="100"
    ></el-table-column>
    <el-table-column prop="nickname" label="昵称" width="120"></el-table-column>
    <el-table-column prop="role" label="权限" width="120"></el-table-column>
    <el-table-column width="190" prop="address" label="地址"></el-table-column>
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button
          @click="onEditUser(scope.row.id)"
          type="primary"
          size="small"
          :icon="EditPen"
          >编辑</el-button
        >
        <el-button
          @click="delectUserById(scope.row.id)"
          type="danger"
          size="small"
          :icon="Delete"
          >删除</el-button
        >
        <el-button
          @click="resetPassword(scope.row.id)"
          color="#626aef"
          loading-icon="Eleme"
          icon="HelpFilled"
          size="small"
          >重置密码
        </el-button>
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
  border: 1px solid #eaebee;
}
</style>
