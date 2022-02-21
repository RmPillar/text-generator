<template>
  <button
    class="btn btn--pill group border-2 border-white w-full px-20 py-10 rounded-lg relative overflow-hidden"
    @click="handleClick"
  >
    <span
      class="text-white group-hover:text-gray-800 transition-colors duration-500 relative z-10"
      >{{ label }}</span
    >
    <span
      class="absolute w-full pt-full rounded-full bg-white -left-6/12 -top-6/12 scale-0 group-hover:scale-[250%] transition-transform duration-700"
    ></span>
  </button>
</template>

<script setup>
  const props = defineProps(["label"]);
  const emit = defineEmits(["clicked"]);

  const handleClick = () => {
    emit("clicked");
  };
</script>

<style>
  button,
  .btn,
  a {
    display: inline-block;
    text-decoration-line: none;
    appearance: none;
  }
</style>
