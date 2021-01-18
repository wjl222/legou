<template>
  <div class="address_contain contain-c">
    <Nav />
    <van-field v-model.lazy="searchAdrressVal" placeholder="搜索" />
    <div class="addcont">
      <div
        v-for="item in searchList"
        :key="item.uid"
        @touchstart="toHome(item)"
      >
        {{ item.title }} 地址： {{ item.address }}
      </div>
    </div>
    <div class="map_contain">
      <h3>显示当前位置</h3>
      <div id="container"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Nav from '@/components/common/Nav.vue'
export default {
  data() {
    return {
      searchAdrressVal: "",
      searchList: [],
      map: "",
    };
  },
  computed: {
    ...mapState(["hasSelectAddress"]),
  },
  mounted() {
    const _this = this;
    // 当引入了百度地图文件之后 在window对象上面就有了BMap属性
    var map = new BMap.Map("container");
    // 这里的map得放在上面
    this.map = map;
    // 使用百度地图初始化的时候需要传递坐标/城市及设置地图展示级别 否则地图不会展示
    if (this.hasSelectAddress.title) {
      var point = new BMap.Point(
        this.hasSelectAddress.point.lng,
        this.hasSelectAddress.point.lat
      );
      map.centerAndZoom(point, 16);
      var mk = new BMap.Marker(this.hasSelectAddress.point);
      map.addOverlay(mk);
      map.panTo(this.hasSelectAddress.point);
      return;
    } else {
      var point = new BMap.Point(116.331398, 39.897445);
    }

    this.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(
      function (r) {
        // getStatus 定位完成后的状态码。分为BMAP_STATUS_SUCCESS，BMAP_STATUS_UNKNOWN_LOCATION，BMAP_STATUS_PERMISSION_DENIED，BMAP_STATUS_TIMEOUT
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          // Marker此类表示地图上的一个图像标注。point参数指定了图像标注所在的地理位置
          var mk = new BMap.Marker(r.point);
          // addOverlay 将覆盖物添加到地图中，一个覆盖物实例只能向地图中添加一次
          map.addOverlay(mk);
          map.centerAndZoom(point, 12);
          // panTo将地图的中心点更改为给定的点，跳转到指定中心点进行渲染。如果该点在当前的地图视图中已经可见，则会以平滑动画的方式移动到中心点位置。
          map.panTo(r.point);
        } else {
          alert("failed" + this.getStatus());
        }
      },
      { enableHighAccuracy: true }
    );

    // Geolocation() 返回用户当前的位置
  },
  methods: {
    ...mapMutations(["reselectAddress"]),
    seachInfo() {
      console.log(this.map);
      const _this = this;
      var options = {
        onSearchComplete: function (results) {
          // 判断状态是否正确
          if (local.getStatus() == BMAP_STATUS_SUCCESS) {
            _this.searchList = results.Hr;
          }
        },
      };
      var local = new BMap.LocalSearch(this.map, options);
      local.search(this.searchAdrressVal);
    },
    toHome(item) {
      // console.log(this.reselectAddress);
      this.reselectAddress(item);
      this.$router.push("/home");
    },
    // 返回首页
    returnHome() {
      if (event.toElement.innerText === "返回") {
        this.$router.push("/home");
        console.log(event.toElement.innerText === "返回");
      }
    },
  },
  watch: {
    searchAdrressVal() {
      console.log("object");
      this.seachInfo();
    },
  },
  components: {
    Nav
  }
};
</script>

<style lang="scss" scoped >
.address_contain {
  padding-top: 55px;
  position: relative;
  height: 100%;
  box-sizing: border-box;
}

.van-field {
  width: 95%;
  padding: 10px 16px;
  margin: auto;
  margin-bottom: 10px;
  border: 1px solid #c3c3c3;
  color: #323233;
  border-radius: 6px;
}

.map_contain {
  width: 100%;
  bottom: 0;
  position: absolute;
  height: 200px;
  overflow: hidden;
  padding-top: 5px;
  background-color: #fff;
  #container {
    height: 100%;
  }
}

// 地址列表
.addcont {
  padding: 20px 0;
  box-sizing: border-box;
  height: 315px;
  overflow: auto;
  div {
    width: 95%;
    margin: auto;
    padding: 15px 0;
  }
}
</style>