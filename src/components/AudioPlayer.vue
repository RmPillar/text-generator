<template>
  <audio ref="audioRef">
    <source type="audio/mp3" :src="store.audio" />
  </audio>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useFormStore } from "../stores/form";
  import Plyr from "plyr";

  const store = useFormStore();

  const audioRef = ref(null);

  const player = ref(null);

  onMounted(() => {
    player.value = new Plyr(audioRef.value);
  });
</script>

<style>
  @import "../../node_modules/plyr/dist/plyr.css";
</style>
