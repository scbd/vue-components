import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import DateRangeInput from '../../src/components/date-range-input.vue'

describe('DateRangeInput', () => {
  it('disables both date inputs when disabled', async () => {
    render(DateRangeInput, {
      props: {
        label: 'Publication',
        startDate: '2000-01-01',
        endDate: '2000-01-02',
        disabled: true,
      },
    })

    const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('input[type="date"]'))
    expect(inputs).toHaveLength(2)
    expect(inputs.every((input) => input.disabled)).toBe(true)
  })
})
