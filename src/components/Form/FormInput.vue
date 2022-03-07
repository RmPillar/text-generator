<template>
  <div class="flex flex-col group">
    <label class="text-zinc-100 font-silkaMono mb-5" v-text="label"></label>
    <Field
      class="w-full px-20 py-10 font-silkaMono text-zinc-100 bg-zinc-100/10 transition-colors duration-500 outline-none"
      :value="inputValue"
      :type="type"
      :rules="rules"
      :name="name"
    />
    <ErrorMessage :name="name" class="text-zinc-100" />
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { Field, ErrorMessage } from "vee-validate";

  const props = defineProps(["label", "type", "name", "rules"]);

  const inputValue = ref("");
</script>
