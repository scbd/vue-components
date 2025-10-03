<template>
  <div>
    <div class="row">
      <div class="col-6">
        <DateInput
          :label="`${label ? `${label}: ` : ''}Start Date`"
          v-model="startDate"
          :timezone="timezone"
          :required="required"
          :disabled="disabled"
          :max="endDate"
          :placeholder="placeholder"
        />
      </div>
      <div class="col-6">
        <DateInput
          label="End Date"
          v-model="endDate"
          :timezone="timezone"
          adjust-time="endOfDay"
          :required="required"
          :disabled="disabled"
          :min="startDate"
          :placeholder="placeholder"
        />
      </div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import DateInput from './date-input.vue';

const props = defineProps<{
  timezone?: string,
  label?: string,
  required?: boolean,
  disabled?: boolean,
  showTimezone?: boolean,
  placeholder?: string,
}>();

const startDate = defineModel<string | undefined>('startDate', { required: true });
const endDate = defineModel<string | undefined>('endDate', { required: true });
</script>