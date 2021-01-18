<template>
  <div class="add_address_con">
    <Nav />
    <van-cell-group>
      <van-field v-model="newAddressInfo.userName" placeholder="姓名" />
      <van-field v-model="newAddressInfo.telNumber" placeholder="手机号码" />
      <van-field @click-input="selectAddress" readonly placeholder="省份" v-model="newAddressInfo.address" />
      <van-field
        v-model="newAddressInfo.detailadress"
        placeholder="详细地址，如楼道、楼盘号等"
      />
      <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
        <van-area
          title="选择省/市/区"
          :area-list="areaList"
          v-model="areaVal"
          @confirm="clickSuccess"
          @cancel="cancelSelect"
        />
      </van-popup>
    </van-cell-group>
    <van-checkbox v-model="newAddressInfo.checked" shape="square">设置为默认地址</van-checkbox>
    <div class="bottomBtn" @click="bottomBtn">提 交</div>
  </div>
</template>

<script>
import Nav from "@/components/common/Nav";
import areaList from "@/assets/area/area.js";
import { addAddress } from '@/api/mine';

export default {
  data() {
    return {
      newAddressInfo: {
        address: "",
        addressId: "",
        checked: false,
        detailadress: "",
        openId: "",
        telNumber: null,
        userName: "",
      },
      show: false,
      areaList,
      areaVal: "",
    };
  },
  components: {
    Nav,
  },
  methods: {
    selectAddress() {
      this.show = true;
    },
    clickSuccess(item) {
      const arr = item.map((element) => {
        return element.name;
      });
      this.newAddressInfo.address = arr.join(" ");
      this.show = false;
    },
    cancelSelect() {
      this.show = false;
    },
    // 提交
    bottomBtn() {
        console.log(this.newAddressInfo);
      addAddress(this.newAddressInfo).then(res => {
          this.$router.push('/addressCollect')
      })
    },
  },
  created() {
      this.newAddressInfo.openId = window.localStorage.getItem('openId')
  }
};
</script>

<style lang="scss">
@import "@/assets/commonVariable.scss";

.add_address_con {
  padding-top: 45px;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
}

.bottomBtn {
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 0;
  background-color: $theme_colors;
  color: #fff;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
}

.van-checkbox {
    margin-left: 20px;
    margin-top: 30px;
}
</style>