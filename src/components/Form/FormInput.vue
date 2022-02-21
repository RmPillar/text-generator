<template>
  <div class="flex flex-col group">
    <label class="text-white mb-0.5" v-text="label"></label>
    <Field
      class="w-full rounded-lg bg-white/50 px-20 py-10 group-hover:bg-white/100 group-focus-within:bg-white/100 transition-colors duration-500 outline-none"
      :value="inputValue"
      :type="type"
      :rules="rules"
      :name="name"
    />
    <ErrorMessage :name="name" class="text-white" />
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { Field, ErrorMessage } from "vee-validate";

  const props = defineProps(["label", "type", "name", "rules"]);

  const inputValue = ref("");
  const emit = defineEmits(["input"]);
</script>
