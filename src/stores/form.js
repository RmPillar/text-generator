import { defineStore } from "pinia";

export const useFormStore = defineStore({
  id: "form",
  state: () => ({
    category: null,
    topic: null,
    index: 0,
  }),
});
