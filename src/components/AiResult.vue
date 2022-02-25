<template>
  <section class="global-aiResult" ref="sectionRef">
    <div class="container">
      <p
        v-if="store.aiBody"
        v-text="store.aiBody"
        class="text-slate-900 text-lg mb-50"
      ></p>

      <AudioPlayer v-if="store.audio" />
    </div>
  </section>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { useFormStore } from "../stores/form";

  import AudioPlayer from "./AudioPlayer.vue";

  const store = useFormStore();

  const sectionRef = ref(null);

  onMounted(() => {
    if (sectionRef.value) {
      sectionRef.value.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  });
</script>
