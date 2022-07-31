<template>
  <div>
    <TestComp value="11" />

    <TestComp>222</TestComp>
  </div>
</template>

<script lang="ts">
import { TestComp } from '@bello-osr/comp'

export default {
  name: 'BgVideoBaseDemo',
  components: {
    TestComp,
  },
}
</script>
