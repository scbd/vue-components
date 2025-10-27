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
      :multiple="multiple"
      :searchable="searchable"
      :clear-on-select="clearOnSelect"
      :close-on-select="internalCloseOnSelect"
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
import isEqual from 'lodash-es/isEqual'
import sortBy from 'lodash-es/sortBy'
import { v4 as uuidv4 } from 'uuid';
import { computed } from 'vue';
import Multiselect from 'vue-multiselect';
import FormInputWrapper from './form-input-wrapper.vue'
import asArray from '../utils/as-array'

type Option = { label: string, value: any };

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
  multiple?: boolean,
  searchable?: boolean,
  clearOnSelect?: boolean,
  closeOnSelect?: boolean,
}>(), {
  id: uuidv4(),
  maxDisplaySelections: 3,
  multiple: false,
  searchable: true,
});

// set sensible default for single and multi select modes (can't look at prop values in withDefaults)
const internalCloseOnSelect = props.closeOnSelect || !props.multiple;

const model = defineModel<string | string[]>({ required: true });

const sortedOptions = computed(() => props.options.map((o, i) => ({ ...o, sort: i })));

const selectedOptions = computed({
  get() {
    return sortBy(
      asArray(model.value).map((value: any) => sortedOptions.value
        .find((option: Option) => isEqual(option.value, value)))
        .filter(Boolean),
      ['sort']
    )
  },
  set(options) {
    model.value = sortBy(
      asArray(options).map((o: any) => o.value),
      ['sort']
    )
  }
});
</script>
