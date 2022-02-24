<template>
  <section class="global-aiResult">
    <div class="container">
      <p
        v-if="store.aiBody"
        v-text="store.aiBody"
        class="text-slate-900 text-lg mb-50"
      ></p>

      <button @click="playAudio" class="w-100 text-green-500">
        <Play v-if="!audioPlaying" /> <Pause v-else />
      </button>

      <audio ref="audioRef" @ended="stopAudio">
        <source type="audio/mp3" :src="store.audio" />
      </audio>
    </div>
  </section>
</template>

<script setup>
  import { useFormStore } from "../stores/form";
  import Play from "./Icons/Play.vue";
  import Pause from "./Icons/Pause.vue";
  import { watch, ref } from "vue";

  const store = useFormStore();

  const audioPlaying = ref(false);
  const audioRef = ref(null);

  const playAudio = () => {
    if (!store.audio) return;

    if (audioPlaying.value) {
      audioRef.value.pause();
      audioPlaying.value = false;
    } else {
      audioRef.value.play();
      audioPlaying.value = true;
    }
  };

  const stopAudio = () => {
    if (!store.audio) return;
    audioPlaying.value = false;
    audioRef.value.pause();
    audioRef.value.currentTime = 0;
  };

  watch(store, () => {
    console.log(store.audio);
    if (!store.audio) return;

    audioRef.value.load();
  });
</script>
