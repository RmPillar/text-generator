import { createApp } from "vue";
import { createPinia } from "pinia";
import vClickOutside from "click-outside-vue3";

import { defineRule } from "vee-validate";

defineRule("required", (value) => {
  if (!value || !value.length) {
    return "This field is required";
  }
  return true;
});

import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(vClickOutside);

app.mount("#app");
