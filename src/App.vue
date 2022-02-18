<template>
  <div class="h-screen w-screen flex">
    <Sidebar @generated-story="setStory" />
    <div class="px-2">
      <p v-text="body"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";

  import Sidebar from "./components/Sidebar.vue";

  const body = ref("");

  const setStory = (e) => {
    body.value = e;

    setTimeout(() => {
      let speech = new SpeechSynthesisUtterance();
      speech.text = e;
      window.speechSynthesis.speak(speech);
    }, 5000);
  };
</script>

<style>
  @import "./assets/main.css";
</style>
