<template>
  <audio ref="audioRef">
    <source type="audio/mp3" :src="store.audio" />
  </audio>
</template>

<script setup>
  import { ref, onMounted, watch } from "vue";
  import { useFormStore } from "../stores/form";

  const store = useFormStore();

  const audioRef = ref(null);

  const player = ref(null);
  const audio = ref(store.audio);

  onMounted(() => {
    if (!player.value) {
      player.value = new Plyr(audioRef.value, {
        resetOnEnd: true,
        invertTime: false,
      });
      player.value.rewind(0);
    }
  });

  watch(store, () => {
    if (!player.value || !store.audio) return;

    player.value.source = {
      type: "audio",
      title: "Ai Text Audio",
      sources: [
        {
          src: store.audio,
          type: "audio/mp3",
        },
      ],
    };
  });
</script>

<style>
  .plyr {
    --plyr-color-main: rgb(244 244 245 / 0.1);
    --plyr-control-icon: #f4f4f5;
    --plyr-audio-control-color: #f4f4f5;
    --plyr-audio-controls-background: transparent;
  }
</style>
