<template>
  <div class="cartCon">
    <!-- 购物保障 -->
    <div class="shoppingGuaranteeCon">
      <ShoppingGuarantee />
    </div>
    <!-- 购物列表 -->
    <div v-if="cartInfoRequestSuccess" class="goodsList">
      <van-checkbox-group v-model="checked" ref="checkboxGroup">
        <van-swipe-cell v-for="item in cartGoodsList" :key="item.goods_id">
          <div class="card-c">
            <van-checkbox :name="item" > </van-checkbox>
            <van-card
              :num="item.number"
              :price="item.retail_price"
              :title="item.goods_name"
              class="goods-card"
              :thumb="item.list_pic_url"
            />
          </div>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="deleteCartGoodBtn(item)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <!-- 下单列表 -->
    <div class="order-fixed-con">
      <van-checkbox name="2" @click="toggleAll" v-model="isAllCheck"
        >全选</van-checkbox
      >
      <div class="order-btn-c">
        <div class="price">￥{{ totalPrice }}</div>
        <div class="order-btn">下单</div>
      </div>
    </div>
  </div>
</template>

<script>
import ShoppingGuarantee from "@/components/common/ShoppingGuarantee.vue";
import { getHadAddCartGoods, deleteCartGood } from "@/api/cart";
export default {
  data() {
    return {
      cartInfoRequestSuccess: false,
      // 购物车中的物品
      cartGoodsList: [],
      // 选中的数组
      checked: [],
      isAllCheck: false,
    };
  },
  components: {
    ShoppingGuarantee,
  },
  methods: {
    // 请求已经加入到购物车的商品
    requestCartGoods() {
      const openId = window.localStorage.getItem("openId");
      const params = {
        openId,
      };
      getHadAddCartGoods(params).then((res) => {
        this.cartGoodsList = res.data;
        this.cartInfoRequestSuccess = true;
      });
    },
    // 删除商品
    deleteCartGoodBtn(item) {
      const params = {
        id: item.id,
      };
      const deleteItemIsChecked = this.checked.findIndex(it => {
        return it === item
      })
      if(deleteItemIsChecked !== -1) {
        this.checked=[];
      }

      deleteCartGood(params).then((res) => {
        if (res.data) {
          this.$toast({ message: "删除成功!" });
          this.requestCartGoods();
        }
      });
    },
    //
    toggleAll() {
      if(this.checked.length == this.cartGoodsList.length) {
        this.$refs.checkboxGroup.toggleAll(false);
      } else {
        this.$refs.checkboxGroup.toggleAll(true);
      }
    },
  },
  watch: {
    checked() {
      this.isAllCheck =
        this.checked.length === this.cartGoodsList.length ? true : false;
    },
  },
  computed: {
    totalPrice() {
      if(this.checked.length) {
        const total = this.checked.reduce((p, n) => {
          return p + n.retail_price * n.number
        },0)
        return total
      }
      return 0
    },
  },
  created() {
    this.requestCartGoods();
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>