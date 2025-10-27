<!-- for testing locally -->
<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import DateInput from './components/date-input.vue';
import DateRangeInput from './components/date-range-input.vue';
import DatetimeInput from './components/datetime-input.vue';
import DatetimeRangeInput from './components/datetime-range-input.vue';
import MultiLanguageInput from './components/multi-language-input.vue';
import Select from './components/select.vue';
import type { Language } from './data/un-languages';
import lstring, { trim, isNullOrEmpty, isNullOrWhiteSpace } from './utils/lstring';

const options = [
  { label: "FOO!", value: 'foo' },
  { label: "BAR!!", value: 'bar' },
  { label: "CAR!!!", value: 'car' },
  { label: "DAR?", value: 'dar' },
];

const selectedOption = ref();
const selectedOptions = ref([]);

const langValues = ref({
  en: 'English value',
  fr: 'La valeure française'
});

const customLangs = [
  { locale: "en", name: "English", direction: "ltr" },
  { locale: "kl", name: "Klingon", direction: "ltr" },
] as Language[];

const customLangValues = ref({
  en: "We are Klingons!",
  kl: "tlhIngan maH!",
});

const customLangPlaceholders = ref({
  en: "English now!",
  kl: "DaH tlhIngan Hol!",
});

const date = ref('2000-01-01');
const datetime = ref(new Date().toISOString());
const timezone = "America/Montreal";
const nullRef = ref();
</script>

<template>
  <div
    style="width: fit-content; padding: 1rem; display: flex; flex-direction: column; gap: 1rem; align-items: center; margin: auto"
  >
    <h1>Playground for Dev'ing</h1>

    <h2>Single and Multi Select</h2>

    <div style="width: 15rem; display: flex; flex-direction: column; gap: 1rem;">
      <Select
        :options="options"
        v-model="selectedOption"
        placeholder="Select an foo!"
        label="Single Select"
      />
      <Select
        :options="options"
        v-model="selectedOptions"
        placeholder="Select many foos!"
        label="Multi Select"
        :multiple="true"
      />
      <Select
        :options="options"
        v-model="selectedOptions"
        placeholder="Select many foos!"
        label="Multi Select Templates"
        :multiple="true"
        :max-display-selections="2"
      >
        <template #option="{ option }">
          ☞ {{ option.label }}
        </template>
        <template #tag="{ option, remove }">
          ☞ {{ option.value }}
          <span
            role="button"
            class="ms-1"
            @click="() => { console.log('custom remove'); remove(option) }"
          >✘</span>
        </template>
        <template #clear>✘</template>
        <template #selection="{ values }">
          {{ values.length }} foos
        </template>
      </Select>
    </div>

    <h2>Multi Language Input</h2>
    <MultiLanguageInput
      label="Multi Language Input"
      v-model="langValues"
      feedback-valid="Valid message (not shown)"
      feedback-invalid="Invalid message (not shown)"
    />
    <MultiLanguageInput
      label="Multi Language Input (valid)"
      :valid="true"
      feedback-valid="All valid"
    />
    <MultiLanguageInput
      label="Multi Language Input (some valid)"
      :valid="{ en: true, fr: true }"
      feedback-valid="Some are valid"
    />
    <MultiLanguageInput
      label="Multi Language Input (some valid not en)"
      :valid="{ es: true, fr: true }"
      feedback-valid="Some are valid"
    />
    <MultiLanguageInput
      label="Multi Language Input (invalid)"
      :invalid="true"
      feedback-invalid="All invalid"
    />
    <MultiLanguageInput
      label="Multi Language Input (some invalid)"
      :invalid="{ en: true, fr: true }"
      feedback-invalid="Some are invalid"
    />
    <MultiLanguageInput
      label="Multi Language Input (some invalid not en)"
      :invalid="{ es: true, fr: true }"
      feedback-invalid="Some are invalid"
    />
    <MultiLanguageInput
      label="Multi Language Input (custom langs)"
      v-model="customLangValues"
      :languages="customLangs"
    />
    <MultiLanguageInput
      label="Multi Language Input (standard placeholders)"
      v-model="nullRef"
      :languages="customLangs"
    />
    <MultiLanguageInput
      label="Multi Language Input (custom placeholders)"
      v-model="nullRef"
      :languages="customLangs"
      :placeholders="customLangPlaceholders"
    />

    <h2>Multi Language Function</h2>
    <div class="d-flex flex-column gap-2 align-items-center">
      <code>lstring(langValues):</code> {{ lstring(langValues) }}
      <code>trim({ en: ' foo ', fr: 'bar', es: undefined, kl: '' }): </code> {{ trim({
      en: ' foo ', fr: 'bar', es:
      undefined, kl: ''
      }) }}
      <code>isNullOrEmpty({ en: 'nope' }): </code> {{ isNullOrEmpty({ en: 'nope' }) }}
      <code>isNullOrEmpty({ en: '', fr: 'non' }): </code> {{ isNullOrEmpty({ en: '', fr: 'non' }) }}
      <code>isNullOrEmpty({ en: ' ' }): </code> {{ isNullOrEmpty({ en: ' ' }) }}
      <code>isNullOrEmpty({}): </code> {{ isNullOrEmpty({}) }}
      <code>isNullOrEmpty(): </code> {{ isNullOrEmpty() }}
      <code>isNullOrWhiteSpace({}): </code> {{ isNullOrWhiteSpace({ en: '' }) }}
      <code>isNullOrWhiteSpace({ en: '' }): </code> {{ isNullOrWhiteSpace({ en: '' }) }}
      <code>isNullOrWhiteSpace({ en: ' ' }): </code> {{ isNullOrWhiteSpace({ en: ' ' }) }}
      <code>isNullOrWhiteSpace({ en: 'nope' }): </code> {{ isNullOrWhiteSpace({ en: 'nope' }) }}
    </div>

    <h2>Date Inputs</h2>
    <DateInput
      label="Date"
      v-model="date"
    />
    <DateInput
      label="Date"
      v-model="date"
      :valid="true"
    />
    <DateInput
      label="Date"
      v-model="date"
      :invalid="true"
    />
    <DateInput
      label="Date"
      v-model="nullRef"
      :required="true"
    />
    <DateRangeInput
      label="Date"
      v-model:start-date="date"
      v-model:end-date="date"
    />
    <DatetimeInput
      label="Datetime"
      v-model="datetime"
      :timezone="timezone"
    />
    <DatetimeInput
      label="Datetime"
      v-model="datetime"
      :timezone="timezone"
      :valid="true"
    />
    <DatetimeInput
      label="Datetime"
      v-model="datetime"
      :timezone="timezone"
      :invalid="true"
    />
    <DatetimeInput
      label="Datetime"
      v-model="nullRef"
      :timezone="timezone"
      :required="true"
    />
    <DatetimeInput
      label="Datetime"
      v-model="nullRef"
      :timezone="nullRef"
    />
    <DatetimeRangeInput
      label="Datetime"
      v-model:start-date="datetime"
      v-model:end-date="datetime"
      :timezone="timezone"
    />

  </div>
</template>
