<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import httpBill from "@/net/api/admin/BillManager";

const props = defineProps<{
  message: string;
}>();

import { defineEmits } from "vue";

const BillInfo = ref({
  billCode: "BILL2016_013",
  creationDate: "2016-11-14 23:23:00",
  id: 13,
  isPayment: 2,
  modifyBy: null,
  modifyDate: null,
  nickname: "王小虎",
  proName: "北京纳福尔食用油有限公司",
  productCount: 60,
  productDesc: "饮料-红酒",
  productName: "长城红葡萄酒",
  productUnit: "瓶",
  totalPrice: 800,
});
const emit = defineEmits<{
  (event: "childData", data: boolean): void;
}>();

const sendDataToParent = () => {
  emit("childData", false);
};
const isPay = ref("")
const univalent = ref();
onMounted(() => {
  console.log(props.message);
  const id = ref(props.message);
  httpBill.getBillInfoById(
    id,
    (data: any) => {
      BillInfo.value = data;
      univalent.value = (
        BillInfo.value.totalPrice / BillInfo.value.productCount
      ).toFixed(2);

      isPay.value =
        BillInfo.value.isPayment === 1? "已支付" : "未支付";
      console.log(data);
    },
    (err: any) => {}
  );
});
</script>

<template>
  <div class="master-container">
    <div class="card cart">
      <label class="title">订单详情</label>
      <div class="products">
        <div class="product">
          <svg
            t="1718956786288"
            class="icon"
            viewBox="0 0 1081 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1226"
            width="50"
            height="50"
          >
            <path
              d="M310.6816 787.184417c79.538087 4.287443 143.542539 57.624487 142.852452 122.55054-0.67673 64.828104-70.264209 116.611339-155.314087 112.056765-85.045426-4.478887-148.82727-63.349983-142.634295-127.888696 6.197426-64.627757 75.562296-110.885843 155.09593-106.718609zM837.9392 780.8c79.449043-6.099478 149.958122 38.46233 157.718261 102.920904 7.751235 64.365078-54.623722 124.76327-139.5712 131.307966-84.95193 6.620383-155.781565-43.466574-158.034365-108.259061-2.2528-64.885983 60.438261-119.76793 139.887304-125.969809z"
              fill="#FF8413"
              p-id="1227"
            ></path>
            <path
              d="M255.977739 571.142678c-29.273043-2.048-54.993252 16.370643-57.170365 41.431931l-11.597913 137.389634c-2.132591 25.052383 1.389078 57.250504 7.924869 71.533079 6.433391 14.425043 72.098504 30.492939 103.66887 32.037843a4113.599443 4113.599443 0 0 0 703.519165-21.499548c31.441252-3.664139 54.410017-27.469913 51.084244-52.38873l-1.077426-8.200904c-3.325774-24.936626-31.009391-42.001809-61.560209-38.448974a4014.075548 4014.075548 0 0 1-686.476244 20.978643c-30.715548-1.731896-42.500452 2.453148-26.094191 9.656765 16.406261 7.154643 29.589148 19.852243 30.9248-5.253565l7.421774-137.674574c1.286678-25.114713-21.628661-46.903652-50.915061-48.893774-3.223374-0.218157-6.437843-0.440765-9.652313-0.667826z"
              fill="#FF8413"
              p-id="1228"
              data-spm-anchor-id="a313x.collections_detail.0.i0.3ec93a81vGfAN0"
              class="selected"
            ></path>
            <path
              d="M207.658296 147.678609a3417.341774 3417.341774 0 0 0 738.842713-11.250644c75.299617-9.398539 134.749496 39.962713 131.13433 113.423583a5028.236243 5028.236243 0 0 1-78.117843 280.246539c-21.334817 74.5472-38.448974 137.607791-174.498505 148.800556a3943.468522 3943.468522 0 0 1-507.837217 5.903583c-136.0896-8.009461-158.163478-32.220383-147.424835-144.312765 12.274643-130.9696 24.549287-261.943652 36.815026-392.9088"
              fill="#FF583B"
              p-id="1229"
            ></path>
            <path
              d="M268.626365 216.170852c20.083757-16.268243 22.024904-45.291965 5.142261-64.445217a3165.059339 3165.059339 0 0 1-81.372383-96.180313c-3.592904-4.416557-11.157148-8.548174-16.824765-9.184835a3303.272626 3303.272626 0 0 1-101.660939-13.035965c-24.963339-3.588452-48.617739 13.450017-52.615791 38.275339l-1.291131 8.165287c-3.998052 24.816417 13.841809 48.519791 39.700035 52.237356 15.698365 2.261704 31.414539 4.412104 47.139618 6.4512 25.835965 3.330226 39.210296 1.531548 29.736069-3.628521-9.425252-5.200139-4.109357 6.834087 12.1856 26.64626A3234.686887 3234.686887 0 0 0 194.114783 215.289322c16.847026 19.616278 47.776278 22.452313 67.900104 6.219687l6.611478-5.338157z"
              fill="#B0B5B5"
              p-id="1230"
            ></path>
          </svg>
          <div>
            <span>{{ BillInfo.productName }}</span>
            <p>购买数量</p>
            <p>{{ BillInfo.productDesc }}</p>
          </div>
          <div class="quantity">
            <!-- 居中 -->
            <label style="margin-left: 30px">{{ BillInfo.productCount }}</label>
          </div>
          <label class="price small">单价:{{ univalent }}¥</label>
        </div>
      </div>
    </div>

    <div class="card coupons">
      <label class="title">Apply coupons</label>
      <div class="card checkout">
        <div class="detailsAPP">
          <span>账单编码:</span>
          <span>{{ BillInfo.billCode }}</span>
          <span>消费时间:</span>
          <span>{{ BillInfo.creationDate }}</span>
          <span>消费者:</span>
          <span>{{ BillInfo.nickname }}</span>
          <span>是否支付:</span>
          <span>{{ isPay }}</span>
        </div>
      </div>
    </div>

    <div class="card checkout">
      <label class="title">消费详情</label>
      <div class="details">
        <span>商品折扣:</span>
        <span>0.00¥</span>
        <span>商品优惠:</span>
        <span>0.00¥</span>
        <span>运费:</span>
        <span>0.00¥</span>
      </div>
      <div class="checkout--footer">
        <!-- 总计 -->

        <label style="font-size: 13px">总计:</label>
        <label class="price"><sup>¥</sup>{{ BillInfo.totalPrice }}</label>
        <button @click="sendDataToParent" class="checkout-btn">关闭订单</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.master-container {
  display: grid;
  grid-template-columns: auto;
  gap: 5px;
}

.card {
  width: 400px;
  background: #ffffff;
  box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01),
    0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09),
    0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
}

.title {
  width: 100%;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid #efeff3;
  font-weight: 700;
  font-size: 11px;
  color: #63656b;
}

/* cart */
.cart {
  border-radius: 19px 19px 7px 7px;
}

.cart .products {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.cart .products .product {
  display: grid;
  grid-template-columns: 60px 1fr 80px 1fr;
  gap: 10px;
}

.cart .products .product span {
  font-size: 13px;
  font-weight: 600;
  color: #47484b;
  margin-bottom: 8px;
  display: block;
}

.cart .products .product p {
  font-size: 11px;
  font-weight: 600;
  color: #7a7c81;
}

.cart .quantity {
  height: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: auto;
  background-color: #ffffff;
  border-radius: 7px;
  filter: drop-shadow(1px 1px 1px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
}

.cart .quantity label {
  width: 20px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2px;
  font-size: 15px;
  font-weight: 700;
  color: #47484b;
}

.cart .quantity button {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  outline: none;
  background-color: transparent;
  padding-bottom: 2px;
}

.card .small {
  font-size: 15px;
  margin: 0 0 auto auto;
}

.card .small sup {
  font-size: px;
}

/* coupons */
.coupons {
  border-radius: 20px;
}

.coupons form {
  display: grid;
  grid-template-columns: 1fr 80px;
  gap: 10px;
  padding: 10px;
}

.input_field {
  width: auto;
  height: 36px;
  padding: 0 0 0 12px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #e5e5e5;
  filter: drop-shadow(0px 1px 0px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.input_field:focus {
  border: 1px solid transparent;
  box-shadow: 0px 0px 0px 2px #242424;
  background-color: transparent;
}

.coupons form button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 18px;
  gap: 10px;
  width: 100%;
  height: 36px;
  background: linear-gradient(180deg, #4480ff 0%, #115dfc 50%, #0550ed 100%);
  box-shadow: 0px 0.5px 0.5px #efefef, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
  border-radius: 5px;
  border: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
}

/* Checkout */
.checkout {
  border-radius: 9px 9px 19px 19px;
}

.checkout .details {
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 10px;
  gap: 5px;
}
.checkout .detailsAPP {
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 10px;
  gap: 5px;
}
.checkout .detailsAPP span {
  font-size: 11px;
  font-weight: 600;
}

.checkout .detailsAPP span:nth-child(odd) {
  font-size: 11px;
  font-weight: 700;
  color: #707175;
  margin: auto auto auto 0;
}

.checkout .detailsAPP span:nth-child(even) {
  font-size: 11px;
  font-weight: 600;
  color: #47484b;
  margin: auto 0 auto auto;
}

.checkout .details span {
  font-size: 13px;
  font-weight: 600;
}

.checkout .details span:nth-child(odd) {
  font-size: 11px;
  font-weight: 700;
  color: #707175;
  margin: auto auto auto 0;
}

.checkout .details span:nth-child(even) {
  font-size: 13px;
  font-weight: 600;
  color: #47484b;
  margin: auto 0 auto auto;
}

.checkout .checkout--footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 10px 20px;
  background-color: #efeff3;
}

.price {
  margin-left: -100px;
  position: relative;
  font-size: 22px;
  color: #2b2b2f;
  font-weight: 900;
}

.price sup {
  font-size: 13px;
}

.price sub {
  width: fit-content;
  position: absolute;
  font-size: 11px;
  color: #5f5d6b;
  bottom: 5px;
  display: inline-block;
}

.checkout .checkout-btn {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 36px;
  background: linear-gradient(180deg, #4480ff 0%, #115dfc 50%, #0550ed 100%);
  box-shadow: 0px 0.5px 0.5px #efefef, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
  border-radius: 7px;
  border: 0;
  outline: none;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}
</style>
