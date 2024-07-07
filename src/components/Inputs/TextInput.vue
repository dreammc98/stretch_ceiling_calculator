<template>
  <div class="digital">
    <h3>{{ title }}</h3>

    <div class="wrapper__input" @click="handleIsDrop">
      <div class="input__field">
        <input type="text" :value="inputText" readonly />
        <button class="pointer">
          <Icon
            :class="dropDawn && 'pointer-svg'"
            width="13"
            height="9"
            viewBox="0 0 13 9"
            :name="'pointer'"
          />
        </button>
        <transition
          name="fade"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <ul class="drop-down" v-if="dropDawn">
            <li
              v-for="(item, index) in arr"
              :key="index"
              class="drop-down-item"
              :class="item === currentItem && 'drop-down-item-active'"
              @click="sendIdToParent(item)"
            >
              {{ item }}
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import "animate.css";
import Icon from "@/components/Icon.vue";
import { ref } from "vue";

const props = defineProps({
  title: String,
  arr: Object,
  handleUpdateText: Function,
  property: String,
  inputText: String,
});

const currentItem = ref(props.inputText);

const dropDawn = ref(false);
const handleIsDrop = () => {
  dropDawn.value = !dropDawn.value;
};

const sendIdToParent = (inputText) => {
  props.handleUpdateText(inputText, props.property);
  currentItem.value = inputText;
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
  background-color: var(--gray-bg-color);
  cursor: pointer;
  :hover {
    cursor: pointer;
  }
}

.input__field {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 4px;

  input {
    border: 0;
    background-color: transparent;
    font-family: "Futura PT Book";
    font-size: 18px;

    &:focus {
      outline: none;
    }
  }
}

.drop-down {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  left: -10px;
  z-index: 101;
}

.drop-down-item {
  display: flex;
  align-items: center;
  padding: 10px;
  z-index: 100;
  width: 295px;
  height: 40px;
  border: 1px solid var(--gray-bg-color);
  background-color: rgb(241 241 245);
  cursor: pointer;
  &:hover {
    background-color: white;
  }
  &:last-child {
    border-radius: 0 0 5px 5px;
  }
}

.drop-down-item-active {
  background-color: white;
  transform: scale(1.01);
}

.pointer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #bf3266;
  border: none;
  transition: all 2s linear;
}

.pointer-svg {
  transform: rotate(180deg);
  cursor: pointer;
}

.animate__animated {
  --animate-duration: 0.3s;
}
</style>
