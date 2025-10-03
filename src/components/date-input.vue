<template>
  <CFormInput
    v-model.trim="localDate as string"
    :label="label"
    type="date"
    :placeholder="placeholder"
    :min="localMin"
    :max="localMax"
    :disabled="disabled"
    :valid="isValid"
    :invalid="isInvalid"
    :feedback-valid="feedbackValid"
    :feedback-invalid="feedbackInvalid || validationError"
  />
</template>

<script
  setup
  lang="ts"
>
import { CFormInput } from '@coreui/vue'
import { DateTime } from 'luxon';
import tzdata from 'tzdata';
import { computed } from 'vue';
import { datetimeRegex } from './datetime-input.vue';

const props = withDefaults(defineProps<{
  label?: string,
  min?: string,
  max?: string,
  timezone?: string,
  adjustTime?: "startOfDay" | "endOfDay",
  required?: boolean,
  disabled?: boolean,
  valid?: boolean,
  invalid?: boolean,
  feedbackValid?: string,
  feedbackInvalid?: string,
  placeholder?: string,
}>(), {
  adjustTime: "startOfDay",
  placeholder: "Select date",
});

const model = defineModel<string | null | undefined>({ required: true });

const localDate = computed({
  get() {
    return toLocalDate(model.value);
  },
  set(value) {
    model.value = toUtcDate(value);
  }
});

const localMin = computed(() => toLocalDate(props.min));

const localMax = computed(() => toLocalDate(props.max));

const hasTimezone = computed(() => !!props.timezone);

const validationError = computed(() => {
  if (props.timezone && !Object.keys(tzdata.zones).includes(props.timezone)) {
    return "Invalid timezone";
  }

  if (model.value) {
    if (toLocalDate(model.value) === "Invalid DateTime") {
      return "Invalid date";
    }

    if (hasTimezone.value && !model.value?.match(datetimeRegex)) {
      return "Date must include time";
    }

    if (!hasTimezone.value && model.value?.match(datetimeRegex)) {
      return "Date must not include time";
    }
  } else if (props.required) {
    return `${props.label || "Date"} is required`;
  }
});

const localDateValid = computed(() => {
  if (!!validationError.value) return false;
  if (props.required && !!localDate.value) return true;
  
  return null;
});

const isValid = computed(() => props.valid === true || localDateValid.value === true);

const isInvalid = computed(() => props.invalid === true || localDateValid.value === false);

const toLocalDate = (value?: string | null) => {
  if (!value) return null

  if (hasTimezone.value && !value?.match(datetimeRegex)) return null;

  if (!hasTimezone.value && value?.match(datetimeRegex)) return null;

  return DateTime.fromISO(value, { zone: props.timezone || "utc" }).toISODate();
}

const toUtcDate = (value?: string | null): string | null => {
  if (value) {
    let date = DateTime.fromISO(value, { zone: props.timezone || "utc" });
    date = props.adjustTime == "endOfDay"
      ? date.endOf("day").setZone("utc")
      : date.startOf("day").setZone("utc");

    return hasTimezone.value
      ? date.toISO()
      : date.toISODate();
  }

  return null;
}
</script>
