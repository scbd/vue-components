<!-- for testing locally -->
<script
  setup
  lang="ts"
>
import { ref } from 'vue'
import MultiLanguageInput from './components/multi-language-input.vue'
import DateInput from './components/date-input.vue'
import DateRangeInput from './components/date-range-input.vue'
import DatetimeInput from './components/datetime-input.vue'
import DatetimeRangeInput from './components/datetime-range-input.vue'
import type { Language } from './data/un-languages'

const langValues = ref({
  en: 'English value',
  fr: 'La valeure française'
})

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

    <h2>Multi Language Input</h2>
    <MultiLanguageInput
      label="Multi Language Input"
      v-model="langValues"
    />
    <MultiLanguageInput
      label="Multi Language Input (valid)"
      :valid="{ en: true, fr: true }"
    />
    <MultiLanguageInput
      label="Multi Language Input (invalid)"
      :valid="{ en: false }"
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
