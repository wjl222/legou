<template>
  <div class="my_address_collect_con">
    <Nav />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>


import Nav from "@/components/common/Nav";
import { addAddress, getAddressList } from "@/api/mine";
export default {
  data() {
    return {
      chosenAddressId: "",
      list: [],
      disabledList: [],
      openId: "",
    };
  },
  methods: {
    onAdd() {
      this.$router.push('/addAddress')
    },
    onEdit(item) {
        this.$router.push({
            path: "/editAddress",
            query: {
                id: item.id
            } 
        })
    },
    // 提交新增地址
    sureAddAddress() {
      const params = {
        address: "天津市 天津市 河东区 ",
        addressId: "",
        checked: false,
        detailadress: "长江大道105号",
        openId: this.openId,
        telNumber: 13888888888,
        userName: "张三",
      };
      addAddress(params).then((res) => {
        console.log(res);
      });
    },
    // 请求地址数据
    initAddressList() {
      getAddressList({ openId: this.openId }).then((res) => {
        const addressList = res.data.map(item => {
            const obj = {};
            obj.id = item.id;
            obj.name = item.name;
            obj.tel = item.mobile;
            obj.address = item.address + ' ' + item.address_detail;
            obj.isDefault = item.is_default  == 0 ? false : true;
            return obj
        })
        this.list = addressList
      });
    },
  },
  created() {
    this.openId = window.localStorage.getItem("openId");
    this.initAddressList();
  },
  components: {
    Nav,
  },
};
</script>

<style lang="scss">
.my_address_collect_con {
  padding-top: 45px;
}
</style>