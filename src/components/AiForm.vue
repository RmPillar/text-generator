<template>
  <section class="global-aiForm">
    <div class="container">
      <Form @submit="handleSubmit">
        <div class="grid grid-cols-3 gap-20">
          <FormTextarea
            label="Tell Me What To Do."
            name="aiInput"
            rules="required"
            placeholder="Write a story"
            class="col-span-2"
          />
          <div class="col-span-1">
            <FormSelect
              :options="[
                { name: 'British (Male)', value: 'Brian' },
                { name: 'British (Female)', value: 'Amy' },
                { name: 'US (Male)', value: 'Matthew' },
                { name: 'US (Female)', value: 'Salli' },
                { name: 'US (Male Child)', value: 'Kevin' },
                { name: 'US (Female Child)', value: 'Ivy' },
                { name: 'Australian (Female)', value: 'Olivia' },
                { name: 'New Zealand (Female)', value: 'Aria' },
                { name: 'South African (Female)', value: 'Ayanda' },
              ]"
              placeholder="British (Male)"
              name="accent"
              label="What Accent Do You Want"
              class="mb-20"
            />
            <FormSlider
              name="randomness"
              label="Result Randomness"
              class="mb-20"
              :initial-value="0.1"
              :min="0"
              :max="1"
            />

            <BtnBlock label="Generate" :isLoading="store.isLoading" />
          </div>
        </div>
      </Form>
    </div>
  </section>
</template>

<script setup>
  import { Form } from "vee-validate";

  import FormTextarea from "./Form/FormTextarea.vue";
  import FormSelect from "./Form/FormSelect.vue";
  import BtnBlock from "./Button/BtnBlock.vue";

  import { useAWSPolly } from "../composables/useAWSPolly";
  import { useOpenAi } from "../composables/useOpenAi";
  import { useFormStore } from "../stores/form";
  import FormSlider from "./Form/FormSlider.vue";

  const { createAiCompletion } = useOpenAi();
  const store = useFormStore();

  const handleSubmit = async ({ aiInput, accent, randomness }) => {
    store.isLoading = true;

    const aiResponse = await createAiCompletion(aiInput, randomness);

    if (aiResponse) {
      store.isLoading = false;
      store.showForm = false;

      console.log(aiResponse.value);
      store.aiBody = aiResponse.value;

      const { url } = await useAWSPolly(aiResponse.value, accent);

      store.audio = url;
    }
  };
</script>
