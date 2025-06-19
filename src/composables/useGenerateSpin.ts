//ticket number: 102606805700
const TOTAL_SYMBOLS = 10
const SYMBOL_MAX = 18
const MAX_WIN = 100
const BIG_WIN_PRIZE = 70
const MAX_MULTIPLIER = 5

export type SymbolType = {
  symbolID: number
  isWin: boolean
  prizeAmount: number
  finalPrizeAmount: number
  multiplier: number
  isMultiplier: boolean
  isWinAll: boolean
}

export const useGenerateSpin = () => {
  const toYourSymbol = (number: any): SymbolType => {
    return {
      symbolID: number,
      isWin: false,
      prizeAmount: Math.floor(Math.random() * MAX_WIN),
      finalPrizeAmount: Math.floor(Math.random() * MAX_WIN),
      multiplier: Math.floor(Math.random() * MAX_MULTIPLIER),
      isMultiplier: false,
      isWinAll: false
    }
  }

  const generateRandomNumbers = (maxSymbols = TOTAL_SYMBOLS) => {
    let numbers: number[] = []
    while (numbers.length < maxSymbols) {
      const number = Math.floor(Math.random() * SYMBOL_MAX) + 1
      if (numbers.indexOf(number) === -1) {
        numbers.push(number)
      }
    }
    return numbers
  }

  const parseYourSymbols = (numbers: any) => {
    return numbers.map(toYourSymbol)
  }

  const generate = () => {
    const numbers = generateRandomNumbers()
    const houseNumbers = generateRandomNumbers(2)

    const gamePrize = Math.floor(Math.random() * MAX_WIN)
    const isBigWin = gamePrize > BIG_WIN_PRIZE
    const houseSymbols = parseYourSymbols(houseNumbers)
    const yourSymbols = parseYourSymbols(numbers)

    return {
      gamePrize,
      isBigWin,
      houseSymbols,
      yourSymbols
    }
  }

  return {
    generate
  }
}
