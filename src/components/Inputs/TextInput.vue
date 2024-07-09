<template>
  <div class="digital" v-click-outside="closeDropdown">
    <h3>{{ title }}</h3>

    <div class="wrapper__input" @click="handleIsDrop">
      <div class="input__field">
        {{ room.inputs[property] }}
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
              :class="item === room.inputs[property] && 'drop-down-item-active'"
              @click="updateValue(item)"
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
import { computed, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  title: String,
  arr: Array,
  property: String,
});

const store = useStore();

const selectedRoomId = computed(() => store.state.selectedRoomId);

const room = computed(() => store.state.rooms.find((room) => room.id === selectedRoomId.value));

const dropDawn = ref(false);

const handleIsDrop = (event) => {
  event.stopPropagation();
  dropDawn.value = !dropDawn.value;
};

const closeDropdown = () => {
  dropDawn.value = false;
};

const updateValue = (newValue) => {
  room.value.inputs[props.property] = newValue;
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
  font-family: "Futura PT Book";
  font-size: 18px;
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
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
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
