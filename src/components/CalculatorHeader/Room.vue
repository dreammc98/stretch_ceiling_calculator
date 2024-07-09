<template>
  <ul class="list">
    <li
      @click="selectRoom(tab.id)"
      v-for="tab in tabs"
      :key="tab.id"
      class="list__item"
      :class="classActiveRoom(tab.id)"
    >
      <span :class="tab.id === selectedRoomId && selectedRoomId !== 1 && 'title'">{{
        tab.title
      }}</span>
      <Icon
        v-if="tab.id === selectedRoomId && selectedRoomId !== 1"
        name="close"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        :class="tab.id === selectedRoomId && 'icon-close'"
      />
    </li>
    <li class="list__item" @click="addNewRoom">
      <Icon :name="'plus-add-room'" class="icon" />
      Добавить комнату
    </li>
  </ul>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const tabs = computed(() => store.state.rooms);

const selectRoom = (roomId) => {
  store.dispatch("selectRoom", roomId);
};

const addNewRoom = () => {
  store.dispatch("addRoomAndSelect");
};

const selectedRoomId = computed(() => store.state.selectedRoomId);

const classActiveRoom = (id) => {
  return selectedRoomId.value === id ? "list__item-active" : "";
};
</script>

<style scoped lang="scss">
.list {
  display: inline-flex;
  list-style: none;
  flex-wrap: wrap;
  gap: 1px;
}

.list__item {
  display: flex;
  align-items: center;
  padding: 18px;
  background-color: var(--gray-bg-color);

  font-family: "Futura PT Book";
  font-size: 18px;
  color: #333333;
  z-index: 100;
  position: relative;

  &:hover {
    cursor: pointer;
  }
  transition: all 0.3s linear;

  .icon-close {
    display: none;
  }
  &:hover .title {
    visibility: hidden;
  }

  &:hover .icon-close {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.list__item-active {
  box-shadow: -1px 6px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  transform: scale(1.04);
}

.icon {
  margin-right: 10px;
}
</style>
