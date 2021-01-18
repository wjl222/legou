<template>
  <div class="contain-c">
    <Nav />
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      height="375"
    >
      <van-swipe-item v-for="item in request.gallery" :key="item.id">
        <img :src="item.img_url" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 购物保障 -->
    <ShoppingGuarantee />
    <!-- 商品详情 -->
    <div class="good_detail" v-if="requestSuccess">
      <p class="name">{{ request.info.name }}</p>
      <p class="goods_brief">{{ request.info.goods_brief }}</p>
      <p class="retail_price">￥{{ request.info.retail_price }}</p>
    </div>
    <!-- 选择规则数量 -->
    <div class="section-nav" @click="isPopupShow = !isPopupShow">
      <span> 请选择规则数量 </span>
      <van-icon name="arrow" />
    </div>
    <!-- 商品参数 -->
    <div class="goods-detail">
      <p class="goods-detail-title">商品参数</p>
      <div
        v-for="(item, i) in request.attribute"
        :key="i"
        class="goods-detail-item"
      >
        <span class="goods-detail-item-name">
          {{ item.name }}
        </span>
        <span class="goods-detail-item-detail">
          {{ item.value }}
        </span>
      </div>
    </div>
    <!-- 商品详情页 -->
    <div
      v-if="requestSuccess"
      v-html="request.info.goods_desc"
      class="goods-detail-img"
    ></div>
    <!-- 常见问题 -->
    <div class="issue">
      <div class="title">
        <span class="line"></span>
        <span class="txt">常见问题</span>
        <span class="line"></span>
      </div>
      <div v-if="requestSuccess" class="question-answer-c">
        <div v-for="item in request.issue" :key="item.id">
          <div class="question">
            {{ item.question }}
          </div>
          <div class="answer">
            {{ item.answer }}
          </div>
        </div>
      </div>
    </div>
    <!-- 大家都在看 -->
    <div class="everywatch">
      <div class="title">
        <span class="line"></span>
        <span class="txt">大家都在看</span>
        <span class="line"></span>
      </div>
      <!-- 商品列表 -->
      <TwoColumnsShow :goodListItem="request.productList" />
    </div>

    <!-- 底部收藏等按钮 -->
    <van-goods-action style="z-index: 10">
      <van-goods-action-icon
        icon="star-o"
        @click="collectGood"
        :class="isCollect"
      />
      <van-goods-action-icon
        :badge="hasSelectGoodsNum"
        icon="cart-o"
        @click="toCartPage"
      />
      <van-goods-action-button
        type="warning"
        @click="addShoppingCart"
        text="加入购物车"
      />
      <van-goods-action-button @click="buyItNow" type="danger" text="立即购买" />
    </van-goods-action>

    <!-- 下部弹出框 -->

    <div
      class="popup-top"
      @click="isPopupShow = !isPopupShow"
      v-if="isPopupShow"
      @touchmove.prevent
    ></div>
    <transition name="nameoftransition">
      <div class="popup" v-if="isPopupShow">
        <div class="popup-c">
          <div class="colse" @click="isPopupShow = !isPopupShow">
            <van-icon size="20" name="cross" />
          </div>
          <div class="popup-title">
            <img :src="request.info.primary_pic_url" alt="" />
            <div class="popup-txt">
              <span class="price"> 价格￥{{ request.info.retail_price }} </span>
              <span>请选择购买的数量</span>
            </div>
          </div>
          <div class="stepper">
            <span>数量</span>
            <van-stepper v-model="selectIndex" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Nav from "@/components/common/Nav";
import ShoppingGuarantee from "@/components/common/ShoppingGuarantee.vue";
import { getGoodForId, collectGoodRequest } from "@/api/goods";
import { getHadAddCartGoods, addShoppingCartRequest } from "@/api/cart";
import TwoColumnsShow from "@/components/common/TwoColumnsShow.vue";

export default {
  data() {
    return {
      request: {},
      requestSuccess: false,
      isPopupShow: false,
      selectIndex: 1,
      // 购物车上面的数字
      hasSelectGoodsNum: 1,
      openId: "",
    };
  },
  components: {
    Nav,
    TwoColumnsShow,
    ShoppingGuarantee,
  },
  methods: {
    requestGoodsInfo() {
      const params = {
        id: this.$route.query.id,
        openId: this.openId,
      };
      getGoodForId(params).then((res) => {
        this.request = res;
        this.requestSuccess = true;
        console.log(res);
      });
      this.requestCartInfo();
    },
    addShoppingCart() {
      if (!this.isPopupShow) {
        this.isPopupShow = true;
      } else {
        const data = {
          goodsId: this.$route.query.id,
          number: this.selectIndex,
          openId: this.openId,
        };
        addShoppingCartRequest(data).then((res) => {
          this.isPopupShow = false;
          console.log(res);
        });
      }
    },
    // 请求购物车的数据
    requestCartInfo() {
      const params = {
        openId: this.openId,
      };
      getHadAddCartGoods(params).then((res) => {
        this.hasSelectGoodsNum = res.data.reduce((p, n) => {
          return p + n.number;
        }, 0);
      });
    },
    // 跳转到购物车页面
    toCartPage() {
      this.$router.push("/cart");
    },
    collectGood() {
      const params = {
        openId: this.openId,
        goodsId: this.request.info.id + "",
      };

      collectGoodRequest(params).then((res) => {
        if (res.data == "success") {
          this.requestGoodsInfo();
        }
      });
    },
    buyItNow() {
      this.isPopupShow = !this.isPopupShow
    }
  },
  computed: {
    isCollect() {
      return this.request.collected ? "collect" : "";
    },
  },
  created() {
    this.openId = window.localStorage.getItem("openId");
    this.requestGoodsInfo();
  },

  watch: {},
};
</script>

<style lang="scss">
@import "./css";
</style>