<script setup lang="ts">
import { ref } from 'vue'
import Select from "@/components/myinfo/Select.vue"

const receivedMessage = ref("");

const handleChildData = (data: string) => {
  receivedMessage.value = data;
};
</script>

<template>
<div>
      <div style="margin-bottom: 20px">
    <el-breadcrumb separator="<">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{receivedMessage}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
     <!-- 页签 -->
    <div>
        <Select @childData="handleChildData"  />
    </div>
</div>
</template>

<style scoped>

</style>