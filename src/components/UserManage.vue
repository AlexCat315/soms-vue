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
import { ElMessage } from "element-plus";



const pageSizeOptions = ref([5, 10, 20, 30, 40, 50]);
const currentPage = ref(1);
const pageSizeIndexValue = ref(pageSizeOptions.value[0]);

const requestParams = ref({
  pageSize: pageSizeIndexValue.value,
  currentPage: currentPage.value - 1,
});

const UserList = ref([
  {
    id: 0,
    name: "",
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
      console.log(data);
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
      style="width: 200px"
      suffix-icon="el-icon-search"
      placeholder="请输入名称"
    ></el-input>
    <el-button style="margin-left: 10px" :icon="Search">搜索</el-button>
  </div>

  <!-- 按钮 -->
  <el-button type="success" :icon="CirclePlus">新增</el-button>
  <el-button type="danger" :icon="DeleteFilled">批量删除</el-button>
  <el-button type="warning" :icon="UploadFilled">导入</el-button>
  <el-button type="primary" :icon="SoldOut">导出</el-button>

  <!-- 下拉菜单 -->
  <el-dropdown style="margin-top: 40px; margin-left: -385px">
    <el-button type="info">
      全部用户<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item>Action 4</el-dropdown-item>
        <el-dropdown-item>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <!-- 表格 -->
  <el-table :data="UserList" border style="margin-top: 15px">
    <el-table-column
      fixed
      prop="registerTime"
      label="日期"
      width="120"
    ></el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      width="160"
    ></el-table-column>
    <el-table-column prop="name" label="姓名" width="120"></el-table-column>
    <el-table-column prop="role" label="权限" width="120"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button
          @click="handleClick(scope.row)"
          type="warning"
          size="small"
          :icon="EditPen"
          >编辑<i class="el-icon-edit"></i
        ></el-button>
        <el-button type="danger" size="small" :icon="Delete"
          >删除<i class="el-icon-remove-outline"></i
        ></el-button>
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
