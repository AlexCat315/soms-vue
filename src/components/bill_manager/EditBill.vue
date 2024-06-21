<script setup lang="ts">
import { ref, onMounted, compile } from "vue";
import httpBill from "@/net/api/admin/BillManager";
import { ElMessage } from "element-plus";
// 接受父组件传递过来的 userId
const props = defineProps<{ billId: String }>();

const billFrom = ref({
  id: "",
  billCode: "",
  productName: "",
  productDesc: "",
  productUnit: "",
  productCount: "",
  totalPrice: "",
  isPayment: "",
  providerId: "",
});

const prviderMap = ref([
  {
    id: "",
    proName: "",
  },
]);
const pId = ref(props.billId);
onMounted(() => {
  httpBill.getProviderMap(
    (data: any) => {
      console.log("获取供应商信息成功");
      prviderMap.value = data;
      console.log(prviderMap.value);
    },
    (err: any) => {
      console.log("获取供应商信息失败");
      ElMessage.error("新增供应商失败");
    }
  );

  httpBill.getBillInfoById(
    pId,
    (data: any) => {
      console.log("获取订单信息成功");
      billFrom.value = data;
      console.log(billFrom.value);
    },
    (err: any) => {
      console.log("获取订单信息失败");
      ElMessage.error("获取订单信息失败");
    }
  );
});

const updateBill = () => {
  billFrom.value.isPayment = isPay.value;
  billFrom.value.providerId = providerId.value;
  billFrom.value.id = pId.value.toString();
  httpBill.updateBill(
    billFrom,
    () => {
      console.log("修改订单成功");
      ElMessage.success("修改订单成功");
    },
    (err: any) => {
      console.log("修改订单失败");
      ElMessage.error("修改订单失败");
    }
  );
};
const isPay = ref("");
const providerId = ref("");
const options = [
  {
    value: 1,
    label: "已付款",
  },
  {
    value: 2,
    label: "未付款",
  },
];
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
    添加订单
  </h1>

  <!-- Form -->
  <div>
    <el-form :model="billFrom" label-width="auto" style="max-width: 600px">
      <el-form-item
        style="font-family: 'Microsoft YaHei UI', sans-serif; margin-left: 10px"
        label="商品名称:"
      >
        <el-input
          placeholder="商品名称"
          style="width: 90%"
          v-model="billFrom.productName"
        >
          <template #prefix>
            <el-icon><Box /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        style="
          margin-top: 30px;
          font-family: 'Microsoft YaHei UI', sans-serif;
          margin-left: 10px;
        "
        label="商品描述:"
      >
        <el-input
          placeholder="如:食品-牛奶"
          v-model="billFrom.productDesc"
          style="width: 90%"
          type="text"
        >
          <template #prefix>
            <el-icon><Connection /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <div style="display: flex; align-items: center">
        <el-form-item
          style="
            margin-top: 10px;
            font-family: 'Microsoft YaHei UI', sans-serif;
            margin-left: 8px;
            flex: 1;
          "
          label="商品数量:"
        >
          <el-input
            placeholder="如:100"
            v-model="billFrom.productCount"
            style="width: 150px"
            type="text"
          >
            <template #prefix>
              <el-icon><More /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item
          style="
            margin-top: 10px;
            font-family: 'Microsoft YaHei UI', sans-serif;
            margin-left: -40px;
            flex: 1;
          "
          label="单位:"
        >
          <el-input
            placeholder="如:斤"
            v-model="billFrom.productUnit"
            style="width: 100px"
            type="text"
          >
            <template #prefix>
              <el-icon><Chicken /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </div>
      <el-form-item
        style="
          margin-top: 10px;
          font-family: 'Microsoft YaHei UI', sans-serif;
          margin-left: 10px;
        "
        label="商品总额:"
      >
        <el-input
          placeholder="商品总额"
          v-model="billFrom.totalPrice"
          style="width: 90%"
          type="text"
        >
          <template #prefix>
            <el-icon><Sugar /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        style="
          margin-top: 30px;
          font-family: 'Microsoft YaHei UI', sans-serif;
          margin-left: 10px;
        "
        label="是否已付款:"
      >
        <el-select v-model="isPay" placeholder="选择" style="max-width: 90%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="
          margin-top: 30px;
          font-family: 'Microsoft YaHei UI', sans-serif;
          margin-left: 10px;
        "
        label="供应商名称:"
      >
        <el-select
          v-model="providerId"
          placeholder="选择"
          style="max-width: 90%"
        >
          <el-option
            v-for="item in prviderMap"
            :key="item.id"
            :label="item.proName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          style="height: 40px; width: 150px; margin-left: 120px"
          type="success"
          plain
          round
          @click="updateBill"
          >修改订单</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
