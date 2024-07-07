<template>
  <div class="wrapper">
    <h2 class="title">Рассчитайте стоимость Вашего потолка онлайн!</h2>
    <div>
      <div>
        <Room :rooms="rooms" @send-id="setCurrentRoom" :currentRoom="currentRoom" />
      </div>

      <div class="wrapper-calc">
        <Calculation />
        <div><img src="../assets/img/main-img.png" alt="img" class="main__img" /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Room from "./CalculatorHeader/Room.vue";

import { v1 } from "uuid";
import { reactive, ref } from "vue";
import Calculation from "./CalculatorBody/Calculation.vue";

const id = ref(v1());

const rooms = reactive([
  { id: v1(), title: "Комната №1" },
  { id: v1(), title: "№2" },
  { id: v1(), title: "№3" },
  { id: v1(), title: "№4" },
]);
const currentRoom = ref(rooms[0].id);

const setCurrentRoom = (id) => {
  currentRoom.value = id;
};
</script>

<style scoped lang="scss">
.wrapper {
  overflow-x: hidden;
}

.title {
  font-family: "Futura PT Demi";
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 40px;
  @media screen and (max-width: 1075px) {
    font-size: 36px;
  }
  @media screen and (max-width: 695px) {
    font-size: 26px;
  }
}

.wrapper-calc {
  display: flex;
  box-shadow: 0px 4px 55px rgba(133, 133, 133, 0.25);
}

.main__img {
  @media screen and (max-width: 1150px) {
    transform: translateX(-250px);
  }
  @media screen and (max-width: 780px) {
    display: none;
  }
}
</style>
