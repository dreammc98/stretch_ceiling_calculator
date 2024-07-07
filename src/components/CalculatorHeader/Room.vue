<template>
  <ul class="list">
    <li
      @click="handleClick(room.id)"
      v-for="room in rooms"
      :key="room.id"
      class="list__item"
      :class="classActiveRoom(room.id)"
    >
      {{ room.title }}
    </li>
    <li class="list__item">
      <Icon :name="'plus-add-room'" class="icon" />
      Добавить комнату
    </li>
  </ul>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import { computed, ref } from "vue";

const props = defineProps({
  rooms: Object,
  currentRoom: String,
});

const emit = defineEmits(["send-id"]);

const handleClick = (id) => {
  emit("send-id", id);
};

const classActiveRoom = (id) => {
  return props.currentRoom === id ? "list__item-active" : "";
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

  &:hover {
    cursor: pointer;
  }
  transition: all 0.3s linear;
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
