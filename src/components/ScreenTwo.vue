<template>
  <div
    class="h-screen w-screen flex items-center justify-center p-20 bg-gradient-to-br from-green-400 to-green-600"
  >
    <Form @submit="handleSubmit">
      <FormInput class="mb-10" label="About..." name="topic" rules="required" />
      <BtnPill label="Generate" />
    </Form>
  </div>
</template>

<script setup>
  import { Form } from "vee-validate";

  import FormInput from "./Form/FormInput.vue";
  import BtnPill from "./Button/BtnPill.vue";
  import { useFormStore } from "../stores/form";

  const store = useFormStore();

  const handleSubmit = (values) => {
    store.topic = values.topic;

    store.index++;
  };
</script>
