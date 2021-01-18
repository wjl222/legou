<template>
  <div class="contain-c">
    <Nav />
    <div class="title_img">
      <img src="@/assets/images/goods.png" alt="" />
    </div>
    <div class="top_tab_btn">
      <div
        v-for="(item, i) in btnContent"
        :key="i"
        @click="changeSelect(i)"
        :class="selectAction(i)"
      >
        {{ item }}
        <!-- 箭头只有当其在第二个才会显示 -->
        <div class="arrowCon" v-show=" i == 1">
            <van-icon name="arrow-up" size="10" />
            <van-icon name="arrow-down" size="10" />
        </div>
      </div>
    </div>
    <TwoColumnsShow :goodListItem="goodsList" />
  </div>
</template>

<script>
import Nav from "@/components/common/Nav";
import TwoColumnsShow from "@/components/common/TwoColumnsShow.vue";

import { getNewAndRecommendProduct } from "@/api/home/index.js";
export default {
  data() {
    return {
      request: [],
      goodsList: [],
      btnContent: ["综合", "价格", "分类"],
      nowSelectIndex: 0,
      params: {},
      sortIndex: 0,
    };
  },
  methods: {
    initInfo(params) {
      getNewAndRecommendProduct(params).then((res) => {
        this.request = res;
      });
    },

    // tab点击的事件
    changeSelect(i) {
      // 改变class
      this.nowSelectIndex = i;

      // 当第一个和第三个个被点击
      // 变更class，将排序值归零
      if (i == 0 || i == 2) {
        this.initInfo(this.params);
        this.sortIndex = 0;
      } else {
          // 初始化不会变化的传递的params
        const params = {
          isHot: this.params.isHot,
          isNew: this.params.isNew,
        };
        // 初次点击
        this.sortIndex++;
        // 通过点击的次数判断箭头，即请求数据的参数
        switch (this.sortIndex) {
          case 1:
            params.order = "desc";
            break;
          case 2:
            params.order = "asc";
            break;
          case 3:
              params.order = "desc";
            this.sortIndex = 1;
            break;
          default:
            break;
        }
        console.log(params);
        this.initInfo(params);
      }
    },
  },
  computed: {
    // 通过闭包属性向computed传递参数
    selectAction() {
      return function (i) {
        if (i == 1) {
          if (this.sortIndex == 1) {
            return "active top";
          } else if (this.sortIndex == 2) {
            return "active buttom";
          }
        } else {
          return i === this.nowSelectIndex ? "active" : "";
        }
      };
    },
  },
  components: {
    Nav,
    TwoColumnsShow,
  },
  created() {
    this.params = this.$route.query;
    this.initInfo(this.params);
    console.log(this.params);
  },
  watch: {
    request() {
      this.goodsList = this.request.data;
    },
  },
};
</script>

<style lang="scss">
.title_img {
  height: 140px;
  width: 100%;
  img {
    height: 140px;
  }
}

.top_tab_btn {
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  line-height: 40px;
  background-color: #fff;
  div {
      position: relative;
    width: 100%;
    text-align: center;
    &.active {
      color: #b4282d;
    }
    &.top {
      i {
          &:nth-child(1) {
              color: #b4282d;
          }
          &:nth-child(2) {
              color:#f4f4f4
          }
      }
    }
    &.buttom {
      i {
          &:nth-child(1) {
              color: #f4f4f4;
          }
          &:nth-child(2) {
              color: #b4282d;
          }
      }
    }
    .arrowCon {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        width: 12px;
        height: 16px;
        position: absolute;
        top: 50%;
        right: 35px;
        transform: translateY(-50%);
        i {
            height: 10px;
        }
    }
  }
}
</style>