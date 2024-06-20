<script setup lang="ts">
import {  ref } from "vue";
import http from "@/net/api/admin/UserManage";
import { ElMessage } from "element-plus";

const userFrom = ref({
  nickname: "",
  username: "",
  address: "",
  role: "",
  registerTime: "",
});

const providerFrom = ref(
  {
    proCode: "",
    proName: "",
    proDesc: "",
    proContact: "",
    proPhone: "",
    proAddress: "",
  },
);

const options = [
  {
    value: "admin",
    label: "管理员",
  },
  {
    value: "user",
    label: "普通用户",
  },
];

const userAddFrom = ref({
  nickname: "",
  username: "",
  address: "",
  role: "",
  registerTime: "",
});

// 点击修改按钮后，将 userFrom 的值赋值给 userUpdateFrom，并将 role 值转换为后台需要的格式
const AddUser = () => {
  userAddFrom.value = userFrom.value;
  switch (userAddFrom.value.role) {
    case "管理员":
      userAddFrom.value.role = "admin";
      break;
    case "普通用户":
      userAddFrom.value.role = "user";
      break;
  }
  http.addUser(
    userAddFrom,
    () => {
      console.log("新增用户成功");
      ElMessage.success("新增用户成功");
    },
    () => {
      console.log("新增用户失败");
      ElMessage.error("新增用户失败");
    }
  );
};
</script>

<template>
  <h1
    style="
      font-family: 'Microsoft YaHei UI', sans-serif;
      font-size: 27px;
      margin-top: 10px;
      margin-left: 145px;
    "
  >
    新增供应商
  </h1>

  <!-- Form -->
  <div>
    <el-form :model="providerFrom" label-width="auto" style="max-width: 600px">
      <el-form-item
        style="font-family: 'Microsoft YaHei UI', sans-serif; margin-left: 10px"
        label="供应商编码:"
      >
        <el-input placeholder="供应商编码" style="width: 90%" v-model="providerFrom.proCode">
          <template #prefix>
            <el-icon><Coin /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        style="
          margin-top: 30px;
          font-family: 'Microsoft YaHei UI', sans-serif;
          margin-left: 10px;
        "
        label="供应商名称:"
      >
        <el-input placeholder="公司名称" v-model="providerFrom.proName" style="width: 90%" type="text">
          <template #prefix>
            <el-icon><InfoFilled /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        style="
          margin-top: 30px;
          font-family: 'Microsoft YaHei UI', sans-serif;
          margin-left: 10px;
        "
        label="公司地址:"
      >
        <el-input placeholder="xx省xx市xx区xx街道xx号" v-model="providerFrom.proAddress" style="width: 90%" type="text">
          <template #prefix>
            <el-icon><AddLocation /></el-icon>
          </template>
        </el-input>
      </el-form-item>
       <el-form-item
        style="
          margin-top: 30px;
          font-family: 'Microsoft YaHei UI', sans-serif;
          margin-left: 10px;
        "
        label="供应商描述:"
      >
        <el-input placeholder="主营业务"  v-model="providerFrom.proAddress" style="width: 90%" type="text">
          <template #prefix>
            <el-icon><Money /></el-icon>
          </template>
        </el-input>
      </el-form-item>
       <el-form-item
        style="
          margin-top: 30px;
          font-family: 'Microsoft YaHei UI', sans-serif;
          margin-left: 10px;
        "
        label="负责人:"
      >
        <el-input placeholder="真实姓名"  v-model="providerFrom.proAddress" style="width: 90%" type="text">
          <template #prefix>
            <el-icon><UserFilled /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        style="
          margin-top: 30px;
          font-family: 'Microsoft YaHei UI', sans-serif;
          margin-left: 10px;
        "
        label="联系电话:"
      >
        <el-input placeholder="手机号码"  v-model="providerFrom.proAddress" style="width: 90%" type="text">
          <template #prefix>
            <el-icon><Phone/></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        style="
          margin-top: 30px;
          font-family: 'Microsoft YaHei UI', sans-serif;
          margin-left: 10px;
        "
        label="传真号码:"
      >
        <el-input placeholder="传真号码/座机号码"  v-model="providerFrom.proAddress" style="width: 90%" type="text">
          <template #prefix>
            <el-icon><Promotion /></el-icon>
          </template>
        </el-input>
      </el-form-item>


      <el-form-item>
        <el-button
          style="height: 40px; width: 150px; margin-left: 120px"
          type="primary"
          plain
          round
          @click="AddUser"
          >新增供应商</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>