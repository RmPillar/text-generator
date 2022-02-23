<template>
  <div
    class="h-screen w-screen bg-gradient-to-br from-green-400 to-green-600 overflow-y-scroll"
  >
    <div class="container py-70 grid grid-cols-6">
      <Loader
        v-if="isLoading"
        class="absolute top-6/12 left-6/12 -translate-x-6/12 -translate-y-6/12"
      />
      <div class="col-span-4 col-start-2" v-if="!isLoading && body">
        <h1 class="text-6xl font-bold uppercase text-white">
          {{ `A ${store.category} about ${store.topic}` }}
        </h1>
        <p class="text-white text-lg whitespace-pre-line">
          {{ body }}
        </p>
      </div>
    </div>
    <button @click="playAudio" class="w-100 fixed top-50 right-50 text-white">
      <Play v-if="!audioPlaying" /> <Pause v-else />
    </button>
    <audio ref="audioRef">
      <source ref="sourceRef" type="audio/mp3" :src="audio" />
    </audio>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from "vue";
  import { useAWSPolly } from "../composables/useAWSPolly";
  import { useOpenAi } from "../composables/useOpenAi";
  import { useFormStore } from "../stores/form";
  import Loader from "./Icons/Loader.vue";
  import Play from "./Icons/Play.vue";
  import Pause from "./Icons/Pause.vue";

  const { createAiCompletion } = useOpenAi();
  const store = useFormStore();

  const isLoading = ref(false);
  const audioPlaying = ref(false);
  const body = ref("");
  const audioRef = ref(null);
  const sourceRef = ref(null);
  const audio = ref("");

  const generateAiResponse = async () => {
    console.log(audioRef.value);
    isLoading.value = true;

    const aiResponse = await createAiCompletion(store.category, store.topic);

    if (aiResponse) {
      isLoading.value = false;
      body.value = aiResponse.value;

      const { url } = await useAWSPolly(body.value);

      audio.value = url;
    }
  };

  const playAudio = () => {
    if (!audio) return;

    if (audioPlaying.value) {
      audioRef.value.pause();
      audioPlaying.value = false;
    } else {
      audioRef.value.play();
      audioPlaying.value = true;
    }
  };

  watch(audio, () => {
    if (!audio) return;
    console.log("hello");
    audioRef.value.load();
  });

  onMounted(generateAiResponse);
</script>
