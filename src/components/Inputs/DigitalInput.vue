<template>
  <div class="digital">
    <h3>{{ title }}:</h3>
    <div class="wrapper__input">
      <button class="btn" @click="decrease">
        <Icon name="minus" />
      </button>

      <div class="input__field">
        <input
          v-model.number="inputValue"
          @keypress="validateKeypress"
          @input="notifyParent"
          type="number"
        />
        <span>{{ sign }}</span>
      </div>

      <button class="btn" @click="increase">
        <Icon name="plus" />
      </button>
    </div>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import { computed, ref } from "vue";

const props = defineProps({
  title: String,
  startValue: Number,
  sign: String,
  inputName: String,
  onUpdate: Function,
  property: String,
});

const inputValue = ref(props.startValue);

const validateKeypress = (event) => {
  if (!/^\d*$/.test(event.key)) {
    event.preventDefault();
  }
};

const decrease = () => {
  if (inputValue.value > 1) {
    inputValue.value -= 1;
  }
  notifyParent();
};

const increase = () => {
  inputValue.value += 1;
  notifyParent();
};

const notifyParent = () => {
  props.onUpdate(inputValue.value, props.property);
};
</script>

<style lang="scss" scoped>
.digital {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 295px;
  @media screen and (max-width: 768px) {
    width: 345px;
  }
}

.wrapper__input {
  display: flex;
  padding: 10px;
  justify-content: space-between;
  background-color: var(--gray-bg-color);
}

.btn {
  display: inline-flex;
  flex-direction: column;
  padding: 12px;
  background-color: rgba(183, 186, 203, 0.4);
  border: 0;
  cursor: pointer;
  :active {
    transform: scale(0.9);
  }
}

.input__field {
  display: flex;
  align-items: center;
  gap: 4px;

  input {
    width: 70px;
    text-align: right;
    border: 0;
    background-color: transparent;
    font-family: "Futura PT Book";
    font-size: 18px;

    -moz-appearance: textfield; /* Firefox */
    appearance: none; /* Для других браузеров */
    &:focus {
      outline: none;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0; /* Safari и Chrome */
    }
  }

  span {
    width: 70px;
    font-size: 18px;
  }
}
</style>
