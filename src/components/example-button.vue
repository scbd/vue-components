<script lang="ts">
export type ExampleButtonMessage = 'Hello' | 'Allo' | 'Hola';
</script>

<script
  setup
  lang="ts"
>
import { CButton } from '@coreui/vue'

const props = withDefaults(defineProps<{
  msg?: ExampleButtonMessage,
}>(), 
{
  msg: 'Hello',
});
</script>

<template>
  <CButton
    color="primary"
    variant="outline"
    class="d-flex align-items-center"
  >
      <img
        src="../assets/vue.svg"
        class="logo vue"
      />
      <img
        src="../assets/vite.svg"
        class="logo vite"
      />
      {{ msg }}
  </CButton>
</template>

<style scoped>
.logo {
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 0.25rem;
}
button .logo.vite {
  display: none;
}
button:hover .logo.vite {
  display: block;
}
button:hover .logo.vue {
  display: none;
}  
</style>