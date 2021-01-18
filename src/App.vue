<template>
  <div id="app">
    <router-view :key="$route.fullPath"/>
    <van-tabbar active-color="#ab2b2b" v-model="active" v-if="this.$route.meta.isShowBottomTab">
      <van-tabbar-item name="home" icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item name="special" icon="description" to="/special">专题</van-tabbar-item>
      <van-tabbar-item name="category" icon="apps-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item name="cart" icon="shopping-cart-o" to="/cart"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item name='mine' icon="friends-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
    <Loading v-if="loading"/>
  </div>
</template>

<script>
import vant from "./plugin/vant";
import Loading from "@/components/conn/Loading"
import {mapState} from 'vuex'
export default {
  data() {
    return {
      active: "home",
    };
  },
  components: {
    Loading
  },
  created() {
    var userInfo = {
      openId: "1863827",
      nickName: "赵六",
      avatarUrl:
        "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIbWFEIJj8IpGeHM7dGic1aTFZALjWcMm9ltWfFiaQfVRYticWBfgGfzXWMt2EkJWiaicPtftHAlWxUibxQ/132",
    };
    var openId = userInfo.openId;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("openId", openId);
  },
  watch: {
    $route(to, from) {
      this.active = to.path.slice(1);
    }
  },
  computed: {
    ...mapState(['loading'])
  }
};
</script>

<style lang="scss">
@import "@/assets/commonVariable.scss";
* {
  margin: 0;
  padding: 0;
}

html,
body, 
#app {
  height: 100%;
  background-color: #f4f4f4;
}

.contain-c {
  box-sizing: border-box;
  padding-top: 45px;
  padding-bottom: 50px;
}
</style>
