<template>
  <div>
    <!-- 新品首发标题 -->
    <slot></slot>
    <!-- 新品首发商品 -->
    <div class="newgoods_list_show_con">
      <div class="newgoods_list_long_con" :style="{ width: newGoodConWidth }">
        <div v-for="item in showGoodList" :key="item.id"  @click="toGoodDetail(item)">
          <img :src="item.list_pic_url" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="goods_brief">{{ item.goods_brief }}</p>
          <p class="retail_price">￥{{ item.retail_price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodList: [],
      newGoodConWidth: "",
    };
  },
  computed: {
    backgroundImgUrl() {
      return "url(" + require("@/assets/images/" + this.img + ".png") + ")";
    },
  },
  props: ["showGoodList", "img"],
  mounted() {
    this.initBackgroundImg();
  },
  methods: {
    initBackgroundImg() {
      document.querySelector(
        ".content_box"
      ).style.backgroundImage = this.backgroundImgUrl;
    },
    // 商品页面跳转
     toGoodDetail(item) {
      this.$router.push({
        path: '/gooddetail',
        query: {
          id: item.id
        }
      })
    }
  },
  watch: {
    showGoodList() {
      this.goodList = this.showGoodList;
      this.newGoodConWidth = this.showGoodList.length * 140 + "px";
    },
  },
};
</script>
<style scoped lang="scss">
// 好物推荐
@import "@/assets/commonVariable";
.content_box {
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 130px;
  background-repeat: no-repeat;
  div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    span {
      display: block;
      width: 100%;
      font-size: 15px;
      color: #8c9bae;
      text-align: center;
    }
    p {
      display: block;
      width: 90px;
      height: 25px;
      line-height: 25px;
      font-size: 12px;
      background-color: #d8e4f0;
      text-align: center;
      margin-top: 15px;
    }
  }
}
.newgoods_list_show_con {
  overflow: auto;
  background: #fff;
  .newgoods_list_long_con {
    display: flex;
    width: fit-content;

    div {
      background: #fff;
      width: 140px;
      margin-left: 14px;

      p {
        text-indent: 14px;
        @include overEllipsis;
      }
    }
  }

  img {
    width: 140px;
    height: 140px;
  }

  .name {
    font-size: 14px;
    text-indent: 14px;
    font-weight: 700;
    margin: 0px 4px 15px 0;
  }

  .goods_brief {
    margin: 4px 0 12px;
  }
}
</style>
