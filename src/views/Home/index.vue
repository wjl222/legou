<template>
  <div class="contain-c">
    <div class="home_nav">
      <span class="address" @click="toAddressPage">{{
        hasSelectAddress.title ? hasSelectAddress.title : "郑州"
      }}</span>
      <van-field left-icon="search" placeholder="搜索商品" @focus="toSearchPage" />
    </div>
    <!-- 轮播 -->
    <van-swipe class="my-swipe" :autoplay="2000" height="200px">
      <van-swipe-item v-for="img in dataList.banner" :key="img.id">
        <img :src="img.image_url" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 分类导航 -->
    <van-grid class="channel_con">
      <van-grid-item
        v-for="item in dataList.channel"
        :key="item.id"
        @click="toCategoryList(item)"
      >
        <van-image :src="item.icon_url" />
        <span class="channel_txt">{{ item.name }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 品牌供应商 -->
    <div class="brand_list_con">
      <div class="brand_list_title">
        <span>品牌制造商直供</span>
      </div>
      <div class="brand_list" :column-num="2">
        <div
          v-for="item in dataList.brandList"
          :key="item.id"
          @click="toBrandDetail(item)"
        >
          <van-image :src="item.new_pic_url" />
          <!-- <span class="channel_txt">{{ item.name }}</span> -->
          <div class="brand_good_detail_c">
            <span>{{ item.name }}</span>
            <span>{{ item.floor_price }}元起</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 新品首发标题 -->
    <GoodsShowList :showGoodList="dataList.newGoods" :img="'bgnew'">
      <div class="content_box" @click="toRecommendProductPage('isNew')">
        <div >
          <span>新品首发</span>
          <p>查看全部</p>
        </div>
      </div>
    </GoodsShowList>
    <GoodsShowList :showGoodList="dataList.hotGoods" :img="'bgtopic'">
      <div class="content_box" @click="toRecommendProductPage('isHot')">
        <div>
          <span>人气推荐 · 好物精选</span>
          <p>查看全部</p>
        </div>
      </div>
    </GoodsShowList>

    <!-- 专题精选 -->
    <div class="project_selection">
      <div class="title">
        专题精选
        <img src="@/assets/images/go.png" alt="" />
      </div>
      <div class="project_selection_c">
        <div class="project_selection_l" :style="{ width: project_selection }">
          <div v-for="(item, i) in dataList.topicList" :key="i">
            <img :src="item.scene_pic_url" alt="" />
            <span class="project_title">{{ item.title }}</span>
            <span class="desc">{{ item.subtitle }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品两栏展示 -->
    <div v-for="(item, i) in dataList.newCategoryList" :key="i">
      <TwoColumnsShow :goodListItem="item.goodsList">
        <template v-slot:home_title="twoColgoodItem">
          <span class="home_two_colus_title"
            >{{ twoColgoodItem.gold.name }}好物</span
          >
        </template>
        <template v-slot:li_list>
          <li class="lastBtn" @click='toCategoryListPage(item.id)'>
            <span>{{ item.name }}</span>
            <img src="@/assets/images/icon_go_more.png" alt="" />
          </li>
        </template>
      </TwoColumnsShow>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { index } from "@/api/home";
import GoodsShowList from "@/components/common/GoodsShowList";
import TwoColumnsShow from "@/components/common/TwoColumnsShow";

export default {
  data() {
    return {
      dataList: [],
      project_selection: "",
    };
  },
  components: {
    GoodsShowList,
    TwoColumnsShow,
  },
  computed: {
    project_selection() {
      return;
    },
  },
  computed: {
    ...mapState(["hasSelectAddress"]),
  },
  methods: {
    toAddressPage() {
      this.$router.push("/home/address");
    },
    // 跳转到搜索页面
    toSearchPage() {
      this.$router.push('/home/search')
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
    // 跳转至制造商详情页
    toBrandDetail(item) {
      this.$router.push({
        path: "/home/brandDetail",
        query: {
          id: item.id,
        },
      });
    },
    // 新品首发和人气推荐
    toRecommendProductPage(item) {
      const params = {
        isHot: item === 'isHot' ? 1 : '',
        isNew: item === 'isNew' ? 1 : '',
        order: ''
      }
      // console.log(params);
      this.$router.push({
        path: '/home/recommendProduct',
        query: {
          ...params
        }
      })
    },
    // 下面的列表最后跳转的箭头
    toCategoryListPage(id) {
      this.$router.push({
        path: '/categorylist',
        query: {
          id
        }
      })
    }
  },
  created() {
    index().then((res) => {
      console.log(res);
      this.dataList = res;
      console.log(res);
      this.project_selection = this.dataList.topicList.length * 287 + "px";
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/commonVariable";
@import "./css/index.scss";
</style>