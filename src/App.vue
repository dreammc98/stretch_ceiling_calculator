<template>
  <div class="main"><TheCalculatorVue /></div>
</template>

<script setup>
import TheCalculatorVue from "./components/TheCalculator.vue";
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
}

.main {
  width: 100vw;
  min-width: 414px;
  height: 100vh;
  background-image: url("assets/img/main-background.png");
  background-size: cover;
  padding: 0 105px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Futura PT Book";
  @media screen and (max-width: 1300px) {
    padding: 0 30px;
  }
  @media screen and (max-width: 450px) {
    padding: 0 20px;
    background-image: none;
  }
}
</style>
