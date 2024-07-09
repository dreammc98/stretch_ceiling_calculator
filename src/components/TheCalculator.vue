<template>
  <div class="wrapper">
    <h2 class="title">Рассчитайте стоимость Вашего потолка онлайн!</h2>
    <div>
      <div>
        <Room />
      </div>

      <div class="wrapper-calc">
        <div class="calculation">
          <div>
            <Calculation />
          </div>
          <div class="wrapper__result">
            <div v-if="OK" class="result__amount">
              Итого: <span>{{ totalCost }}</span> {{ getCurrencyDeclension(totalCost) }}
            </div>
            <div v-else class="result__amount">
              <span style="color: red">{{ totalCost }}</span>
            </div>

            <span v-if="OK">(Ориентировочная стоимость)</span>
          </div>

          <div class="wrapper__btn">
            <Button class="btn" title="ОФОРМИТЬ ЗАКАЗ" :ques="true" @click="openModal" />
            <Button title="СКАЧАТЬ СМЕТУ" />
          </div>
        </div>

        <div><img src="../assets/img/main-img.png" alt="img" class="main__img" /></div>
      </div>
    </div>
  </div>
  <OrderForm v-if="isModal" />
</template>

<script setup>
import Room from "./CalculatorHeader/Room.vue";
import Calculation from "./CalculatorBody/Calculation.vue";
import Button from "./Button/Button.vue";

import { useStore } from "vuex";
import { computed, ref } from "vue";
import OrderForm from "./OrderForm.vue";

const priceTable = {
  ПВХ: {
    Белый: 1390,
    Цветной: 1600,
  },
  Тканевый: {
    Белый: 2250,
    Цветной: null,
  },
};

const store = useStore();

const rooms = computed(() => store.state.rooms);

let OK = ref(true);

const totalCost = computed(() => {
  console.log(rooms.value);
  let result = 0;
  OK.value = true;
  rooms.value.forEach((room) => {
    const pricePerSquareMeter = priceTable[room.inputs.texture][room.inputs.color];
    const cornerPrice = 100;

    if (pricePerSquareMeter) {
      result += pricePerSquareMeter * room.inputs.area + cornerPrice * room.inputs.corners;
    } else {
      OK.value = false;
      result = "Отсутствует в наличии";
    }
  });

  return result;
});

function getCurrencyDeclension(amount) {
  const lastDigit = amount % 10;
  const lastTwoDigits = amount % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return "рубль";
  } else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
    return "рубля";
  } else {
    return "рублей";
  }
}

const isModal = computed(() => store.state.isModal);

const openModal = () => {
  event.stopPropagation();
  store.commit("toggleModal", true);
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
    margin-bottom: 10px;
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

.calculation {
  padding: 40px 50px;
  background-color: white;
  z-index: 90;

  @media screen and (max-width: 450px) {
    padding: 10px 0 0 0;
  }
}

.wrapper__result {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 35px;
  @media screen and (max-width: 695px) {
    margin-bottom: 10px;
  }
}

.result__amount {
  color: #333333;
  font-size: 36px;
  font-family: "Futura PT Demi";
  font-weight: 500;
  @media screen and (max-width: 695px) {
    font-size: 26px;
  }

  span {
    color: #bf3266;
  }
}

.wrapper__btn {
  display: flex;
  gap: 35px;
  @media screen and (max-width: 695px) {
    gap: 16px;
  }
}
</style>
