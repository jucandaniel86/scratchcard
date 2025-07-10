import { __LOADED_RESOURCES } from '../config/Resources'
import { ref } from 'vue'

export const useDataEntry = (resource: string, key?: string | undefined) => {
  const resources = ref<any>()
  if (
    typeof __LOADED_RESOURCES[resource] !== 'undefined' &&
    typeof key === 'undefined'
  ) {
    resources.value = __LOADED_RESOURCES[resource]
  }
  if (
    typeof __LOADED_RESOURCES[resource] !== 'undefined' &&
    typeof key !== 'undefined'
  ) {
    resources.value = __LOADED_RESOURCES[resource][key]
  }
  return resources.value
}
