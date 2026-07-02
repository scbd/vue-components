import { page } from '@vitest/browser/context'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import Select from '../../src/components/select.vue'

const options = [
  { label: 'One', value: 'one' },
  { label: 'Two', value: 'two' },
]

describe('Select', () => {
  it('disables the select and its selection actions when disabled', async () => {
    render(Select, {
      props: {
        label: 'Choice',
        modelValue: ['one'],
        options,
        multiple: true,
        disabled: true,
      },
    })

    await expect.element(page.getByRole('textbox')).toBeDisabled()
    await expect.element(page.getByText('×')).not.toBeInTheDocument()
    expect(document.querySelector('.multiselect__tag-icon')?.getAttribute('tabindex')).toBe('-1')
  })
})
