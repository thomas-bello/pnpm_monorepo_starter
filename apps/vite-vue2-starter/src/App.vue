<!-- apps/vite-vue2-starter/src/App.vue -->
<template>
  <div>
    <div>Hello Vite Vue2, test @bello-osr/utils add func 1 + 1 = {{ a }}</div>
    <TestComp value="111" />
    <TestComp>2222</TestComp>
  </div>
</template>

<script>
import { add } from '@bello-osr/utils'
import { TestComp } from '@bello-osr/comp'

export default {
  components: {
    TestComp,
  },
  data() {
    return {
      a: add(1, 1),
    }
  },
}
</script>
