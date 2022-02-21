<template>
  <div class="form-select group">
    <label class="form-label text-white" :for="name" v-text="label" />

    <div
      ref="triggerRef"
      class="form-select__wrapper"
      v-click-outside="closeDropdown"
    >
      <div class="form-select__icons z-10 mr-10">
        <span :class="{ 'flip-y': isOpen }" class="form-select__icons__icon">
          <Chevron />
        </span>
      </div>

      <div
        ref="dropdownRef"
        class="form-select__dropdown"
        :class="isOpen ? 'is-visible' : 'is-hidden'"
      >
        <ul
          ref="dropdown"
          class="form-select__list px-20 py-10 bg-white shadow-lg"
        >
          <li
            v-for="(option, index) in options"
            :key="index"
            class="form-select__option"
            @click="updateValue(option, index)"
            v-text="option.name"
          />
        </ul>
      </div>

      <input
        v-model="selectValue.name"
        class="form-select__input bg-white/50 rounded-lg px-20 py-10 group-hover:bg-white/100 transition-colors duration-500"
        :class="{ 'bg-white/100': isOpen }"
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
        readonly
        @click="toggleDropdown"
      />
    </div>

    <Field
      :id="name"
      v-model="selectValue.value"
      type="hidden"
      :name="name"
      :placeholder="placeholder"
      :rules="rules"
      readonly
    />
    <ErrorMessage :name="name" class="text-white" />
  </div>
</template>

<script setup>
  import { ref, watch } from "vue";
  import { Field, ErrorMessage } from "vee-validate";
  import { usePopper } from "../../composables/usePopper";
  import Chevron from "../Icons/chevron.vue";

  const emit = defineEmits(["input"]);
  const props = defineProps([
    "name",
    "label",
    "placeholder",
    "rules",
    "options",
    "disabled",
  ]);

  const dropdownRef = ref(null);
  const triggerRef = ref(null);

  const isOpen = ref(false);
  const selected = ref(null);
  const selectValue = ref({ name: null, value: null });

  const { popper } = usePopper(triggerRef, dropdownRef);

  watch(isOpen, () => {
    popper.value.update();
  });

  const closeDropdown = () => {
    isOpen.value = false;
  };

  const toggleDropdown = () => {
    isOpen.value = !open.value;
  };

  const updateValue = (option, index) => {
    closeDropdown();

    if (selected.value === index || option === "") {
      selected.value = null;
      selectValue.value = "";
    } else {
      selectValue.value = option;
      selected.value = index;
    }
  };
</script>

<style lang="postcss">
  .is-hidden {
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
  }
  .is-visible {
    opacity: 1;
    pointer-events: auto;
    visibility: visible;
  }
  .flip-y {
    transform: rotate(180deg);
  }
  .form-select {
    display: flex;
    flex-direction: column;
    &__wrapper {
      position: relative;
      .form-select__dropdown {
        width: 100%;
        &.is-visible {
          z-index: 10;

          &[data-popper-placement="top"] {
            .form-select__list {
              /* border-bottom: 1px solid transparent; */
              border-radius: 0.75rem;
              margin-bottom: 5px;
            }

            & ~ .form-input {
              /* border-top: 1px solid transparent; */
              border-radius: 0.75rem;
            }
          }

          &[data-popper-placement="bottom"] {
            .form-select__list {
              /* border-top: 1px solid transparent; */
              border-radius: 0.75rem;
              margin-top: 5px;
            }

            & ~ .form-input {
              /* border-bottom: 1px solid transparent; */
              border-radius: 0.75rem;
            }
          }
        }
      }
      .form-select__list {
        overflow-y: scroll;
        max-height: 150px;
      }
      .form-select__input {
        width: 100%;
        &:focus {
          outline: none;
        }
      }
      .form-select__icons {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 15px;
        min-width: 15px;
        height: 15px;
        min-height: 15px;
        pointer-events: none;
        &__icon {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
  }
</style>
