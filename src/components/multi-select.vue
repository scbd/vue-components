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
      :multiple="false"
      :searchable="searchable"
      :clear-on-select="clearOnSelect"
      :close-on-select="closeOnSelect"
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

      <template #selection="{ values }">
        <span
          class="multiselect__single"
          v-if="maxDisplaySelections && values.length > maxDisplaySelections"
        >
          <slot
            name="selection"
            :values="values"
          >
            {{ values.length }} selected
          </slot>
        </span>
      </template>

      <template #tag="{ option, remove }">
        <span class="multiselect__tag">
          <slot
            name="tag"
            :option="option"
            :remove="remove"
          >
            <span>{{ option.label }}</span>
            <span style="padding: 6px">
              <i
                aria-hidden="true"
                tabindex="1"
                class="multiselect__tag-icon"
                @click="remove(option)"
              />
            </span>
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
import type { ModelRef } from 'vue';
import Multiselect from 'vue-multiselect';
import asArray from '../utils/as-array'
import sortBy from 'lodash-es/sortBy'

type Option = { label: string, value: string | number };
type ModelValue = string | string[];

const props = withDefaults(defineProps<{
  id?: string,
  options: Option[],
  label?: string,
  disabled?: boolean,
  placeholder?: string,
  valid?: boolean,
  invalid?: boolean,
  feedbackValid?: string,
  feedbackInvalid?: string,
  maxDisplaySelections?: number,
  searchable?: boolean,
  clearOnSelect?: boolean,
  closeOnSelect?: boolean,
  customSelectedOptions?: {
    get: (model: ModelRef<ModelValue>, options: Option[]) => Option[],
    set: (model: ModelRef<ModelValue>, options: Option[]) => void
  },
}>(), {
  id: uuidv4(),
  maxDisplaySelections: 3,
  searchable: true,
  clearOnSelect: false,
  closeOnSelect: false,
  customSelectedOptions: {
    // @ts-ignore type check doesn't understand that .filter(Boolean) will remove all undefined options
    get(model: ModelRef<ModelValue>, options: Option[]) {
      return sortBy(
        asArray(model.value).map((value: any) => options
          .find((option: Option) => option.value === value))
          .filter(Boolean),
        ['sort']
      )
    },
    set(model: ModelRef<ModelValue>, options: Option[]) {
      model.value = sortBy(
        asArray(options).map((o: any) => o.value),
        ['sort']
      )
    }
  }
});

const model = defineModel<ModelValue>({ required: true });

const sortedOptions = computed(() => props.options.map((o, i) => ({ ...o, sort: i })));

const selectedOptions = computed({
  get() {
    return props.customSelectedOptions.get(model, sortedOptions.value)
  },
  set(options) {
    props.customSelectedOptions.set(model, options)
  }
});
</script>
