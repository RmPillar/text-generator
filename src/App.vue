<template>
  <!-- <ScreenOne v-if="store.index === 0" /> -->
  <!-- <ScreenTwo v-if="store.index === 1" />
  <ScreenThree v-if="store.index === 2" />

  <div class="w-150 fixed bottom-50 right-50">
    <BtnPill label="Reset" @click="resetForm" />
  </div> -->

  <ScreenFour class="mb-100" />
</template>

<script setup>
  import { useFormStore } from "./stores/form";

  import ScreenOne from "./components/ScreenOne.vue";
  import ScreenTwo from "./components/ScreenTwo.vue";
  import ScreenThree from "./components/ScreenThree.vue";

  import BtnPill from "./components/Button/BtnPill.vue";
  import ScreenFour from "./components/ScreenFour.vue";

  const store = useFormStore();

  const resetForm = () => {
    store.$reset();
  };
</script>

<style>
  @import "./assets/main.css";
</style>
