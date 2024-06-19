<template>
  <div
    style="
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif;
    "
  >
    <el-container style="height: 100%; min-height: 100vh">
      <el-aside
        :width="sideWidth + 'px'"
        style="
          background-color: rgb(238, 241, 246);
          min-height: 100%;
          box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
        "
      >
        <el-menu
          :default-openeds="['1', '3']"
          style="height: 100%; overflow-x: hidden"
          background-color="rgb(48, 65, 86)"
          text-color="#FFF"
          active-text-color="#FFd04b"
          :collapse-transition="false"
          :collapse="isCollapse"
        >
          <div style="height: 60px; line-height: 60px; text-align: center">
            <img
              src="@/assets/img/somsBG.png"
              alt=""
              style="
                width: 30px;
                position: relative;
                top: 5px;
                margin-right: 5px;
              "
            />
            <b style="color: #fff" v-show="logoTextShow">超市订单管理系统</b>
          </div>
          <el-sub-menu index="1">
            <template #title>
              <i class="el-icon-message"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template #title>分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span>导航二</span>
            </template>
            <el-menu-item-group>
              <template #title>分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header
          style="
            font-size: 12px;
            border-bottom: 1px solid #ccc;
            line-height: 60px;
            display: flex;
          "
        >
          <div style="flex: 1; font-size: 20px">
            <span
              :class="collapseBtnClass"
              style="cursor: pointer"
              @click="collape"
            ></span>
            <el-button type="info" plain round @click="collape" :icon="Fold"
              >折叠面板</el-button
            >
          </div>
          <el-dropdown style="width: 70px; cursor: pointer">
            <el-button style="margin-top: 10px" :icon="User" circle />

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item @click="handleClickLogout()"
                  >退出</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>

        <el-main>
          <UserManage />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Fold, User } from "@element-plus/icons-vue";
import UserManage from "@/components/UserManage.vue";
import logout from "@/net/api/account/logout";
import router from "@/routers/Router";
import { ElMessage } from "element-plus";

const collapseBtnClass = ref("el-icon-s-fold");
const isCollapse = ref(false);
const sideWidth = ref(200);
const logoTextShow = ref(true);

const collape = () => {
  isCollapse.value = !isCollapse.value;
  if (isCollapse.value) {
    sideWidth.value = 64;
    collapseBtnClass.value = "el-icon-s-unfold";
    logoTextShow.value = false;
  } else {
    sideWidth.value = 200;
    collapseBtnClass.value = "el-icon-s-fold";
    logoTextShow.value = true;
  }
};
const handleClickLogout = () => {
  logout.logout(
    {},
    (data: any) => {
      console.log("logout success");
      // 清除指定的sessionStorage
      sessionStorage.removeItem("accountSessionToken");
      router.push("/login");
      ElMessage.success("退出成功");
    },
    (err: any) => {
      console.log(err);
      ElMessage.error("退出失败,请联系管理员");
    }
  );
};
</script>

<style scoped>
.headerBg {
  background-color: #cccccc !important;
}
</style>
