<template>
  <div class="flex flex-col group">
    <label class="text-gray-900 text-xl mb-10" v-text="label"></label>
    <Field
      class="w-full px-20 py-10 text-gray-900 border-2 border-green-500 transition-colors duration-500 outline-none"
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
</script>
