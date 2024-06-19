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
  ArrowDown,
} from "@element-plus/icons-vue";
import http from "@/net/api/admin/UserManage";
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
  http.batchDeleteUserByAccountIds(
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
  http.batchDeleteUserByAccountIds(
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
  console.log("id:"+delectIdList.value);
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
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
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
</script>

<template>
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
    <el-button style="margin-left: 10px" @click="SearchUserList"
     :icon="Search"
      >搜索</el-button
    >
  </div>

  <!-- 按钮 -->
  <el-button type="success" :icon="CirclePlus">新增</el-button>
  <el-button type="danger" :icon="DeleteFilled" @click="toggleCheckboxColumn"
    >批量删除</el-button
  >
  <el-button type="warning" :icon="UploadFilled">导入</el-button>
  <el-button type="primary" :icon="SoldOut">导出</el-button>


  <!-- 表格 -->
  <el-table
    @selection-change="handleSelectionChange"
    :data="UserList"
    border
    style="margin-top: 15px"
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
      width="160"
    ></el-table-column>
    <el-table-column prop="nickname" label="昵称" width="120"></el-table-column>
    <el-table-column prop="role" label="权限" width="120"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button
          @click="handleClick(scope.row)"
          type="warning"
          size="small"
          :icon="EditPen"
          >编辑</el-button>
        <el-button
          @click="delectUserById(scope.row.id)"
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
</style>
