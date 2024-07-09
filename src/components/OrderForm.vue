<template>
  <Modal @close="isModalVisible = false" v-click-outside="modalClose">
    <h2 class="title">Оформить заказ</h2>
    <form @submit.prevent="submitOrder">
      <div class="inputs">
        <input v-model="name" id="name" required placeholder="Ваше имя" />

        <input v-model="phone" id="phone" type="tel" required placeholder="Номер" />
      </div>
      <div class="btn-wrapper">
        <button type="submit">Оформить заказ</button>
      </div>
    </form>
  </Modal>
</template>

<script setup>
import { computed, ref } from "vue";
import axios from "axios";
import Modal from "./Modal.vue";
import { useStore } from "vuex";

const store = useStore();

const rooms = computed(() => store.state.rooms);
const closeModal = () => store.commit("toggleModal", false);
const name = ref("");
const phone = ref("");

const submitOrder = async () => {
  try {
    const response = await axios.post("http://localhost:3000/orders", {
      name: name.value,
      phone: phone.value,
      rooms: rooms.value,
    });
    alert("Заказ успешно оформлен!");
    closeModal();
  } catch (error) {
    console.error("Ошибка при оформлении заказа:", error);
    alert("Произошла ошибка при оформлении заказа.");
  }
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  margin-bottom: 20px;
}

.inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  font-family: "Futura PT Demi";
  input {
    width: 80%;
    font-size: 15px;
    padding: 5px;
    background-color: var(--gray-bg-color);
    border: none;
    border-radius: 5px;
    &:focus {
      outline-color: gray;
      outline-width: 2px;
    }
  }
}

.btn-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  button {
    background: #bf3266;
    color: white;
    border: none;
    border-radius: 5px;
    width: 190px;
    height: 40px;
    &:hover {
      border: 1px #bf3266 solid;
      background-color: #fff;
      color: #bf3266;
      cursor: pointer;
      span {
        color: white;
      }
    }
  }
}
</style>
