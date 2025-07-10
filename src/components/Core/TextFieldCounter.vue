<script setup lang="ts">
import { ref } from 'vue'

type TextFieldCounterType = {
  id?: string | number
  text: string
}
const props = withDefaults(defineProps<TextFieldCounterType>(), {
  id: `Counter${new Date().getTime()}`
})

//models
const modelValue = ref({
  precision: 0,
  isCountingDown: false,
  intervalID: null,
  maxTime: 2019,
  timeStep: 50,
  resolver: (_payload: any) => {},
  clearInterval: () => window.clearInterval.bind(window),
  setInterval: window.setInterval.bind(window)
})
const currentValue = ref<number>(0)
const endValue = ref<number>(0)
const isCounting = ref<boolean>(false)
const step = ref<number>(0)

let cbClearInterval: Function = (_intervalID: any) =>
  window.clearInterval.bind(window)
let cbSetInterval: Function = (_intervalID: any) =>
  window.setInterval.bind(window)

//methods
const onTickCallback = () => {}
const onTickFinishCallback = () => {}
const setIntervalClearFunction = (cb: Function) => (cbClearInterval = cb)
const setIntervalSetFunction = (cb: Function) => (cbSetInterval = cb)
const update = () => {}
const setCurrentValue = (_currentValue: number) =>
  (currentValue.value = _currentValue)
const start = (_currentValue: number, _endValue: number, _step: number) => {
  cbClearInterval(modelValue.value.intervalID)
  isCounting.value = true
  endValue.value = _endValue

  if (modelValue.value.isCountingDown || _endValue !== 0) {
    step.value =
      (Math.abs(_currentValue - _endValue) / _step) *
        modelValue.value.timeStep <
      modelValue.value.maxTime
        ? step.value
        : Math.abs(_currentValue - _endValue) /
          (modelValue.value.maxTime / modelValue.value.timeStep)
    step.value = Math.ceil(step.value)

    if (modelValue.value.isCountingDown) {
      step.value *= -1
    }
    modelValue.value.precision =
      Number.isInteger(step.value) && Number.isInteger(endValue.value) ? 0 : 2

    currentValue.value = _currentValue
    modelValue.value.intervalID = cbSetInterval(
      update,
      modelValue.value.timeStep
    )

    return new Promise((resolve) => (modelValue.value.resolver = resolve))
  }

  stop()
  return Promise.resolve()
}

const reset = () => {
  currentValue.value = 0
  endValue.value = 0
  isCounting.value = false
  cbClearInterval(modelValue.value.intervalID)
}
</script>
<template></template>
