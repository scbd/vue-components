import { page } from '@vitest/browser/context'
import * as icons from '@coreui/icons'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import MultiLanguageInput from '../../src/components/multi-language-input.vue'

const global = { provide: { icons } }

describe('MultiLanguageInput', () => {
  it('updates its model when the user types in a language input', async () => {
    let modelValue: Record<string, string> | undefined = undefined

    render(MultiLanguageInput, {
      global,
      props: {
        label: 'Name',
        modelValue,
        'onUpdate:modelValue': (value: Record<string, string>) => {
          modelValue = value
        },
      },
    })

    const input = page.getByPlaceholder('English')
    await input.fill('Hello')

    expect(modelValue).toEqual({ en: 'Hello' })
  })

  it('disables every language input when disabled', async () => {
    render(MultiLanguageInput, {
      global,
      props: {
        label: 'Name',
        disabled: true,
      },
    })

    const input = page.getByPlaceholder('English')
    await expect.element(input).toBeDisabled()
  })

  it('can expand and collapse while disabled', async () => {
    render(MultiLanguageInput, {
      global,
      props: {
        label: 'Name',
        disabled: true,
      },
    })

    const expandToggle = document.querySelector('.multi-language-input .expand') as HTMLElement
    expandToggle.click()

    await expect.element(page.getByPlaceholder('Español')).toBeDisabled()

    expandToggle.click()

    await expect.element(page.getByPlaceholder('Español')).not.toBeInTheDocument()
  })
})
