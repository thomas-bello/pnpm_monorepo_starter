// import { mount } from '@vue/test-utils'
import Comp from './index.vue'
import { describe, it, expect } from 'vitest'

// https://test-utils.vuejs.org/guide/
describe('src/TestComp/index.vue', () => {
  it('Comp', () => {
    expect(Comp).toBeDefined()
    // const wrapper = mount(Comp as any)
    // expect(wrapper.find('.btp-bg-video').exists()).toBe(true)
  })
})
