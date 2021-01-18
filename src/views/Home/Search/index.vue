<template>
  <div class="contain-c">
    <Nav />
    <!-- 输入框 -->
    <div class="searchInputCon">
      <van-search
        v-model="inptVal"
        placeholder="请输入搜索关键词"
        @input="getSearchKeyList"
      />
      <p @click="cancelSearch">取消</p>
    </div>
    <!-- 搜索的提示词 -->
    <div v-if="isSearchPromptShow" class="search-prompt-con">
      <div
        class="search-promptList"
        v-for="(item, i) in searchPromptList"
        :key="i"
        @click="saveRecord(item)"
      >
        {{ item.name }}
      </div>
      <!-- 当数据库没有内容时显示 -->
      <div class="noneSearchPromptList" v-if="!searchPromptList.length">
        数据库暂时没有此类商品
      </div>
    </div>
    <!-- 历史记录 -->
    <div class="history" v-if="isHistoryShow">
      <div class="t">
        <p>历史记录</p>
        <van-icon name="delete-o" size="20" @click="clearHistorySearchBtn" />
      </div>
      <div class="b" v-if="isSuccessRequest">
        <div v-for="item in requestList.historyData" :key="item.id">
          {{ item.keyword }}
        </div>
      </div>
    </div>
    <!-- 热门搜索 -->

    <div class="hot-search" v-if="!isSearchPromptShow">
      <span class="title">热门搜索</span>
      <div class="hot-search-list" v-if="isSuccessRequest">
        <div
          v-for="item in requestList.hotKeywordList"
          :key="item.id"
          :class="isHot(item)"
          @click="hotSearchBtn(item)"
        >
          {{ item.keyword }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/common/Nav.vue";

import {
  getKeywordsHistorySearch,
  getSearchKeywordList,
  clearHistorySearch,
  saveHistorySearch,
} from "@/api/home";

export default {
  data() {
    return {
      requestList: {},
      isSuccessRequest: false,
      inptVal: "",
      searchPromptList: [],
      openIdParams: "",
    };
  },
  methods: {
    initRequest() {
      const openId = window.localStorage.getItem("openId");
      const params = {
        openId,
      };
      this.openIdParams = params;
      getKeywordsHistorySearch(params).then((res) => {
        this.isSuccessRequest = true;
        this.requestList = res;
      });
    },
    getSearchKeyList() {
      const params = {
        keyword: this.inptVal,
        order: "desc",
      };
      getSearchKeywordList(params).then((res) => {
        this.searchPromptList = res.keywords;
      });
    },
    // 清除历史记录
    clearHistorySearchBtn() {
      clearHistorySearch(this.openIdParams).then((res) => {
        if (res.data == "清除成功") {
          this.initRequest();
        }
      });
    },
    // 保存当前点击的记录
    saveRecord(item,attr='name') {
      const params = {
        ...this.openIdParams,
        keyword: item[attr],
      };
      saveHistorySearch(params).then((res) => {
        if (res.data == "success") {
          // 重新拉取数据
          this.initRequest();
        }
      });
    },
    // 取消按键
    cancelSearch() {
      this.inptVal = "";
      // this.$router.push('/home')
    },
    // 点击热门搜索按钮
    hotSearchBtn(item) {
        this.inptVal = item.keyword;
        this.saveRecord(item,'keyword')
    }
  },
  computed: {
    isHistoryShow() {
      // 当未请求成功，有请求到历史记录，并且input没有值时显示
      return (
        this.isSuccessRequest &&
        this.requestList.historyData.length &&
        !this.inptVal
      );
    },
    isHot() {
      return function (item) {
        return item.is_hot == 1 ? "is-hot" : "";
      };
    },
    isSearchPromptShow() {
      return !!this.inptVal;
    },
  },
  components: {
    Nav,
  },
  created() {
    // 接收数据
    this.initRequest();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/commonVariable.scss";
.searchInputCon {
  width: 100%;
  height: 54px;
  padding: 10px 0 10px 12px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  .van-search {
    width: 307px;
  }
  p {
    display: block;
    font-size: 14px;
    height: 100%;
    line-height: 34px;
  }
}

.history {
  box-sizing: border-box;
  padding: 16px;
  background-color: #fff;
  .t {
    display: flex;
    justify-content: space-between;
    height: 20px;
    width: 100%;
    line-height: 20px;
    margin-bottom: 12px;
  }

  .b {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    div {
      border: 1px solid #999;
      padding: 5px;
      width: fit-content;
      margin-right: 15px;
      margin-bottom: 10px;
    }
  }
}

.hot-search {
  padding: 16px;
  background-color: #fff;
  margin-top: 10px;
  .title {
    display: block;
    width: 100%;
    margin-bottom: 15px;
  }
  .hot-search-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    div {
      margin-right: 15px;
      margin-bottom: 10px;
      width: fit-content;
      padding: 5px;
      border: 1px solid #999;
    }
    div.is-hot {
      border: $theme_colors 1px solid;
      color: $theme_colors;
    }
  }
}

.search-prompt-con {
  box-sizing: border-box;
  height: 100%;
  background-color: #fff;
  .search-promptList {
    padding: 10px 25px;
    box-sizing: border-box;
  }
}

.noneSearchPromptList {
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  text-align: center;
}
</style>