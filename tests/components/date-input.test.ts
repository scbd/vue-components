import { page } from '@vitest/browser/context'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import DateInput from '../../src/components/date-input.vue'

describe('DateInput', () => {
  it('updates its model when the user selects a date', async () => {
    let modelValue = '2000-01-01'

    render(DateInput, {
      attrs: {
        id: 'date-input',
      },
      props: {
        label: 'Date',
        modelValue,
        'onUpdate:modelValue': (value: string | null) => {
          modelValue = value ?? ''
        },
      },
    })

    const input = page.getByLabelText('Date')
    await expect.element(input).toHaveValue('2000-01-01')

    await input.fill('2025-06-15')

    expect(modelValue).toBe('2025-06-15')
  })
})
