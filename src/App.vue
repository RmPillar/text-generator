<template>
  <ScreenOne v-if="store.index === 0" />
  <ScreenTwo v-if="store.index === 1" @submit="generateAiResponse" />
  <ScreenThree v-if="store.index === 2" />
</template>

<script setup lang="ts">
  import { ref } from "vue";

  import { useFormStore } from "./stores/form";
  import { useOpenAi } from "./composables/useOpenAi";

  import ScreenOne from "./components/ScreenOne.vue";
  import ScreenTwo from "./components/ScreenTwo.vue";
  import ScreenThree from "./components/ScreenThree.vue";

  const store = useFormStore();
  const { openAi, createAiCompletion } = useOpenAi();

  const isLoading = ref(false);
  const body = ref("");

  const setResponse = (e) => {
    body.value = e;

    // setTimeout(() => {
    //   let speech = new SpeechSynthesisUtterance();
    //   speech.text = e;
    //   window.speechSynthesis.speak(speech);
    // }, 5000);
  };

  const generateAiResponse = async () => {
    const aiResponse = await openAi.createAiCompletion(
      store.category,
      store.topic
    );
  };
</script>

<style>
  @import "./assets/main.css";
</style>
