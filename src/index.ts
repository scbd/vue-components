import type { App } from 'vue'

import DateInput from './components/date-input.vue';
import DateRangeInput from './components/date-range-input.vue';
import DatetimeInput from './components/datetime-input.vue';
import DatetimeRangeInput from './components/datetime-range-input.vue';
import FormInputWrapper from './components/form-input-wrapper.vue';
import MultiLanguageInput from './components/multi-language-input.vue';
import MultiSelect from './components/multi-select.vue';
import SingleSelect from './components/single-select.vue';
import './assets/scss/style.scss';

// Named exports (tree-shakable)
export {
  DateInput,
  DateRangeInput,
  DatetimeInput,
  DatetimeRangeInput,
  MultiLanguageInput,
  FormInputWrapper,
  MultiSelect,
  SingleSelect,
};

// Vue plugin (global registration)
export default {
  install: (app: App) => {
    app.component('DateInput', DateInput);
    app.component('DateRangeInput', DateRangeInput);
    app.component('DatetimeInput', DatetimeInput);
    app.component('DatetimeRangeInput', DatetimeRangeInput);
    app.component('FormInputWrapper', FormInputWrapper);
    app.component('MultiLanguageInput', MultiLanguageInput);
    app.component('MultiSelect', MultiSelect);
    app.component('SingleSelect', SingleSelect);
  },
};

// utils and other functions
export { default as lstring } from './utils/lstring';
export { Languages } from './data/un-languages';

// types
export type { Language } from './data/un-languages';
export type { default as LString } from './types/lstring';
