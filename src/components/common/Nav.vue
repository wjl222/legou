<template>
  <div id="mine">
    <van-nav-bar
      :title="navTitle"
      left-text="返回"
      left-arrow
      black
      @click-left="returnPage"
    />
  </div>
</template>

<script>
export default {
  methods: {
    returnPage() {
      this.$router.back(-1);
    },
  },
  props: {
    navTitle: {
      type: String,
      default: "不凡",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/commonVariable.scss";
.van-nav-bar {
  position: fixed;
  top: 0;
  z-index: 10;
  height: 46px;
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 1px solid #ebedf0;
  color: $theme_colors;
}
::v-deep .van-nav-bar__title,
::v-deep .van-nav-bar__text,
::v-deep .van-nav-bar .van-icon {
  color: $theme_colors;
}

</style>