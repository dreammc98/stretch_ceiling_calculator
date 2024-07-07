<template>
  <svg :width="width" :height="height" :viewBox="viewBox" fill="none" class="svg">
    <use :xlink:href="`${iconsSprite}#${name}`"></use>
  </svg>
</template>

<script setup>
import iconsSprite from "../assets/img/icons-sprite.svg";

const props = defineProps({
  width: {
    type: String,
    default: "16px",
  },
  height: {
    type: String,
    default: "16px",
  },
  viewBox: {
    type: String,
    default: "0 0 16 16",
  },
  name: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
