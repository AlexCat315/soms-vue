<script setup lang="ts">
import { ref } from "vue";
import { Fold, User } from "@element-plus/icons-vue";
import UserManage from "@/components/UserManage.vue";
import MainMenu from "@/components/MainMenu.vue";
import SupploerManager from "@/components/SupplierManager.vue";
import logout from "@/net/api/account/logout";
import router from "@/routers/Router";
import { ElMessage } from "element-plus";
import BillManager from "@/components/BillManager.vue";

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

import { inject ,Ref,watch} from 'vue';
const activeTextColor = ref("#FFd04b");


// 接收全局变量
const globalSelect = inject<Ref<string>>('globalSelect');
// 检查 globalSelect 是否存在并设置默认值
if (!globalSelect) {
  throw new Error('globalSelect is not provided');
}

const selectIndex = ref(globalSelect);


const handleSelect = (index: string) => {
  selectIndex.value = index;
  globalSelect.value = index;
};
// 监听全局变量变化
watch(globalSelect, (newValue, oldValue) => {
  if (newValue === oldValue) return;
  selectIndex.value = newValue;
});
</script>

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
          style="height: 100%; overflow-x: hidden"
          background-color="rgb(48, 65, 86)"
          text-color="#FFF"
          :active-text-color="activeTextColor"
          :collapse-transition="false"
          :collapse="isCollapse"
          @select="handleSelect"
          :default-active="selectIndex"
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
          <el-menu-item  index="1">
            <el-icon color="black"><HomeFilled /></el-icon>
            <template #title>主菜单</template>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon color="black"><Avatar /></el-icon>
            <template #title>用户管理</template>
          </el-menu-item>
           <el-menu-item index="3">
            <el-icon color="black"><Coin /></el-icon>
            <template #title>供应商管理</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon color="black"><GoodsFilled /></el-icon>
            <template #title>订单管理</template>
          </el-menu-item>
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
          <MainMenu :select="selectIndex" v-if="selectIndex === '1'" />
          <UserManage v-if="selectIndex === '2'" />
          <SupploerManager v-if="selectIndex === '3'" />
          <BillManager v-if="selectIndex === '4'" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.headerBg {
  background-color: #cccccc;
}
</style>
