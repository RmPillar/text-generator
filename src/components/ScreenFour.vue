<template>
  <main class="min-h-screen flex flex-col">
    <Hero class="mb-50" />
    <AiForm v-if="store.showForm" />
    <AiResult v-if="!store.showForm" />
  </main>
</template>

<script setup>
  import Hero from "./Hero.vue";
  import AiForm from "./AiForm.vue";

  import { useFormStore } from "../stores/form";
  import AiResult from "./AiResult.vue";

  const store = useFormStore();
</script>
