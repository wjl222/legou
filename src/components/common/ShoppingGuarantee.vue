<template>
   <div class="shopping_guarantee_c">
      <div>
        <span> 30天无忧退货 </span>
      </div>
      <div>
        <span> 48小时快速退款 </span>
      </div>
      <div>
        <span> 满88元免运费 </span>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.shopping_guarantee_c {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: 36px;
  line-height: 36px;
  div {
    width: 33.3%;
    text-align: center;
    span {
      position: relative;
      &::after {
        position: absolute;
        top: 50%;
        left: -10px;
        transform: translateY(-50%);
        content: "";
        display: block;
        height: 4px;
        width: 4px;
        border: 1px solid chocolate;
        border-radius: 50%;
      }
    }
  }
}
</style>