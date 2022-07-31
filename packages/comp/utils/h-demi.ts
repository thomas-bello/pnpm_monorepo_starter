import { h as hDemi, isVue2, SetupContext } from 'vue-demi'

interface Options {
  props?: any
  domProps?: any
  on?: any
}

const adaptOnsV3 = (ons: any) => {
  if (!ons) return null
  return Object.entries(ons).reduce((ret, [key, handler]) => {
    key = key.charAt(0).toUpperCase() + key.slice(1)
    key = `on${key}`
    return { ...ret, [key]: handler }
  }, {})
}

const h = (type: string | any, options: Options & any = {}, chidden?: any) => {
  if (isVue2) return hDemi(type, options, chidden)

  const { props, attrs, domProps, on, ...extraOptions } = options

  const ons = adaptOnsV3(on)
  const params = { ...extraOptions, ...props, ...attrs, ...domProps, ...ons }
  return hDemi(type, params, chidden)
}

export const runSlot = (defaultSlots: any, def?: any[]) => {
  if (typeof defaultSlots == 'function') return defaultSlots()
  return defaultSlots || def
}

export const getSlot = (cxt: SetupContext | any, slotName = 'default', def?: any[]) => {
  const slot = (cxt?.$slots || cxt?.slots || {})[slotName]
  return runSlot(slot, def)
}

export const getH = (createElement: any) => {
  return isVue2 ? createElement : h
}

export default h
