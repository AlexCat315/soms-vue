<script setup lang="ts">
import { onMounted, ref } from "vue";
import http from "@/net/api/admin/UserManage";
import { ElMessage } from "element-plus";

// 接受父组件传递过来的 userId
const props = defineProps<{ userId: String }>();

// 将 userId 设置为响应式引用
const userId = ref(props.userId);

const userFrom = ref({
  nickname: "",
  username: "",
  address: "",
  role: "",
  registerTime: "",
});

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

const userUpdateFrom = ref({
  nickname: "",
  username: "",
  address: "",
  role: "",
  registerTime: "",
});

// 点击修改按钮后，将 userFrom 的值赋值给 userUpdateFrom，并将 role 值转换为后台需要的格式
const UpdateUser = () => {
  userUpdateFrom.value = userFrom.value;
  switch (userUpdateFrom.value.role) {
    case "管理员":
      userUpdateFrom.value.role = "admin";
      break;
    case "普通用户":
      userUpdateFrom.value.role = "user";
      break;
  }
  http.updateUserInfo(
    userUpdateFrom,
    () => {
      console.log("修改成功");
      ElMessage.success("修改成功");
    },
    () => {
      console.log("修改失败");
      ElMessage.error("修改失败");
    }
  );
};

onMounted(() => {
  http.getUserInfoById(userId.value.toString()).then((res) => {
    userFrom.value = res.data;
  });
});
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
    修改用户
  </h1>
  <!-- Form -->
  <div>
    <el-form :model="userFrom" label-width="auto" style="max-width: 600px">
      <el-form-item
        style="font-family: 'Microsoft YaHei UI', sans-serif; margin-left: 10px"
        label="用户名:"
      >
        <el-input style="width: 90%" v-model="userFrom.username">
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
        label="昵称:"
      >
        <el-input v-model="userFrom.nickname" style="width: 90%" type="text">
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
        label="地址:"
      >
        <el-input v-model="userFrom.address" style="width: 90%" type="text">
          <template #prefix>
            <el-icon><AddLocation /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="userFrom.registerTime"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          style="
            width: 88%;
            font-family: 'Microsoft YaHei UI', sans-serif;
            margin-left: 10px;
          "
          placeholder="选择时间"
          clearable
        />
      </el-form-item>
      <!-- 权限选择 -->
      <el-form-item style="margin-left: 10px" label="权限" name="region">
        <el-select
          v-model="userFrom.role"
          placeholder="请选择"
          style="width: 300px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
          <template #prefix>
            <el-icon><PictureRounded /></el-icon>
          </template>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          style="height: 40px; width: 150px; margin-left: 120px"
          type="primary"
          plain
          round
          @click="UpdateUser"
          >修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
