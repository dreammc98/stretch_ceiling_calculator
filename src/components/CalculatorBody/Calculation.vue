<template>
  <div class="calculation">
    <div class="input">
      <DigitalInput
        :onUpdate="handleUpdateNumber"
        :title="'Площадь помещения'"
        :startValue="10"
        :sign="'м&#178;'"
        :property="'area'"
      />
      <DigitalInput
        :onUpdate="handleUpdateNumber"
        :title="'Количество углов'"
        :startValue="4"
        :sign="'шт.'"
        :property="'corners'"
      />
    </div>
    <div class="input">
      <TextInput
        :handleUpdateText="handleUpdateText"
        :title="'Фактура потолка'"
        :arr="textureArr"
        :property="'texture'"
        :inputText="texture"
      />
      <TextInput
        :handleUpdateText="handleUpdateText"
        :title="'Цвет потолка:'"
        :arr="colorArr"
        :property="'color'"
        :inputText="color"
      />
    </div>

    <div class="wrapper__result">
      <div v-if="OK" class="result__amount">
        Итого: <span>{{ totalCost }}</span> {{ getCurrencyDeclension(sum) }}
      </div>
      <div v-else class="result__amount" style="color: red; font-size: 30px">{{ totalCost }}</div>
      <span>(Ориентировочная стоимость)</span>
    </div>

    <div class="wrapper__btn">
      <Button class="btn" title="ОФОРМИТЬ ЗАКАЗ" :ques="true" />
      <Button title="СКАЧАТЬ СМЕТУ" />
    </div>
  </div>
</template>

<script setup>
import DigitalInput from "@/components/Inputs/DigitalInput.vue";
import TextInput from "@/components/Inputs/TextInput.vue";
import Button from "@/components/Button/Button.vue";
import { computed, ref } from "vue";

const textureArr = ["ПВХ", "Тканевый"];
const colorArr = ["Белый", "Цветной"];

const area = ref(10);
const corners = ref(4);
const texture = ref(textureArr[0]);
const color = ref(colorArr[0]);

const handleUpdateNumber = (number, property) => {
  if (property === "area") {
    area.value = number;
  }
  if (property === "corners") {
    corners.value = number;
  }
};
const handleUpdateText = (text, property) => {
  if (property === "texture") {
    texture.value = text;
  }
  if (property === "color") {
    color.value = text;
  }
};

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

let OK = ref(true);
const totalCost = computed(() => {
  const pricePerSquareMeter = priceTable[texture.value][color.value];
  const cornerPrice = 100;

  if (pricePerSquareMeter === null) {
    OK.value = false;
    return "Цена для выбранной комбинации не указана";
  } else {
    OK.value = true;
    return pricePerSquareMeter * area.value + cornerPrice * corners.value;
  }
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
</script>

<style scoped lang="scss">
.calculation {
  padding: 40px 50px;
  background-color: white;
  z-index: 90;

  @media screen and (max-width: 450px) {
    padding: 10px 0 0 0;
  }
}

.input {
  display: flex;
  margin-bottom: 35px;
  max-width: 620px;
  gap: 30px;
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    margin-bottom: 10px;
    gap: 10px;
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
