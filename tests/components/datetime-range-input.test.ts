import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import DatetimeRangeInput from '../../src/components/datetime-range-input.vue'

describe('DatetimeRangeInput', () => {
  it('disables both datetime inputs when disabled', async () => {
    render(DatetimeRangeInput, {
      props: {
        label: 'Meeting',
        startDate: '2000-01-01T12:00:00.000Z',
        endDate: '2000-01-01T13:00:00.000Z',
        timezone: 'America/Montreal',
        disabled: true,
      },
    })

    const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('input[type="datetime-local"]'))
    expect(inputs).toHaveLength(2)
    expect(inputs.every((input) => input.disabled)).toBe(true)
  })
})
