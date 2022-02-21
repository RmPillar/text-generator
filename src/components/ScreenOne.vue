<template>
  <div
    class="h-screen w-screen flex flex-col items-center justify-center p-20 bg-gradient-to-br from-green-400 to-green-600"
  >
    <Form @submit="handleSubmit">
      <FormSelect
        :options="[
          { name: 'Story', value: 'story' },
          { name: 'Song', value: 'song' },
          { name: 'Script', value: 'script' },
          { name: 'Sermon', value: 'sermon' },
        ]"
        name="category"
        label="Write me a..."
        rules="required"
        class="mb-10"
      />

      <BtnPill label="Next" />
    </Form>
  </div>
</template>

<script setup>
  import { Form } from "vee-validate";
  import FormSelect from "./Form/FormSelect.vue";
  import { useFormStore } from "../stores/form";
  import BtnPill from "./Button/BtnPill.vue";

  const store = useFormStore();

  const handleSubmit = (values) => {
    store.category = values.category;
    store.index++;
  };
</script>
