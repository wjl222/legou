<template>
  <div class="collect_con">
    <Nav />
    <div class="collect_content">
      <h2>我的收藏</h2>
      <TwoColumnsShow :goodListItem="collectList"/>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/common/Nav.vue";
import TwoColumnsShow from "@/components/common/TwoColumnsShow.vue";
import { addCollectGood, requestCollecList } from "@/api/mine";

export default {
  data() {
    return {
      openId: "",
      collectList: []
    };
  },
  methods: {
    requestMyCollectList() {},
  },
  created() {
    this.openId = window.localStorage.getItem("openId");
    const params = {
      openId: this.openId,
    };

    requestCollecList(params).then((res) => {
      this.collectList = res.collectGoodsList;
    });
  },
  components: {
    Nav,
    TwoColumnsShow,
  },
};
</script>

<style lang="scss">
.collect_content {
  padding-top: 45px;
  box-sizing: border-box;
  h2 {
    height: 24px;
    text-align: center;
    line-height: 24px;
    padding: 10px 0;
    background-color: #fff;
    margin-bottom: 1px;
  }
}
</style>