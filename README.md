# vue-components
A collection of reusable Vue 3 base components designed for seamless integration across Vue and Nuxt applications. Built with composition API and TypeScript support, these components provide a solid foundation for consistent UI development while maintaining flexibility and customization options.

## Installation

Install libs:
- The github project directly: `yarn add GIT_REPO_URL`
- Coreui peer dependencies: `yarn add @coreui/coreui @coreui/icons @coreui/icons-vue @coreui/utils @coreui/vue`

Import component and style:
```
// a-page-or-component.vue

import { DateInput } from '@scbd/vue-components'
import '@scbd/vue-components/style.css'

const date = '1999-12-31'

...

<Template>
  <DateInput v-model="date" label="Party like it's" />
  ...
```

...or configure `main.ts` in a Vue project to use with auto-import:
```
// main.ts

import ...
import VueComponents from '@scbd/vue-components'
import '@scbd/vue-components/style.css'
...

createApp(App)
  ...
  .use(VueComponents)
  ...
  .mount('#app')
```

...or add a plugin in a Nuxt project to use with auto-import:
```
// app/plugins/scbd-vue-components.ts

import { defineNuxtPlugin } from '#app'
import VueComponents from '@scbd/vue-components'
import '@scbd/vue-components/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueComponents)
})
```
