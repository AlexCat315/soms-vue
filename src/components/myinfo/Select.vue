<script setup lang="ts">
import { onMounted, ref } from "vue";
import Account from "@/components/myinfo/Account.vue"
import MyBill from "@/components/myinfo/MyBill.vue"
const selectedRadio = ref<string>("个人信息");

function handleRadioChange(event: Event) {
  const target = event.target as HTMLInputElement;
  selectedRadio.value = target.value;
  console.log(selectedRadio.value);
  sendDataToParent();
}

const emit = defineEmits<{
  (event: "childData", data: string): void;
}>();
const sendDataToParent = () => {
  emit("childData", selectedRadio.value);
};
onMounted(() => {
    sendDataToParent();
});

</script>

<template>
  <div class="radio-inputs">
    <label class="radio">
      <input
        type="radio"
        name="radio"
        value="个人信息"
        v-model="selectedRadio"
        @change="handleRadioChange"
      />
      <span class="name">个人信息</span>
    </label>
    <label class="radio">
      <input
        type="radio"
        name="radio"
        value="我的订单"
        v-model="selectedRadio"
        @change="handleRadioChange"
      />
      <span class="name">我的订单</span>
    </label>
  </div>
  <div v-if="selectedRadio === '个人信息'">
    <Account />
  </div>

  <div v-if="selectedRadio === '我的订单'">
    <MyBill />
  </div>

</template>

<style scoped>
.radio-inputs {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.5rem;
  background-color: #eee;
  box-sizing: border-box;
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  width: 300px;
  font-size: 14px;
}

.radio-inputs .radio {
  flex: 1 1 auto;
  text-align: center;
}

.radio-inputs .radio input {
  display: none;
}

.radio-inputs .radio .name {
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: none;
  padding: 0.5rem 0;
  color: rgba(51, 65, 85, 1);
  transition: all 0.15s ease-in-out;
}

.radio-inputs .radio input:checked + .name {
  background-color: #fff;
  font-weight: 600;
}
</style>
