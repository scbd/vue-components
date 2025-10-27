import type { App } from 'vue'

import DateInput from './components/date-input.vue';
import DateRangeInput from './components/date-range-input.vue';
import DatetimeInput from './components/datetime-input.vue';
import DatetimeRangeInput from './components/datetime-range-input.vue';
import FormInputWrapper from './components/form-input-wrapper.vue';
import MultiLanguageInput from './components/multi-language-input.vue';
import Select from './components/select.vue';
import './assets/scss/style.scss';

// Named exports (tree-shakable)
export {
  DateInput,
  DateRangeInput,
  DatetimeInput,
  DatetimeRangeInput,
  MultiLanguageInput,
  FormInputWrapper,
  Select,
};

// Vue plugin (global registration)
export default {
  install: (app: App) => {
    app.component('ScbdDateInput', DateInput);
    app.component('ScbdDateRangeInput', DateRangeInput);
    app.component('ScbdDatetimeInput', DatetimeInput);
    app.component('ScbdDatetimeRangeInput', DatetimeRangeInput);
    app.component('ScbdFormInputWrapper', FormInputWrapper);
    app.component('ScbdMultiLanguageInput', MultiLanguageInput);
    app.component('ScbdSelect', Select);
  },
};

// utils and other functions
export { default as asArray } from './utils/as-array';
export { default as asValue } from './utils/as-value';
export { default as lstring } from './utils/lstring';
export { Languages } from './data/un-languages';

// types
export type { Language } from './data/un-languages';
export type { default as LString } from './types/lstring';
