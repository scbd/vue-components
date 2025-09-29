<template>
  <div class="datetime-range">
    <div class="row range">
      <div class="col-6 start">
        <DatetimeInput
          :label="`${label ? `${label}: ` : ''}Start Date`"
          v-model="startDate"
          :timezone="timezone"
          :required="required"
          :disabled="disabled"
          :max="endDate"
        />
      </div>
      <div class="col-6 end">
        <DatetimeInput
          label="End Date"
          v-model="endDate"
          :timezone="timezone"
          :required="required"
          :disabled="disabled"
          :min="startDate"
        />
      </div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import DatetimeInput from './datetime-input.vue';

const props = defineProps<{
  timezone: string,
  label?: string,
  required?: boolean,
  disabled?: boolean,
  showTimezone?: boolean,
}>();

const startDate = defineModel<string | undefined>('startDate', { required: true });
const endDate = defineModel<string | undefined>('endDate', { required: true });
</script>

