<template>
  <div class="special-c">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-if="requestSuccess"
    >
      <div v-for="(item, i) in list" :key="i" class="special-item">
        <img class="title-pic" :src="item.scene_pic_url" alt="" />
        <p class="title">
          {{ item.title }}
        </p>
        <p class="subtitle">
          {{ item.subtitle }}
        </p>
        <p class="price">{{ item.price_info }}元起</p>
      </div>
    </van-list>
  </div>
</template>

<script>
import { getSpecialList } from "@/api/special";

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      requestSuccess: false,
      total: 0,
      page: 1,
    };
  },
  methods: {
    requestList() {
      const params = {
        page: this.page,
      };
      getSpecialList(params).then((res) => {
        if (this.list.length) {
          this.list = [...this.list, ...res.data];
        } else {
          this.list = res.data;
        }
        this.loading = false
        this.total = res.total;
        this.requestSuccess = true;
      });
    },
    onLoad() {
      this.page = this.page + 1;
      if (this.page < this.total+1) {
        this.requestList();
      } else {
        this.finished = true;
      }
    },
  },
  created() {
    this.requestList();
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>