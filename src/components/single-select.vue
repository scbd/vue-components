<template>
  <FormInputWrapper
    :label="label"
    :valid="valid"
    :invalid="invalid"
    :feedback-valid="feedbackValid"
    :feedback-invalid="feedbackInvalid"
  >
    <multiselect
      v-model="selectedOption"
      label="label"
      track-by="value"
      :placeholder="placeholder"
      :options="options"
      :multiple="false"
      :searchable="false"
      :clear-on-select="false"
      :close-on-select="true"
      :disabled="disabled"
    >
      <template #clear>
        <div
          v-if="!!selectedOption"
          class="multiselect__clear"
          @mousedown.prevent.stop="selectedOption = null"
        />
      </template>
    </multiselect>
  </FormInputWrapper>
</template>

<script
  setup
  lang="ts"
>
import FormInputWrapper from './form-input-wrapper.vue'
import { computed } from 'vue';
import Multiselect from 'vue-multiselect';
import { v4 as uuidv4 } from 'uuid';

const props = withDefaults(defineProps<{
  id?: string,
  options: { label: string, value: string | number }[],
  label?: string,
  disabled?: boolean,
  placeholder?: string,
  valid?: boolean, 
  invalid?: boolean,
  feedbackValid?: string,
  feedbackInvalid?: string,  
}>(), {
  id: uuidv4(),
});

const model = defineModel<string | null>();

const selectedOption = computed({
  get() { 
    return props.options.find((s: any) => s.value == model.value) || null 
  },
  set(v: { value: string } | null) { model.value = v?.value || null }
});
</script>
