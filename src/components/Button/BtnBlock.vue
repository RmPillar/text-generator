<template>
  <button
    class="btn btn--pill group w-full px-20 py-10 relative group border-2 border-zinc-100/10 hover:border-transparent lg-max:hover:bg-zinc-100 transition-colors duration-700"
    @click="handleClick"
  >
    <span
      class="text-zinc-100 group-hover:text-zinc-900 font-silkaMono transition-colors duration-500 relative z-[5]"
      >{{ label }}</span
    >

    <div
      class="absolute inset-0 w-full h-full grid grid-cols-[repeat(24,minmax(0,1fr))] grid-rows-4 lg-max:hidden"
    >
      <div
        class="col-span-1 row-span-1 bg-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        :style="`transition-delay:${5 * n}ms`"
        v-for="n in 24"
      ></div>
      <div
        class="col-span-1 row-span-1 bg-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        :style="`transition-delay:${5 * n + 40}ms`"
        v-for="n in 24"
      ></div>
      <div
        class="col-span-1 row-span-1 bg-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        :style="`transition-delay:${5 * n + 80}ms`"
        v-for="n in 24"
      ></div>
      <div
        class="col-span-1 row-span-1 bg-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        :style="`transition-delay:${5 * n + 120}ms`"
        v-for="n in 24"
      ></div>
    </div>

    <Loader
      v-if="isLoading"
      class="text-zinc-100 absolute right-10 top-6/12 -translate-y-6/12 w-25 z-20"
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
