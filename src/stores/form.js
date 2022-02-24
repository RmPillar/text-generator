import { defineStore } from "pinia";

export const useFormStore = defineStore({
  id: "form",
  state: () => ({
    audio: null,
    aiBody: "",
    isLoading: false,
    showForm: true,
  }),
});
