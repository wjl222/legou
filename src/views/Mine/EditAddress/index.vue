<template>
  <div>
    <Nav />
    <div class="address_c">
      <van-address-edit
        v-if="requestSuccess"
        :area-list="areaList"
        :show-postal="false"
        :address-info="addressInfo"
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @change-detail="onChangeDetail"
      />
    </div>
  </div>
</template>



<script>
import areaList from "@/assets/area/area.js";
import Nav from "@/components/common/Nav";
import { getAddressList, addAddress } from "@/api/mine/index.js";

export default {
  data() {
    return {
      searchResult: [],
      areaList,
      openid: "",
      addressInfo: {},
      requestSuccess: false,
      // 地址id
      addressId: ''
    };
  },
  components: {
    Nav,
  },
  methods: {
    onSave(val) {
      const params = {
          address: `${val.province} ${val.city} ${val.county}`,
          addressId: this.$route.query.id ? val.id : '',
          checked: val.isDefault,
          detailadress: val.addressDetail,
          openId: this.openId,
          telNumber: val.tel,
          userName: val.name
      }
      addAddress(params).then(res => {
          this.$router.push('/addressCollect')
      })

    },
    onChangeDetail() {},
    // 如果是修改，则请求数据
    requestAddressDetail() {
      if (this.$route.query.id) {
        const data = {
          openId: this.openId,
        };
        getAddressList(data).then((res) => {
          this.requestSuccess = true;
          const nowEditAddress = res.data.filter((item) => {
            return item.id == this.$route.query.id;
          });
          //   初始化默认值
          this.addressInfo.id = nowEditAddress[0].id;
          this.addressInfo.name = nowEditAddress[0].name;
          this.addressInfo.tel = nowEditAddress[0].mobile;
          this.addressInfo.addressDetail = nowEditAddress[0].address_detail;
          this.addressInfo.isDefault =
            nowEditAddress[0].is_default == 1 ? true : false;
            // 处理默认地址
          const addressArr = nowEditAddress[0].address.split(" ");
          switch (addressArr.length) {
          }
          switch (addressArr.length) {
            case 1:
              for (const key in areaList.province_list) {
                const element = areaList.province_list[key];
                if (element == addressArr[2]) {
                  this.addressInfo.areaCode = key;
                }
              }
              break;
            case 2:
              for (const key in areaList.city_list) {
                const element = areaList.city_list[key];
                if (element == addressArr[2]) {
                  this.addressInfo.areaCode = key;
                }
              }
              break;
            case 3:
              for (const key in areaList.county_list) {
                const element = areaList.county_list[key];
                if (element == addressArr[2]) {
                  this.addressInfo.areaCode = key;
                }
              }
              break;
            default:
              break;
          }
        });
      }
    },
  },
  created() {
    this.openId = window.localStorage.getItem("openId");
    this.requestAddressDetail();
  },
};
</script>

<style lang="scss">
.address_c {
  padding-top: 45px;
}
</style>