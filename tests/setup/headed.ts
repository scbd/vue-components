import { afterEach } from 'vitest'

// Gives you a moment to see each test's final state before the next one starts.
afterEach(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
})
