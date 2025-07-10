import { computed, ref } from 'vue'

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
  const stepEpsilon = ref<number>(0)
  const isForcedDecimal = ref<boolean>(false)
  let rafHandle: any = null

  //callbacks
  let SetInterval: Function = (_iID?: any) => window.setInterval.bind(window)
  let ClearInterval: Function = (_iID?: any) =>
    window.clearInterval.bind(window)
  let onTickCallback: Function = (
    _currentValue: number,
    _precision: number
  ) => {}
  let onTickFinishCallback: Function = () => {}
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

  /**
   * @returns {boolean}
   */
  const isFinished = computed(() => {
    return (
      (!modelValue.value.isCountingDown &&
        currentValue.value >= endValue.value) ||
      (modelValue.value.isCountingDown && currentValue.value <= endValue.value)
    )
  })

  /**
   *
   * @returns {boolean}
   */
  const update = () => {
    currentValue.value += step.value
    currentValue.value = Math.round(currentValue.value * 100000) / 100000

    if (isFinished.value) {
      return stop()
    }

    return onTickCallback(currentValue.value, modelValue.value.precision)
  }

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

  /**
   *
   * @param cb
   * @returns
   */
  const setTickCallback = (cb: Function) => (onTickCallback = cb)

  /**
   *
   * @param cb
   * @returns
   */
  const setTickFinishCallback = (cb: Function) => (onTickFinishCallback = cb)

  /**
   *
   * @param _timeStep
   * @returns
   */
  const setTimeStep = (_timeStep: number) =>
    (modelValue.value.timeStep = _timeStep)

  /**
   * @var counting
   */
  const counting = computed(() => isCounting.value)

  /**
   *
   * @param forcedDecimals
   * @param _stepEpsilon
   */
  const setKeepDecimals = (forcedDecimals: boolean, _stepEpsilon = 0.01) => {
    stepEpsilon.value = _stepEpsilon
    isForcedDecimal.value = forcedDecimals
  }

  const clearAnimationFrame = () => {
    if (rafHandle) {
      rafHandle.stop()
      rafHandle = null
    }
  }

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
    let elapsed = timeStep * precision
    let i = false

    animationInterval = window.requestAnimationFrame(function cb() {
      if (Date.now() - now >= elapsed) {
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
   * @param _arguments
   */
  const stop = (_arguments?: any) => {
    clearAnimationFrame()
    isCounting.value = false
    currentValue.value = endValue.value
    modelValue.value.precision = Number.isInteger(endValue.value) ? 0 : 2

    onTickCallback(endValue.value, modelValue.value.precision)
    onTickFinishCallback()

    if (typeof modelValue.value.resolver === 'function') {
      modelValue.value.resolver.apply(this, _arguments)
    }
  }

  /**
   *
   * @param _currentValue
   * @param _endValue
   * @param _step
   * @returns
   */
  const start = (_currentValue: number, _endValue: number, _step: number) => {
    clearAnimationFrame()
    isCounting.value = true
    endValue.value = _endValue

    if (!modelValue.value.isCountingDown && endValue.value === 0) {
      stop()
      return Promise.resolve()
    }

    step.value =
      (Math.abs(_currentValue - _endValue) / _step) *
        modelValue.value.timeStep <
      modelValue.value.maxTime
        ? _step
        : Math.abs(_currentValue - _endValue) /
          (modelValue.value.maxTime / modelValue.value.timeStep)

    step.value = Math.ceil(step.value)

    if (isForcedDecimal.value) {
      step.value += stepEpsilon.value
    }

    if (modelValue.value.isCountingDown) {
      step.value *= -1
    }

    modelValue.value.precision =
      Number.isInteger(step.value) && Number.isInteger(endValue.value) ? 0 : 2

    currentValue.value = _currentValue

    rafHandle = requestInterval(update, modelValue.value.timeStep)

    return new Promise((resolve) => {
      modelValue.value.resolver = resolve
    })
  }

  /**
   *
   * @param endValue
   * @param step
   * @returns
   */
  const startFromCurrent = (endValue: number, step: number) => {
    return start(currentValue.value, endValue, step)
  }

  return {
    currentValue,
    isCounting,
    step,
    counting,
    start,
    stop,
    reset,
    setCurrentValue,
    setTimeStep,
    setMaxTime,
    setKeepDecimals,
    setTickCallback,
    setTickFinishCallback,
    setIntervalClearFunction,
    startFromCurrent,
    setIntervalSetFunction
  }
}
