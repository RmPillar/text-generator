import { ref, onMounted } from "vue";
import Splitting from "splitting";

export const useSplitting = (target, by = "char") => {
  const splitText = ref(null);
  onMounted(() => {
    console.log(target);

    if (!target) return;

    splitText.value = Splitting({ target, by });
  });

  return { splitText };
};
