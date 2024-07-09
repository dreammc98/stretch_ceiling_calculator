<template>
  <div class="digital">
    <h3>{{ title }}:</h3>

    <div class="wrapper__input">
      <button class="btn" @click="decrement">
        <Icon name="minus" />
      </button>

      <div class="input__field">
        <input
          @keypress="validateKeypress"
          v-model="room.inputs[property]"
          type="number"
          @input="validateInput"
        />

        <span>{{ sign }}</span>
      </div>
      <button class="btn" @click="increase">
        <Icon name="plus" />
      </button>
    </div>
    <span v-if="warning" style="font-size: 10px">{{ warning }}</span>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  title: String,
  sign: String,
  property: String,
});

const store = useStore();
const selectedRoomId = computed(() => store.state.selectedRoomId);
const room = computed(() => store.state.rooms.find((room) => room.id === selectedRoomId.value));

const decrement = () => store.commit("decrementInput", props.property);
const increase = () => store.commit("increaseInput", props.property);

const validateInput = (event) => {
  if (room.value.inputs[props.property] < 10 && props.property === "area") {
    room.value.inputs[props.property] = 10;
  }
  if (room.value.inputs[props.property] < 1 && props.property === "corners") {
    room.value.inputs[props.property] = 1;
  }
};
const validateKeypress = (event) => {
  if (!/^\d*$/.test(event.key)) {
    event.preventDefault();
  }

  const warning = store.state.warning;
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
