<template>
  <div>
    <div class="input">
      <DigitalInput :title="'Площадь помещения'" :sign="'м²'" :property="'area'" />
      <DigitalInput :title="'Количество углов'" :sign="'шт.'" :property="'corners'" />
    </div>
    <div class="input">
      <TextInput :title="'Фактура потолка'" :arr="textureArr" :property="'texture'" />
      <TextInput :title="'Цвет потолка'" :arr="colorArr" :property="'color'" />
    </div>
  </div>
</template>

<script setup>
import DigitalInput from "@/components/Inputs/DigitalInput.vue";
import TextInput from "@/components/Inputs/TextInput.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const textureArr = store.state.textureArr;

const colorArr = store.state.colorArr;
</script>

<style scoped lang="scss">
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
</style>
