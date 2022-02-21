import { ref, onMounted, onUnmounted } from "vue";
import { Configuration, OpenAIApi } from "openai";

export const useOpenAi = () => {
  const openAi = ref(null);

  onMounted(() => {
    const apiKey = import.meta.env.VITE_OPENAI_KEY ?? "";
    const configuration = new Configuration({
      apiKey,
    });

    openAi.value = new OpenAIApi(configuration);
  });

  onUnmounted(() => {
    openAi.value = null;
  });

  const createAiCompletion = async (category, topic) => {
    const AiResponse = ref(null);

    if (openAi.value && category && topic) {
      const response = await openAi.value.createCompletion("text-davinci-001", {
        prompt: `Write a ${category} about ${topic}`,
        max_tokens: 500,
        temperature: 0.1,
      });

      if (response && response.data && response.data.choices) {
        AiResponse.value = response.data.choices[0].text;
      }
    }

    return AiResponse;
  };

  return { openAi, createAiCompletion };
};