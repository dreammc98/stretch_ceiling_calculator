<template>
  <div class="modal-wrapper">
    <div class="modal-content">
      <div class="svg-wrapper" @click="modalClose">
        <svg
          class="close-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 10.586l4.95-4.95 1.414 1.414L13.414 12l4.95 4.95-1.414 1.414L12 13.414l-4.95 4.95-1.414-1.414L10.586 12 5.636 7.05l1.414-1.414L12 10.586z"
          />
        </svg>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

const modalClose = (event) => {
  event.stopPropagation();
  store.commit("toggleModal", false);
};
</script>

<style scoped lang="scss">
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  min-width: 350px;
}

.svg-wrapper {
  display: flex;
  justify-content: end;
}

.close-svg {
  &:active {
    transform: scale(0.9);
  }
}
</style>
