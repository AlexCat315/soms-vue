<script setup lang="ts">
import { ref } from "vue";
import httpSupplier from "@/net/api/admin/SupplierManager";
import { ElMessage } from "element-plus";

const providerFrom = ref({
  proCode: "",
  proName: "",
  proDesc: "",
  proContact: "",
  proPhone: "",
  proAddress: "",
  proFax: "",
});

const AddSupplier = () => {
  httpSupplier.addSupplier(
    providerFrom,
    () => {
      console.log("新增供应商成功");
      ElMessage.success("新增供应商成功");
    },
    () => {
      console.log("新增供应商失败");
      ElMessage.error("新增供应商失败");
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
        <el-input
          placeholder="供应商编码"
          style="width: 90%"
          v-model="providerFrom.proCode"
        >
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
        <el-input
          placeholder="公司名称"
          v-model="providerFrom.proName"
          style="width: 90%"
          type="text"
        >
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
        <el-input
          placeholder="xx省xx市xx区xx街道xx号"
          v-model="providerFrom.proAddress"
          style="width: 90%"
          type="text"
        >
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
        <el-input
          placeholder="主营业务"
          v-model="providerFrom.proDesc"
          style="width: 90%"
          type="text"
        >
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
        <el-input
          placeholder="真实姓名"
          v-model="providerFrom.proContact"
          style="width: 90%"
          type="text"
        >
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
        <el-input
          placeholder="手机号码"
          v-model="providerFrom.proPhone"
          style="width: 90%"
          type="text"
        >
          <template #prefix>
            <el-icon><Phone /></el-icon>
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
        <el-input
          placeholder="传真号码/座机号码"
          v-model="providerFrom.proFax"
          style="width: 90%"
          type="text"
        >
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
          @click="AddSupplier"
          >新增供应商</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
