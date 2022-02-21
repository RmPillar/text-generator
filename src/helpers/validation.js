import { defineRule } from "vee-validate";

defineRule("required", (value) => {
  if (value === "story") {
    return "testing";
  }
  if (!value || !value.length) {
    return "This field is required";
  }
  return true;
});

defineRule("requiredSelect", (value) => {
  if (
    !value.name ||
    !value.name.length ||
    !value.value ||
    !value.value.length
  ) {
    return "This field is required";
  }
  return true;
});
