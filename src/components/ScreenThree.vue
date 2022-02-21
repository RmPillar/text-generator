<template>
  <div
    class="h-screen w-screen bg-gradient-to-br from-green-400 to-green-600 overflow-y-scroll"
  >
    <div class="container py-70 grid grid-cols-6">
      <Loader
        v-if="isLoading"
        class="absolute top-6/12 left-6/12 -translate-x-6/12 -translate-y-6/12"
      />
      <div class="col-span-4 col-start-2">
        <h1
          class="text-6xl font-bold uppercase text-white"
          v-if="!isLoading && body"
        >
          {{ `A ${store.category} about ${store.topic}` }}
        </h1>
        <p
          class="text-white text-lg whitespace-pre-line px-20"
          v-if="!isLoading && body"
        >
          {{ body }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
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
