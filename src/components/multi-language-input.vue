<template>
  <div class="multi-language-input">
    <CFormLabel v-if="label">{{ label }}</CFormLabel>
    <FormInputWrapper
      :invalid="computedInvalid"
      :feedback-invalid="feedbackInvalid"
    >
      <div
        class="multi-language-container"
        v-for="(lang, index) in languages"
      >
        <div v-if="expanded || index == 0">
          <CInputGroup>
            <CInputGroupText>{{ lang.locale.toUpperCase() }}</CInputGroupText>
            <CFormTextarea
              v-if="multiple"
              :id="id ? `${id}-${lang.locale}` : undefined"
              :dir="lang.direction"
              :placeholder="lang.name"
              :rows="rows"
              :modelValue="computedModel[lang.locale]"
              @update:modelValue="modelUpdated(lang.locale, $event)"
              :valid="valid && valid[lang.locale] === true"
              :invalid="computedInvalid"
            />
            <CFormInput
              v-else
              :id="id ? `${id}-${lang.locale}` : undefined"
              :dir="lang.direction"
              :placeholder="lang.name"
              :modelValue="computedModel[lang.locale]"
              @update:modelValue="modelUpdated(lang.locale, $event)"
              :valid="valid && valid[lang.locale] === true"
              :invalid="computedInvalid"
            />
            <CInputGroupText
              v-if="index == 0"
              class="expand"
              @click="expanded = !expanded"
            >
              <CIcon
                v-if="expanded"
                icon="cilChevronTop"
                size="sm"
              />
              <CIcon
                v-else
                icon="cilChevronBottom"
                size="sm"
              />
            </CInputGroupText>
          </CInputGroup>
        </div>
      </div>
    </FormInputWrapper>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { CFormLabel, CInputGroupText, CFormTextarea, CFormInput, CInputGroup } from '@coreui/vue';
import { CIcon } from '@coreui/icons-vue';
import { computed, ref } from 'vue';
import FormInputWrapper from './form-input-wrapper.vue';
import { Languages } from '../data/un-languages';
import type { Language } from '../data/un-languages';
import type LString from '../types/lstring';
import type { Locale } from '../types/lstring';

const props = withDefaults(defineProps<{
  id?: string,
  label?: string,
  multiple?: boolean,
  rows?: number,
  valid?: { [locale: string]: boolean },
  feedbackInvalid?: string,
  languages?: Language[],
}>(), {
  rows: 2,
  // @ts-ignore why?
  languages: Languages,
});

const [model, modifiers] = defineModel<LString>();

const computedModel = computed(() => model.value || {});
const computedInvalid = computed(() => props.valid && Object.values(props.valid).filter(Boolean).length == 0)

const modelUpdated = (locale: Locale, value: string) => {
  if (modifiers.trim) {
    value = value.trim();
  }

  const newValue = {
    ...model.value,
    [locale]: value,
  };

  if (!value) {
    delete newValue[locale];
  }

  model.value = newValue;
}

const expanded = ref(false);
</script>

<style scoped>
.multi-language-container > div {
  margin-top: 0.5rem;
}

.multi-language-container:first-child > div {
  margin-top: 0rem;
}

.multi-language-input .expand {
  cursor: pointer;
  color: var(--cui-secondary-color);
}

.multi-language-input .expand:hover {
  color: var(--cui-primary-color);
  transition: color 0.15s ease-in-out;
}

.multi-language-input .expand:active {
  color: var(--cui-primary);
  transition: color 0s;
}
</style>