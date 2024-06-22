<script setup lang="ts">
import MyCard from "@/components/main_menu/MyCard.vue";
import AccountCard from "@/components/main_menu/AccountCard.vue";
import SupplierCard from "@/components/main_menu/SupplierCard.vue";
import OrderCard from "@/components/main_menu/OrderCard.vue";

//使用父组件传递过来的值
</script>

<template>
  <!-- 页签 -->
  <div style="margin-bottom: 20px">
    <el-breadcrumb separator="<">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>主菜单</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <!-- 菜单 -->
  <div class="card">
    <div>
      <div class="container">
        <MyCard class="item" style="transform: scale(0.7)" />
        <AccountCard class="item" style="transform: scale(0.7)" />
      </div>
      <div class="container">
        <SupplierCard class="item" style="transform: scale(0.7)" />
        <OrderCard class="item" style="transform: scale(0.7)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  /* 这将使子元素横向排列 */
}

.item {
  flex: 1;
  /* 这将使每个子元素平均分配容器空间 */
  /* 你可以根据需要调整 flex 值 */
}
</style>
