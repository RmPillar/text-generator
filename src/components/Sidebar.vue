<template>
  <div class="h-full bg-slate-800 min-w-[300px] w-[300px] p-4">
    <FormInput
      @input="updateInstructionValue"
      class="mb-2"
      label="Tell Me What To Do"
      initalValue="Tell me a story"
    />
    <button class="w-full px-2 py-4 bg-white" @click="generateStory">
      Generate
    </button>

    <!-- <button class="w-full px-2 py-4 bg-white" @click="playAudio">Play</button> -->
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { Configuration, OpenAIApi } from "openai";
  import FormInput from "./FormInput.vue";

  const emit = defineEmits(["generatedStory"]);

  const inputValue = ref("");
  const AIText = ref("");

  const updateInstructionValue = (value) => {
    inputValue.value = value;
  };

  const generateStory = async () => {
    const apiKey = import.meta.env.VITE_OPENAI_KEY ?? "";
    const configuration = new Configuration({
      apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion("text-davinci-001", {
      prompt: inputValue.value,
      max_tokens: 1000,
      temperature: 1.5,
    });

    if (response && response.data && response.data.choices) {
      AIText.value = response.data.choices[0].text;
      emit("generatedStory", response.data.choices[0].text);
    }
  };
</script>
