<template>
<div class="mineCon">
  <div class="user_info_c">
    <div class="user_info_img">
      <img src="@/assets/images/user.png" alt="">
    </div>
    <span class="user_name">
      用户
    </span>
  </div>
  <div class="iconlist">
    <div>我的订单</div>
    <div>优惠卷</div>
    <div>我的足迹</div>
    <div @click="toCollectPage">我的收藏</div>
    <div @click="toAddressPage">地址收藏</div>
    <div>联系客服</div>
    <div>帮助中心</div>
    <div>意见反馈</div>
  </div>
</div>
</template>

<script>
export default {
  methods: {
    toCollectPage() {
      this.$router.push('/collect')
    },
    toAddressPage() {
      this.$router.push('/addressCollect')
    }
  }
  
}
</script>

<style lang="scss" scoped>
@import './css/index.scss';
</style>