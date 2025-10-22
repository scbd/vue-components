<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { lstring } from '@scbd/vue-components';

const options = [
  { label: "FOO!", value: 'foo' },
  { label: "BAR!!", value: 'bar' },
  { label: "CAR!!!", value: 'car' },
];

const selectedOption = ref();
const selectedOptions = ref([]);

const langValues = ref({
  en: 'English value',
  fr: 'La valeure française'
});
const customLangValues = ref({
  en: "We are Klingons!",
  kl: "tlhIngan maH!",
});

const date = ref('2000-01-01');
const datetime = ref(new Date().toISOString());
const timezone = "America/Montreal";
</script>

<template>
  <div
    style="width: fit-content; padding: 1rem; display: flex; flex-direction: column; gap: 1rem; align-items: center; margin: auto"
  >
    <h1 class="bar">Example Vue App</h1>

    <h2>Single and Multi Select</h2>
    <div style="width: 15rem; display: flex; flex-direction: column; gap: 1rem;">
      <ScbdSingleSelect
        :options="options"
        v-model="selectedOption"
        placeholder="Select an foo!"
        label="Single Select"
      />
      <ScbdMultiSelect
        :options="options"
        v-model="selectedOptions"
        placeholder="Select many foos!"
        label="Multi Select"
      />
    </div>

    <h2>Multi Language Input</h2>
    <ScbdMultiLanguageInput
      label="Multi Language Input"
      v-model="langValues"
    />
    <ScbdMultiLanguageInput
      label="Multi Language Input (valid)"
      :valid="{ en: true, fr: true }"
    />
    <ScbdMultiLanguageInput
      label="Multi Language Input (invalid)"
      :valid="{ en: false }"
    />
    <ScbdMultiLanguageInput
      label="Multi Language Input (custom languages)"
      v-model="customLangValues"
      :languages="[
        { locale: 'en', name: 'English', direction: 'ltr' },
        { locale: 'kl', name: 'Klingon', direction: 'ltr' },
      ]"
    />

    <h2>Multi Language Function</h2>
    <div class="d-flex gap-2 align-items-center">
      <code>lstring(langValues):</code> {{ lstring(langValues) }}
    </div>

    <h2>Date Inputs</h2>
    <ScbdDateInput
      label="Date"
      v-model="date"
    ></ScbdDateInput>
    <ScbdDateRangeInput
      label="Date"
      v-model:start-date="date"
      v-model:end-date="date"
    />
    <ScbdDatetimeInput
      label="Datetime"
      v-model="datetime"
      :timezone="timezone"
    />
    <ScbdDatetimeRangeInput
      label="Datetime"
      v-model:start-date="datetime"
      v-model:end-date="datetime"
      :timezone="timezone"
    />
  </div>
</template>
