<template>
  <div>
    <slot name="home_title" :gold="goodListItem"></slot>
    <ul>
      <li
        class="good_item"
        v-for="(item, i) in goodListItem"
        :key="i"
        @click="toGoodDetail(item)"
      >
        <img :src="item.list_pic_url" alt="" />
        <span>{{ item.name }}</span>
        <span class="price">￥{{ item.retail_price }}</span>
      </li>
      <slot name="li_list" ></slot>
      <li class="blank"></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toGoodDetail(item) {
      this.$router.push({
        path: '/gooddetail',
        query: {
          id: item.id
        }
      })
    }
  },
  props: ["goodListItem"],
};
</script>

<style lang="scss" scoped>
// 主页头部的title设置
.home_two_colus_title {
  display: block;
  width: 100%;
  text-align: center;
  padding: 12.5px 0;
}

.home_title {
  font-size: 12px;
  padding: 13px 0;
}
ul {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  li {
    background-color: #fff;
    width: 46%;
    box-sizing: border-box;
    margin: 4px 4px;
    text-align: center;
    img {
      height: 151px;
      width: 151px;
    }
    span {
      display: block;
      text-align: left;
      padding: 0 5px;
      margin-bottom: 15px;
      margin-top: 10px;
      box-sizing: border-box;
    }
    span.price {
      color: #9c3232;
    }
  }
  li.blank {
    width: 46%;
    height: 0;
    border: none;
  }
}
// 按钮
.lastBtn {
  font-size: 16px;
  text-align: center;
  span {
    text-align: center;
    display: block;
    margin: 0;
    margin-top: 50px ;
  }
  img {
    margin-top: 30px;
    width: 35px;
    height: 35px;
  }
}
</style>