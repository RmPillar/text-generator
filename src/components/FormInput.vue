<template>
  <div class="flex flex-col">
    <label class="text-white mb-0.5" v-text="label"></label>
    <input
      class="w-full rounded-xl bg-white px-4 py-2"
      @input="setValue"
      :value="inputValue"
      :type="type"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const props = defineProps(["label", "type"]);

  const inputValue = ref("");
  const emit = defineEmits(["input"]);

  const setValue = (e) => {
    inputValue.value = e.target.value;
    emit("input", inputValue.value);
  };
</script>
