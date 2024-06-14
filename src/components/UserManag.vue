<script setup lang="ts">
import { ref } from "vue";
import {
  Search,
  Fold,
  CirclePlus,
  DeleteFilled,
  UploadFilled,
  SoldOut,
  EditPen,
  Delete,
  User,
} from "@element-plus/icons-vue";
import { ArrowDown } from "@element-plus/icons-vue";

const handleClick = (row: any) => {
  console.log(row);
};

const handleSizeChange = (size: number) => {
  console.log(size);
};
const currentPage4 = ref(1);
const handleCurrentChange = (page: number) => {
  currentPage4.value = page;
};

const tableData = ref(
  Array(10).fill({
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄",
  })
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

          <el-dropdown style="margin-top: 40px;margin-left: -385px">
            <el-button type="info">
              全部用户<el-icon class="el-icon--right"
                ><arrow-down
              /></el-icon>
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

          <el-table :data="tableData" border style="margin-top: 15px">
            <el-table-column
              prop="date"
              label="日期"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="date"
              label="用户名"
              width="160"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="date"
              label="权限"
              width="120"
            ></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column label="操作">
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
              :current-page="currentPage4"
              :page-sizes="[5, 10, 20]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="100"
            ></el-pagination>
          </div>

</template>

<style scoped>
.headerBg {
  background-color: #cccccc !important;
}

</style>