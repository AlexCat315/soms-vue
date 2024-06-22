<script setup lang="ts">
import { reactive } from "vue";
import http from "@/net/api/account/Register";
import router from "@/routers/Router";
import { ElMessage } from "element-plus";

// 表单数据
const form = reactive({
  username: "",
  password: "",
  rePassword: "",
  recommendCode: "",
});

const onSubmit = () => {
    console.log("submit");
  if (form.password!== form.rePassword) {
    ElMessage.error("两次密码输入不一致！");
    return;
  }
  http.register(
    form,
    (data: any) => {
      console.log(data);
      ElMessage.success("注册成功！");
      router.push("/login");
    },
    () => {
      ElMessage.error("注册失败！");
    }
  );
};
const toLogin = () => {
  router.push("/login");
  console.log("to login!");
};
</script>

<template>
  <div class="root">
    <div>
      <!-- 绝对定位 -->
      <h1 class="title">超市订单管理系统</h1>
    </div>
    <div class="card">
      <div class="logo-container">
        <img
          style="
            height: 50px;
            width: 50px;
            margin-left: -30px;
            margin-top: -70px;
          "
          src="@/assets/img/便利店.png"
          alt="logo"
        />
        <h1
          style="
            margin-left: 120px;
            font-family: 'Microsoft YaHei UI', sans-serif;
            font-size: 30px;
            font-weight: bold;
            color: #333;
          "
        >
          加入我们
        </h1>
      </div>

      <div style="margin-top: 10px">
        <el-form :model="form" label-width="auto" style="max-width: 600px">
          <el-form-item
            style="
              font-family: 'Microsoft YaHei UI', sans-serif;
              margin-left: 10px;
            "
            label="用户名:"
          >
            <el-input style="width: 90%" v-model="form.username" />
          </el-form-item>
          <el-form-item
            style="
              margin-top: 30px;
              font-family: 'Microsoft YaHei UI', sans-serif;
              margin-left: 10px;
            "
            label="密码:"
          >
            <el-input
              style="width: 90%"
              type="password"
              v-model="form.password"
            />
          </el-form-item>
          <el-form-item
            style="
              margin-top: 30px;
              font-family: 'Microsoft YaHei UI', sans-serif;
              margin-left: 10px;
            "
            label="重复密码:"
          >
            <el-input
              style="width: 90%"
              type="password"
              v-model="form.rePassword"
            />
          </el-form-item>
          <el-form-item
            style="
              margin-top: 30px;
              font-family: 'Microsoft YaHei UI', sans-serif;
              margin-left: 10px;
            "
            label="邀请码:"
          >
            <el-input
              style="width: 90%"
              type="text"
              v-model="form.recommendCode"
              placeholder="选填"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              style="height: 40px; width: 150px; margin-left: 120px"
              type="success"
              plain
              round
              @click="onSubmit"
              >注册</el-button
            >
          </el-form-item>
        </el-form>

        <div>
          <el-divider @click="toLogin" class="register-divider"
            >已有账号？</el-divider
          >
          <el-button
            style="height: 40px; width: 150px; margin-left: 120px"
            type="primary"
            plain
            round
            @click="toLogin"
            >返回登录</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.root {
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #97cfec, #fad0c4);
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
.title {
  position: absolute;
  margin-top: 70px;
  margin-left: 40%;
  font-size: 36px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.logo-container {
  display: flex;
  align-items: center;
}
.register-divider {
  font-family: "Courier New", Courier, monospace;
  color: #999999;
  cursor: pointer; /* 设置鼠标样式为手型 */
}
</style>
: any: any
