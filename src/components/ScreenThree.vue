<template>
  <div
    class="h-screen w-screen flex flex-col items-center justify-center p-20 bg-gradient-to-br from-green-400 to-green-600"
  >
    <Loader v-if="isLoading" />
    <p
      class="text-center text-white text-lg whitespace-pre-line"
      v-if="!isLoading && body"
    >
      {{ body }}
    </p>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from "vue";
  import { useOpenAi } from "../composables/useOpenAi";
  import { useFormStore } from "../stores/form";
  import Loader from "./Icons/Loader.vue";

  const { createAiCompletion } = useOpenAi();
  const store = useFormStore();

  const isLoading = ref(false);
  const body = ref("");

  const generateAiResponse = async () => {
    isLoading.value = true;

    const aiResponse = await createAiCompletion(store.category, store.topic);

    if (aiResponse) {
      console.log(aiResponse.value);
      isLoading.value = false;
      body.value = aiResponse.value;
    }
  };

  onMounted(generateAiResponse);
</script>
