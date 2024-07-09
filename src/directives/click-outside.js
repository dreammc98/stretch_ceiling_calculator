// directives/click-outside.js
export default {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (event) {
      // Проверяем, кликнули ли вне элемента
      if (!(el === event.target || el.contains(event.target))) {
        // Если да, вызываем метод, переданный в директиву
        binding.value(event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
};
