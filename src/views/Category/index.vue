<template>
  <div class="category-c">
    <div class="top">
      <div class="top-c">
        <van-icon name="search" size="14" />
        商品搜索，共款好物
      </div>
    </div>
    <div class="con-c">
      <!-- tab列表 -->
      <div class="sidebar-c">
        <van-sidebar v-model="nowShowListIndex" @change="toOtherCategory">
          <van-sidebar-item
            :title="item.name"
            v-for="(item, i) in categoryList"
            :key="i"
          >
          </van-sidebar-item>
        </van-sidebar>
      </div>
      <!-- 内容 -->
      <div class="content-c" v-if="requestSuccess">
        <!-- 标题图片 -->
        <div class="content-t-img">
          <img :src="categoryList[nowShowListIndex].banner_url" alt="" />
        </div>
        <!-- 标题文字 -->
        <div class="content-title-txt">
          <div class="text">
            <span class="line left"></span>
            {{ categoryList[nowShowListIndex].name }}分类
            <span class="line right"></span>
          </div>
        </div>
        <!-- 分类列表 -->
        <div class="goods-show" v-if="isCategoryGoodListSuccess">
          <van-grid :column-num="3">
            <div
              v-for="item in categoryGoodList"
              :key="item.id"
              class="good-item"
              @click="toCategoryList(item)"
            >
              <img :src="item.wap_banner_url" alt="" />
              <span class="good-item-name">
                {{ item.name }}
              </span>
            </div>
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { categoryIndexaction } from "@/api/home";
import { getCategoryList } from "@/api/category";
export default {
  data() {
    return {
      active: "",
      categoryList: [],
      nowShowListIndex: 0,
      requestSuccess: false,
      nowCategoryId: 0,
      categoryGoodList: [],
      isCategoryGoodListSuccess: false,
    };
  },
  created() {
    categoryIndexaction().then((res) => {
      this.categoryList = res.categoryList;
      this.requestSuccess = true;
      this.nowCategoryId = this.categoryList[this.nowShowListIndex].id;
      this.requestGoodsList();
    });
  },
  methods: {
    requestGoodsList() {
      const params = {
        id: this.nowCategoryId,
      };
      getCategoryList(params).then((res) => {
        console.log(res);
        this.categoryGoodList = res.data.currentOne.subList;
        this.isCategoryGoodListSuccess = true;
      });
    },
    toOtherCategory(i) {
      this.nowCategoryId = this.categoryList[i].id;
      this.requestGoodsList();
    },
    toCategoryList(item) {
      let url = "categorylist";
      this.$router.push({
        path: url,
        query: {
          id: item.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>