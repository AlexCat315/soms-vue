<script setup lang="ts">
import { ref, onMounted } from "vue";
import User from "@/components/myinfo/User.vue";
import httpUser from "@/net/api/admin/UserManage";
import router from "@/routers/Router";
import { ElMessage } from "element-plus";

const resetPasswordForm = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const userInfo = ref({
  id: "",
  username: "",
  role: "",
  registerTime: "",
  nickname: "",
  address: "",
});

onMounted(() => {
  httpUser.getAccountInfo(
    (data: any) => {
      userInfo.value = data;
    },
    () => {
      console.log("error");
    }
  );
});
const handleSubmit = () => {
  if (
    resetPasswordForm.value.newPassword !==
    resetPasswordForm.value.confirmPassword
  ) {
    ElMessage.error("两次密码输入不一致，请重新输入");
    return;
  } else {
    httpUser.updatePassword(
      resetPasswordForm.value,
      (data: any) => {
        console.log(data);
        sessionStorage.removeItem("accountSessionToken");
        router.push("/login");
        ElMessage.success("密码修改成功，请重新登录");
      },
      (err: any) => {
        ElMessage.error("密码修改失败");
        console.log("error", err);
      }
    );
  }
};
</script>

<template>
  <div style="display: flex; align-items: center">
    <div style="margin-top: 90px; flex: 1">
      <User />
    </div>
    <div style="margin-top: 10px; flex: 2; margin-left: -150px">
      <div>
        <el-card style="max-width: 790px; max-height: 250px; margin-top: 10px">
          <h1>用户信息</h1>
          <div>
            <p>昵称：{{ userInfo.nickname }}</p>
            <p>用户名：{{ userInfo.username }}</p>
            <p>权限：{{ userInfo.role }}</p>
            <p>注册时间：{{ userInfo.registerTime }}</p>
          </div>
        </el-card>
        <el-card style="max-width: 790px; margin-top: 40px; max-height: 400px">
          <h1
            style="
              background: #f8f9fc;
              margin-top: -20px;
              padding: 20px;
              width: 100%;
              margin-left: -20px;
            "
          >
            修改密码
          </h1>
          <div>
            <el-form :model="resetPasswordForm" label-width="100px">
              <el-form-item label="旧密码">
                <el-input
                  type="text"
                  style="max-width: 300px"
                  v-model="resetPasswordForm.oldPassword"
                  placeholder="请输入旧密码"
                ></el-input>
              </el-form-item>
              <el-form-item label="新密码">
                <el-input
                  type="password"
                  style="max-width: 300px"
                  v-model="resetPasswordForm.newPassword"
                  placeholder="请输入新密码"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认新密码">
                <el-input
                  type="password"
                  style="max-width: 300px"
                  v-model="resetPasswordForm.confirmPassword"
                  placeholder="请确认新密码"
                ></el-input>
              </el-form-item>
              <el-form-item
                ><el-button
                  style="margin-left: 5px; width: 100px"
                  type="primary"
                  @click="handleSubmit"
                  >修改</el-button
                ></el-form-item
              >
            </el-form>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
