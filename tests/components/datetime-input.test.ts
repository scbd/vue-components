import { page } from '@vitest/browser/context'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import DatetimeInput from '../../src/components/datetime-input.vue'

describe('DatetimeInput', () => {
  it('disables the datetime input when disabled', async () => {
    render(DatetimeInput, {
      props: {
        label: 'Meeting',
        modelValue: '2000-01-01T12:00:00.000Z',
        timezone: 'America/Montreal',
        disabled: true,
      },
    })

    await expect.element(page.getByPlaceholder('Select date and time')).toBeDisabled()
  })
})
