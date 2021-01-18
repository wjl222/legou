<template>
  <div class="contain-c">
    <Nav />
    <!-- 制造商图片加标题 -->
    <div class="brand_title_pic">

        <span class="name">
          {{ brandData.name }}
        </span>

      <img :src="brandData.new_pic_url" alt="" />
    </div>
    <span class="desc">
      {{ brandData.simple_desc }}
    </span>
    <div v-if='isGoodsList'>
      <TwoColumnsShow :goodListItem="brandGoodsList" />
    </div>
    <div class="none" v-else>
      <p>数据库当前无数据...</p>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/common/Nav.vue";
import TwoColumnsShow from "@/components/common/TwoColumnsShow.vue"

import { getBrandDetail } from "@/api/home";

export default {
  data() {
    return {
      brandDetail: {},
      brandData: {},
      brandGoodsList: []
    };
  },
  components: {
    Nav,
    TwoColumnsShow
  },
  created() {
    let params = {
      id: this.$route.query.id,
    };
    getBrandDetail(params).then((res) => {
      this.brandDetail = res;
      console.log(res);
    });
  },
  computed: {
    isGoodsList() {
      return !!this.brandGoodsList.length
    }
  },
  watch: {
    brandDetail() {
      this.brandData = this.brandDetail.data;
      this.brandGoodsList = this.brandDetail.goodsList;
    },
  },
};
</script>

<style lang="scss" scoped>
.brand_title_pic {
  position: relative;
  width: 100%;
  height: 145px;
  img {
    height: 100%;
    width: 100%;
  }
  .name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 19px;
    color: #fff;
    border-bottom: 3px solid #fff;
    padding-bottom: 3px;
  }
}
.desc {
  display: block;
  height: 100px;
  width: 100%;
  padding: 20px 16px;
  margin-bottom: 5px;
  box-sizing: border-box;
  font-size: 15px;
  color: #666;
  background-color: #fff;
  text-align: center;
  
}

.none {
  margin-top: 100px;
  color: #999;
  text-align: center;
  font-size: 16px;
}
</style>