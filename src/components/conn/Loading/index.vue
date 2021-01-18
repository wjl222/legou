
<template>
  <div class="loading">
    <div class="loading_c"></div>
  </div>
</template>
 
<script>
export default {
  name: "LOADING",
  data() {
    return {};
  },
  mounted() {
    let loadingC = document.querySelector(".loading_c");
    for (let i = 0; i < 12; i++) {
      let newDiv = document.createElement("div");
      newDiv.style.cssText = `
            transform: translate(-50%, -50%) rotate(${i * 30}deg);
            animation-delay: ${0.1*i}s;
            opacity: 0;
            `;
      loadingC.append(newDiv);
    }
  },
};
</script>
<style lang='scss' scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 121;
  width: 100%;
  height: 100%;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.loading_c {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: rgba(0, 0, 0, 0.4);
  background-color: #fff;
}
.loading_c ::v-deep div {
  width: 2px;
  height: 10px;
  background: #000;
  position: absolute;
  top: 5px;
  left: 50%;
  border-radius: 5px;
  transform-origin: 0 25px;
  animation: opacityto0 1.2s infinite;
}
@keyframes opacityto0 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>