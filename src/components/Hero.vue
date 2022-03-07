<template>
  <section class="flex flex-col items-center justify-center h-screen">
    <div class="container grid grid-cols-12 gap-x-10 lg:gap-x-20">
      <h1
        class="animated-heading col-span-full text-zinc-100/10 text-[300px] sm:text-[450px] lg:text-[600px] leading-[250px] sm:leading-[375px] lg:leading-[500px] font-travelSans"
        data-splitting="chars"
        :class="{ entered: animateHeading }"
      >
        Jarvis
      </h1>
      <h2
        class="animated-subheading col-start-2 md:col-start-6 col-span-10 text-zinc-100/10 text-[70px] md:text-[85px] lg:text-[100px] leading-[60px] md:leading-[70px] lg:leading-[80px] font-travelSans"
        data-splitting="chars"
        :class="{ entered: animateSubheading }"
      >
        Ask me to do anything
      </h2>
    </div>
  </section>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import "splitting/dist/splitting.css";
  import "splitting/dist/splitting-cells.css";
  import Splitting from "splitting";

  const splitText = ref(null);

  const animateHeading = ref(null);
  const animateSubheading = ref(null);

  onMounted(() => {
    splitText.value = Splitting();
    setTimeout(() => {
      animateHeading.value = true;
    }, 100);

    setTimeout(() => {
      animateSubheading.value = true;
    }, 1000);
  });
</script>

<style>
  .word {
    display: inline-block;
    overflow: hidden;
  }
  .animated-heading {
    .char {
      display: inline-block;
      transform: translateY(100%);
      transition: transform 1000ms cubic-bezier(0.46, -0.01, 0, 1)
        calc(var(--char-index) * 100ms);
    }
  }
  .animated-subheading {
    .char {
      display: inline-block;
      transform: translateY(100%);
      transition: transform 500ms cubic-bezier(0.46, -0.01, 0, 1)
        calc(var(--char-index) * 100ms);
    }
  }

  .animated-heading.entered,
  .animated-subheading.entered {
    .char {
      transform: translateY(0%);
    }
  }
</style>
