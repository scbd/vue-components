<template>
  <CFormInput
    v-model.trim="localDatetime as string"
    type="datetime-local"
    :label="computedLabel"
    :min="localMinDatetime"
    :max="localMaxDatetime"
    placeholder="Select date and time"
    :disabled="disabled"
    :valid="computedValid"
    :invalid="computedInvalid"
    :feedback-valid="feedbackValid"
    :feedback-invalid="feedbackInvalid || validationError"
  />
</template>

<script lang="ts">
export const datetimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
</script>

<script
  setup
  lang="ts"
>
import { CFormInput } from '@coreui/vue'
import { DateTime } from 'luxon';
import tzdata from 'tzdata';
import { computed } from 'vue';

const props = defineProps<{
  label?: string,
  min?: string,
  max?: string,
  timezone: string,
  required?: boolean,
  disabled?: boolean,
  showTimezone?: boolean,
  valid?: boolean,
  invalid?: boolean,
  feedbackValid?: string,
  feedbackInvalid?: string,
}>();

const model = defineModel<string | null | undefined>({ required: true });

const Format = "yyyy-MM-dd'T'HH:mm";

const localMinDatetime = computed(() => toLocalDatetime(props.min) || '');

const localMaxDatetime = computed(() => toLocalDatetime(props.max) || '');

const localDatetime = computed({
  get() {
    return toLocalDatetime(model.value);
  },
  set(value) {
    model.value = toUtcDatetime(value);
  }
});

const hasTimezone = computed(() => !!props.timezone);

const validationError = computed(() => {
  if (!hasTimezone.value) {
    return "Timezone is required"
  }

  if (!Object.keys(tzdata.zones).includes(props.timezone)) {
    return "Invalid timezone";
  }

  if (model.value) {
    if (toLocalDatetime(model.value) === "Invalid DateTime") {
      return "Invalid date";
    }

    if (!model.value?.match(datetimeRegex)) {
      return "Date must include time";
    }
  } else if (props.required) {
    return `${props.label || "Datetime"} is required`;
  }
});

const localDatetimeValid = computed(() => {
  if (!!validationError.value) return false;
  if (props.required && !!localDatetime.value) return true;
  
  return null;
});

const toLocalDatetime = (value?: string | null): string | null => {
  if (!value) return null

  if (!model.value?.match(datetimeRegex)) return null;

  return DateTime.fromISO(value, { zone: props.timezone }).toFormat(Format);
}

const computedValid = computed(() => props.valid === true || localDatetimeValid.value === true);

const computedInvalid = computed(() => props.invalid === true || localDatetimeValid.value === false);

const computedLabel = computed(() => props.label ? props.showTimezone ? `${props.label} (${props.timezone})` : props.label : '');

const toUtcDatetime = (value?: string | null): string | null => value
  ? DateTime.fromISO(value, { zone: props.timezone })
    .setZone("utc")
    .toISO()
  : null;

</script>
