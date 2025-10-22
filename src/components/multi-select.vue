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
        <slot
          name="option"
          :option="option"
        >
          <span>{{ option.label }}</span>
        </slot>
      </template>

      <template #tag="{ option, remove }">
        <span class="multiselect__tag">
          <slot
            name="tag"
            :option="option"
            :remove="remove"
          >
            <span>{{ option.label }}</span>
            <i
              aria-hidden="true"
              tabindex="1"
              class="multiselect__tag-icon"
              @click="remove(option)"
            />
          </slot>
        </span>
      </template>

      <template #clear>
        <div
          v-if="selectedOptions.length"
          @mousedown.prevent.stop="selectedOptions = []"
        >
          <div class="multiselect__clear">
            <slot name="clear">×</slot>
          </div>
        </div>
      </template>
    </multiselect>
  </FormInputWrapper>
</template>

<script
  setup
  lang="ts"
>
import FormInputWrapper from './form-input-wrapper.vue'
import { v4 as uuidv4 } from 'uuid';
import { computed } from 'vue';
import Multiselect from 'vue-multiselect';
import asArray from '../utils/as-array'
import sortBy from 'lodash-es/sortBy'

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

const sortedOptions = computed(() => props.options.map((o, i) => ({ ...o, sort: i })));

const selectedOptions = computed({
  get() {
    return sortBy(
      asArray(model.value).map((value: any) => sortedOptions.value
        .find((option: { label: string, value: string | number }) => option.value === value))
        .filter(Boolean),
      ['sort']
    )
  },
  set(values) {
    model.value = sortBy(
      asArray(values).map((o: any) => o.value),
      ['sort']
    )
  }
});
</script>
