<template>
  <button class="btn">{{ title }} <span v-if="ques">?</span></button>
</template>

<script setup>
const props = defineProps({
  title: String,
  ques: Boolean,
});
</script>

<style scoped lang="scss">
.btn {
  position: relative;
  text-align: center;
  width: 232px;
  height: 60px;
  background: #bf3266;
  border-radius: 5px;
  color: white;
  font-family: "Futura PT Demi";
  font-weight: 500;
  font-size: 18px;
  border: none;
  @media screen and (max-width: 695px) {
    width: 168px;
    height: 50px;
    font-size: 12px;
  }
  &:hover {
    border: 1px #bf3266 solid;
    background-color: #fff;
    color: #bf3266;
    cursor: pointer;
    span {
      color: white;
    }
  }
  span {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 18px;
    display: inline-block;
    width: 25px;
    height: 25px;
    background-color: black;
    line-height: 135%;
    font-weight: 400;
    font-family: Arial;
    border-radius: 0 5px 0 0;
    text-align: center;
  }
}
</style>
