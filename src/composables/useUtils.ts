export const useUtils = () => {
  const wait = (_seconds: number): Promise<void> => {
    const seconds = !_seconds ? 0 : _seconds
    return new Promise((resolve: any) => {
      setTimeout(resolve, seconds)
    })
  }

  const getRandomInt = (_min: number, _max: number) => {
    return ~~(Math.random() * (_max - _min + 1)) + _min
  }

  const getRandomColor = () => {
    for (var t = '#', e = 0; e < 6; e++)
      t += '0123456789ABCDEF'[Math.round(16 * Math.random())]
    return t
  }

  const pick = (_arr: any[]) => {
    return _arr[getRandomInt(0, _arr.length - 1)]
  }

  return {
    wait,
    pick,
    getRandomInt,
    getRandomColor
  }
}
