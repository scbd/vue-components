<template>
  <FormInputWrapper
    :label="label"
    :valid="valid"
    :invalid="invalid"
    :feedback-valid="feedbackValid"
    :feedback-invalid="feedbackInvalid"
  >
    <multiselect
      v-model="selectedOptions"
      :id="id"
      label="label"
      track-by="value"
      :placeholder="placeholder"
      :options="sortedOptions"
      :multiple="true"
      :searchable="true"
      :clear-on-select="false"
      :close-on-select="false"
      :invalid="invalid"
      :disabled="disabled"
    >
      <template #option="{ option }">
        <span>{{ option.label }}</span>
      </template>

      <template #tag="{ option, remove }">
        <span class="multiselect__tag">
          <span>{{ option.label }}</span>
          <i
            aria-hidden="true"
            tabindex="1"
            class="multiselect__tag-icon"
            @click="remove(option)"
          />
        </span>
      </template>

      <template #clear>
        <div
          v-if="selectedOptions.length"
          class="multiselect__clear"
          @mousedown.prevent.stop="selectedOptions = []"
        />
      </template>
    </multiselect>
  </FormInputWrapper>
</template>

<script
  setup
  lang="ts"
>
import { FormInputWrapper } from '@scbd/vue-components'
import { v4 as uuidv4 } from 'uuid';
import { computed } from 'vue';
import Multiselect from 'vue-multiselect';
import { asArray, sortBy } from '../utils/collections'

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

const model = defineModel<string | string[]>();

const sortedOptions = computed(() => props.options.map((o, i) => ({ ...o, sort: i})));

const selectedOptions = computed({
  get() {
    return asArray(model.value)
      // TODO any
      .map((value: any) => sortedOptions.value
        .find((option: { label: string, value: string | number }) => option.value === value))
      .filter(Boolean)
      .sort(sortBy('sort', 'asc'));
  },
  set(values) {
    model.value = asArray(values)
      .sort(sortBy('sort', 'asc'))
      // TODO any
      .map((o: any) => o.value);    
  }
});
</script>
