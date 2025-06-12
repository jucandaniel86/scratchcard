import { __LOADED_RESOURCES } from '../config/Resources'

export const useDataEntry = (resource: string, key?: string | undefined) => {
  if (
    typeof __LOADED_RESOURCES[resource] !== 'undefined' &&
    typeof key === 'undefined'
  ) {
    return __LOADED_RESOURCES[resource]
  }
  if (
    typeof __LOADED_RESOURCES[resource] !== 'undefined' &&
    typeof key !== 'undefined'
  ) {
    return __LOADED_RESOURCES[resource][key]
  }
  return {}
}
