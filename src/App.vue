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

const langValues = ref({
  en: 'English value',
  fr: 'La valeure française'
})

const date = ref('2000-01-01');
const datetime = ref(new Date().toISOString());
const timezone = "America/Montreal";
</script>

<template>
  <div
    style="width: fit-content; padding: 1rem; display: flex; flex-direction: column; gap: 1rem; align-items: center; margin: auto"
  >
    <h1>Playground for Dev'ing</h1>

    <h2>Example Button</h2>
    <ExampleButton msg="Allo" />
    <ExampleButton msg="Hello" />

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

    <h2>Date Inputs</h2>
    <DateInput
      label="Date"
      v-model="date"
    ></DateInput>
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
    <DatetimeRangeInput
      label="Datetime"
      v-model:start-date="datetime"
      v-model:end-date="datetime"
      :timezone="timezone"
    />

  </div>
</template>
