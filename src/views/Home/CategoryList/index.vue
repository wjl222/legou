<template>
  <div class="contain-c">
    <Nav />
    <van-tabs @change="toGetCategoryGoods" v-model="tabVal">
      <van-tab
        v-for="(item, i) in categoryIndexactionList"
        :title="item.name"
        :key="i"
      >
        <div class="category_c">
          <p class="category_title">
            {{ category_title }}
          </p>
          <p class="category_desc">
            {{ category_desc }}
          </p>
        </div>
          <TwoColumnsShow :goodListItem="requestGoodsList.data" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getGoodList } from "@/api/home";
import { getCategoryNav } from "@/api/category";
import Nav from "@/components/common/Nav.vue";
import TwoColumnsShow from "@/components/common/TwoColumnsShow.vue";
export default {
  data() {
    return {
      requestGoodsList: {},
      categoryIndexactionList: [],
      nowCategoryId: "",
      toCategoryId: "",
      tabVal: 0,
      category_desc: '',
      category_title: ''
    };
  },
  components: {
    Nav,
    TwoColumnsShow,
  },
  methods: {

    toGetCategoryGoods() {
      const params = {
        categoryId: this.categoryIndexactionList[this.tabVal].id
      }
      getGoodList(params).then(res => {
         this.requestGoodsList=res
        })
    },
    
  },
  created() {
    const params={
      id: this.$route.query.id
    }
    // 接收分类数据
    getCategoryNav(params).then((res) => {
      this.categoryIndexactionList = res.navData;
      let nowSelectIndex = this.categoryIndexactionList.findIndex((item, i) => {
        return item.id == this.$route.query.id;
      });
      // 跳转到当前
      this.tabVal = nowSelectIndex;
      this.toGetCategoryGoods();
    });
  },
  mounted() {},
  watch: {
    requestGoodsList() {
      this.category_desc = this.requestGoodsList.currentNav.name;
      this.category_title = this.requestGoodsList.currentNav.front_desc;
    }
  },
};
</script>

<style lang="scss" scoped>
.category_c {
  height: 101px;
  box-sizing: border-box;
  padding: 15px;
  text-align: center;
  background-color: #fff;
  p {
    display: block;
    margin: 12px 0;
  }
  p.category_title {
    font-size: 15px;
  }
  p.category_desc {
    color: #999;
  }
}
</style>