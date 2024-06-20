<script setup lang="ts">
import {  Ref, inject } from "vue";
// 接收全局变量
const globalSelect = inject<Ref<string>>("globalSelect");
// 检查 globalSelect 是否存在并设置默认值
if (!globalSelect) {
  throw new Error("globalSelect is not provided");
}
function updateGlobalSelect() {
  if (globalSelect?.value !== undefined) {
    globalSelect.value = "2";
  }
}
</script>

<template>
  <div class="notificationCard">
    <p class="notificationHeading">用户管理</p>
    <svg
      t="1718855298064"
      class="bellIcon"
      viewBox="0 0 1046 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="3104"
      width="200"
      height="200"
    >
      <path
        d="M520.550074 474.417258c-130.773611 0-237.208629-106.385599-237.208629-237.208629s106.397954-237.208629 237.208629-237.208629 237.208629 106.385599 237.208629 237.208629-106.385599 237.208629-237.208629 237.208629z m0-395.261233a158.139086 158.139086 0 1 0 158.139086 158.139086 158.274987 158.274987 0 0 0-158.139086-158.139086zM646.83896 580.580474h399.906568v79.069543H646.83896zM646.83896 756.473143h399.906568v79.069543H646.83896zM646.83896 932.365812h399.906568v79.069543H646.83896z"
        p-id="3105"
      ></path>
      <path
        d="M79.070223 1023.987645H0.00068v-106.731528a514.446214 514.446214 0 0 1 41.054389-202.220356 525.182375 525.182375 0 0 1 277.262294-277.262294 514.532696 514.532696 0 0 1 202.232711-41.091454v79.069543C277.164137 475.751556 79.070223 673.783698 79.070223 917.219053z"
        p-id="3106"
      ></path>
    </svg>
    <p class="notificationPara">
      用户管理模块，可以查看、更新、修改、删除用户信息
    </p>
    <div class="buttonContainer">
      <button @click="updateGlobalSelect()" class="AllowBtn">立即查看</button>
    </div>
  </div>
</template>

<style scoped>
.notificationCard {
  width: 220px;
  height: 280px;
  background: rgb(245, 245, 245);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 35px;
  gap: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.123);
  border-radius: 20px;
}

.bellIcon {
  width: 80px;
  margin: 10px 0px;
}

.bellIcon path {
  fill: #008c8c;
}

.notificationHeading {
  color: black;
  font-weight: 600;
  font-size: 20px;
}

.notificationPara {
  color: rgb(133, 133, 133);
  font-size: 14px;
  font-weight: 600;
  text-align: center;
}

.buttonContainer {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.AllowBtn {
  width: 200px;
  height: 40px;
  background-color: #008c8c;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
}

.NotnowBtn {
  width: 120px;
  height: 25px;
  color: #008c8c;
  border: none;
  background-color: transparent;
  font-weight: 600;
  font-size: 0.7em;
  cursor: pointer;
  border-radius: 20px;
}

.NotnowBtn:hover {
  background-color: rgb(239, 227, 255);
}

.AllowBtn:hover {
  background-color: #008c8c;
}
</style>
