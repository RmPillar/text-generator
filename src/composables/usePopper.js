import { ref, onMounted } from "vue";
import { createPopper } from "@popperjs/core";

export const usePopper = (trigger, dropdown) => {
  const popper = ref(null);

  onMounted(() => {
    if (trigger && dropdown) {
      popper.value = new createPopper(trigger.value, dropdown.value);
    }
  });

  return { popper };
};
