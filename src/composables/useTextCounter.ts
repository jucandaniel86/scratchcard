import { ref } from 'vue'

export const useTextCounter = () => {
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

  //callbacks
  let SetInterval: Function = (_iID?: any) => window.setInterval.bind(window)
  let ClearInterval: Function = (_iID?: any) =>
    window.clearInterval.bind(window)
  const onTickCallback = () => {}
  const onTickFinishCallback = () => {}
  const setIntervalClearFunction = (cb: Function) => (ClearInterval = cb)
  const setIntervalSetFunction = (cb: Function) => (SetInterval = cb)

  /**
   * @returns
   */
  const reset = () => {
    currentValue.value = 0
    endValue.value = 0
    isCounting.value = false
    ClearInterval(modelValue.value.intervalID)
  }

  const update = () => {}

  /**
   *
   * @param _currentValue
   * @returns
   */
  const setCurrentValue = (_currentValue: number) =>
    (currentValue.value = _currentValue)

  /**
   *
   * @param _maxTime
   * @returns
   */
  const setMaxTime = (_maxTime: number) => (modelValue.value.maxTime = _maxTime)

  const clearAnimationFrame = () => {}

  /**
   *
   * @param tick
   * @param timeStep
   * @param precision
   */
  const requestInterval = (
    callback: Function,
    timeStep: number,
    precision = 0.8
  ) => {
    let animationInterval: any = null
    let now = Date.now()
    let a = timeStep * precision
    let i = false

    animationInterval = window.requestAnimationFrame(function cb() {
      if (Date.now() - now >= a) {
        callback()
        now = Date.now()
      }

      if (!i) {
        animationInterval = window.requestAnimationFrame(cb)
      }
    })

    return {
      animationInterval,
      stop: () => {
        i = true
        window.cancelAnimationFrame(animationInterval)
      }
    }
  }

  /**
   *
   * @param _currentValue
   * @param _endValue
   * @param _step
   * @returns
   */
  const start = (_currentValue: number, _endValue: number, _step: number) => {}

  /**
   *
   * @param endValue
   * @param step
   * @returns
   */
  const startFromCurrent = (endValue: number, step: number) => {
    // return start(currentValue.value, endValue, step)
  }

  return {
    currentValue,
    isCounting,
    step,
    start,
    reset,
    setCurrentValue,
    setMaxTime,
    startFromCurrent
  }
}
