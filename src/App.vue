<script setup lang="ts">
import { provide, ref } from 'vue';

// 定义全局变量
const globalSelect = ref("1");

// 提供全局变量
provide('globalSelect', globalSelect);
</script>

<template>
  <router-view  />
</template>

<style scoped>

</style>
