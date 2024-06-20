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
    globalSelect.value = "3";
  }
}
</script>

<template>
<div class="notificationCard">
  <p class="notificationHeading">供应商管理</p>
<svg t="1718855614403" class="bellIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4134" width="200" height="200"><path d="M492.288 927.04h-391.04a33.28 33.28 0 0 1-33.984-32.576V627.072a33.28 33.28 0 0 1 33.92-32.576 33.28 33.28 0 0 1 33.984 32.64v234.752h326.656c7.488 23.04 17.792 44.864 30.464 65.152z m493.12-617.408c7.68 15.552 12.416 32.768 12.352 51.2 0 66.048-55.872 119.552-124.736 119.552-68.928 0-124.8-53.504-124.8-119.616 0 66.112-55.808 119.68-124.672 119.68-68.8 0-124.672-53.504-124.736-119.552 0 66.048-55.872 119.488-124.672 119.488-68.864 0-124.736-53.504-124.736-119.616 0 66.112-55.808 119.68-124.672 119.68C55.808 480.384 0 426.88 0 360.704a115.2 115.2 0 0 1 12.352-51.136l69.12-169.856h834.752l69.12 169.856zM78.272 89.28A25.6 25.6 0 0 1 103.488 64H895.36c13.888 0 25.216 11.712 25.216 25.28a25.6 25.6 0 0 1-25.216 25.216H103.488a25.472 25.472 0 0 1-25.216-25.216zM768 1024a256 256 0 1 1 0-512 256 256 0 0 1 0 512z m117.44-259.456a21.504 21.504 0 0 0 21.888-21.184 21.568 21.568 0 0 0-21.888-21.248h-56.64l56.512-54.848a20.8 20.8 0 0 0 0-30.08 22.4 22.4 0 0 0-30.912 0l-80.192 77.952-80.256-77.952a22.4 22.4 0 0 0-30.912 0 20.8 20.8 0 0 0 0 30.08l56.512 54.848h-52.928a21.568 21.568 0 0 0-21.888 21.248c0 11.712 9.856 21.184 21.888 21.184h87.488v42.432h-87.488a21.568 21.568 0 0 0-21.888 21.248c0 11.712 9.792 21.248 21.888 21.248h87.488v49.536c0 11.712 9.792 21.184 21.888 21.184a21.568 21.568 0 0 0 21.952-21.184v-49.536h87.488a21.568 21.568 0 0 0 21.888-21.248 21.504 21.504 0 0 0-21.888-21.248h-87.488v-42.432h87.488z"  p-id="4135"></path></svg>
  <p class="notificationPara">供应商管理模块，可以查看、更新、修改、删除供应商信息</p>
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
  fill: #ec521f;
}

.notificationHeading {
  color: black;
  font-weight: 600;
  font-size: 22px;
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
  background-color: #ec521f;
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
  color: #ec521f;
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
  background-color: #ec521f;
}
</style>