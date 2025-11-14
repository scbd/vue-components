<template>
  <div :class="[valid ? 'is-valid' : '', invalid ? 'is-invalid' : '']">
    <CFormLabel v-if="label">{{ label }}</CFormLabel>
    <slot />
    <CFormFeedback
      v-if="invalid"
      invalid
    >{{ feedback }}
    </CFormFeedback>
    <CFormFeedback
      v-if="!invalid && valid"
      valid
    >{{ feedback }}
    </CFormFeedback>
    <CFormFeedback invalid>{{ feedbackInvalid }}</CFormFeedback>
    <CFormFeedback valid>{{ feedbackValid }}</CFormFeedback>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { CFormLabel, CFormFeedback } from '@coreui/vue'

const props = defineProps<{
  label?: string,
  valid?: boolean,
  invalid?: boolean,
  feedback?: string,
  feedbackValid?: string,
  feedbackInvalid?: string,
}>();
</script>

<style scoped>
/* CFormFeedback expects .is-invalid and .invalid-feedback as siblings but our usecase needs to also support parent/child */
.is-invalid .invalid-feedback, 
.is-valid .valid-feedback {
  display: block;
}

/* valid/invalid styles for multi-select */
.is-valid :deep(.multiselect__tags) {
    border-color: var(--cui-form-valid-border-color);
    padding-right: calc(1.5em + 0.75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%231b9e3e' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.1875rem) center;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.is-valid :deep(.multiselect__select), 
.is-invalid :deep(.multiselect__select) {
  z-index: 1;
  margin-right: calc(1.5em);
}
.is-valid :deep(.multiselect__clear), 
.is-invalid :deep(.multiselect__clear) {
  z-index: 1;
  margin-right: calc(1.5em);
}
.is-invalid :deep(.multiselect__tags) {
    border-color: var(--cui-form-invalid-border-color);
    padding-right: calc(1.5em + 0.75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23e55353'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23e55353' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.1875rem) center;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.is-valid :deep(.multiselect__tags):has(input:focus) {
    border-color: var(--cui-form-valid-border-color);
    box-shadow: 0 0 0 0.25rem rgba(var(--cui-success-rgb), 0.25);
}
.is-invalid :deep(.multiselect__tags):has(input:focus) {
    border-color: var(--cui-form-valid-border-color);
    box-shadow: 0 0 0 0.25rem rgba(var(--cui-danger-rgb), 0.25);
}
</style>
