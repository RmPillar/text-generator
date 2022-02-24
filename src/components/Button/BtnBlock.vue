<template>
  <button
    class="btn btn--pill group border-2 border-green-500 w-full px-20 py-10 relative hover:border-transparent transition-colors duration-500"
    @click="handleClick"
  >
    <span
      class="text-gray-900 group-hover:text-white transition-colors duration-500 relative z-[5]"
      >{{ label }}</span
    >
    <span
      class="absolute top-[-2px] left-[-2px] h-[calc(100%+4px)] w-[calc(100%+4px)] bg-gradient-to-br from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    ></span>
    <Loader
      v-if="isLoading"
      class="text-slate-900 absolute right-10 top-6/12 -translate-y-6/12 w-25 z-20"
    />
  </button>
</template>

<script setup>
  import Loader from "../Icons/Loader.vue";

  const props = defineProps(["label", "isLoading"]);
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
    box-sizing: border-box;
  }
</style>
