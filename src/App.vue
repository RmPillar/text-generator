<template>
  <main class="min-h-screen flex flex-col pb-100">
    <Hero class="mb-50" />
    <AiForm class="mb-50" />
    <AiResult v-if="!store.showForm" />
  </main>
</template>

<script setup>
  import Hero from "./components/Hero.vue";
  import AiForm from "./components/AiForm.vue";
  import AiResult from "./components/AiResult.vue";

  import { useFormStore } from "./stores/form";

  const store = useFormStore();
</script>

<style>
  @import "./assets/main.css";
</style>
