<script lang="ts">
import { defineComponent } from 'vue-demi'

import { getSlot, getH } from '../utils/h-demi'

// 建议使用 render 的模式编写组件 这样在vue2 和 vue3 兼容层面会更简单一点
// vue2 render https://cn.vuejs.org/v2/guide/render-function.html
// vue3 render https://staging-cn.vuejs.org/guide/extras/render-function.html
// vue3 setup 组合式函数 https://staging-cn.vuejs.org/guide/reusability/composables.html#extracting-composables-for-code-organization

export default defineComponent({
  name: 'TestComp',
  props: {
    value: {
      type: String,
    },
  },

  render(createElement: any) {
    // const slot = this.$slots.default ? runSlot(this.$slots.default) : []
    const h = getH(createElement)
    const slot = getSlot(this)
    const { value } = this

    return h('div', [h('div', value || slot || [])])
  },
})
</script>
