<template>
  <div class="flex flex-col">
    <div class="flex justify-between mb-10">
      <label class="text-zinc-100/100 font-silkaMono" v-text="label"></label>

      <span
        class="text-zinc-100/100 font-silkaMono"
        v-text="sliderValue"
      ></span>
    </div>
    <div class="flex items-center justify-between w-full">
      <span class="mr-5 font-silkaMono text-zinc-100 block" v-text="min"></span>
      <div
        class="w-full h-[3px] bg-zinc-100/10 rounded-full relative"
        ref="sliderRef"
      >
        <div
          class="w-20 h-20 rounded-full bg-white border-2 border-zinc-100/10 absolute left-0 top-6/12 -translate-y-6/12 cursor-pointer"
          ref="thumbRef"
          v-touch="{
            start: setMouseDown,
            end: setMouseUp,
            move: setSliderValue,
            resize: setSliderDimensions,
          }"
        />
      </div>
      <span class="ml-5 font-silkaMono text-zinc-100 block" v-text="max"></span>
    </div>
    <Field
      v-model="sliderValue"
      type="hidden"
      :rules="rules"
      :name="name"
      :id="name"
      readonly
    />
    <ErrorMessage :name="name" class="text-zinc-100" />
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { Field, ErrorMessage } from "vee-validate";
  import vTouchDirective from "../../../directives/v-touch";

  const props = defineProps({
    label: String,
    type: String,
    name: String,
    min: Number,
    max: Number,
    initialValue: Number,
    rules: String,
  });

  const vTouch = vTouchDirective;

  const sliderOffsetWidth = ref(0);
  const sliderOffsetLeft = ref(0);
  const thumbOffsetWidth = ref(0);

  const sliderValue = ref(props.initialValue);
  const thumbRef = ref(null);
  const sliderRef = ref(null);
  const isMouseDown = ref(false);

  const setMouseDown = () => {
    isMouseDown.value = true;
  };

  const setMouseUp = () => {
    isMouseDown.value = false;
  };

  const setSliderValue = (clientX) => {
    if (!isMouseDown.value || typeof clientX !== "number") return;

    const mouseDrag =
      clientX - sliderOffsetLeft.value - thumbOffsetWidth.value / 2;

    const realMouseDrag = clientX - sliderOffsetLeft.value;

    const translateX =
      mouseDrag > sliderOffsetWidth.value - thumbOffsetWidth.value
        ? sliderOffsetWidth.value - thumbOffsetWidth.value
        : mouseDrag < 0
        ? 0
        : mouseDrag;

    const value =
      realMouseDrag > sliderOffsetWidth.value
        ? 1
        : realMouseDrag < 0
        ? 0
        : realMouseDrag / sliderOffsetWidth.value;

    thumbRef.value.style.transform = `translate(${translateX}px, -50%`;
    const diff = props.max - props.min;
    sliderValue.value = (props.min + diff * value).toFixed(1);
  };

  const setSliderDimensions = () => {
    sliderOffsetWidth.value = sliderRef.value.offsetWidth;
    sliderOffsetLeft.value = sliderRef.value.offsetLeft;
    thumbOffsetWidth.value = thumbRef.value.offsetWidth;

    const translateX =
      (sliderValue.value / props.max - props.min) * sliderOffsetWidth.value;

    thumbRef.value.style.transform = `translate(${translateX}px, -50%`;
  };
</script>
