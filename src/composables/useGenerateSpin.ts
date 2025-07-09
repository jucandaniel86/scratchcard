//ticket number: 102606805700
const TOTAL_SYMBOLS = 10
const SYMBOL_MAX = 18
const MAX_WIN = 3
const BIG_WIN_PRIZE = 70
const MAX_MULTIPLIER = 5

export type SymbolType = {
  symbolID: number
  isWin: boolean
  prizeAmount: number | string
  finalPrizeAmount: number
  multiplier: number
  isMultiplier: boolean
  isWinAll: boolean
}

export const useGenerateSpin = () => {
  const toYourSymbol = (number: any, houseNumbers: number[]): SymbolType => {
    const isWin = houseNumbers.indexOf(number) !== -1
    return {
      symbolID: number,
      isWin,
      prizeAmount: isWin ? (Math.random() * MAX_WIN).toFixed(2) : 0,
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

  const parseYourSymbols = (
    numbers: any,
    houseNumbers: number[]
  ): SymbolType[] => {
    return numbers.map((symbol: number) => toYourSymbol(symbol, houseNumbers))
  }

  const generate = () => {
    const numbers = generateRandomNumbers()
    const houseNumbers = generateRandomNumbers(2)

    const houseSymbols = parseYourSymbols(houseNumbers, [])
    const yourSymbols = parseYourSymbols(numbers, houseNumbers)

    const gamePrize = yourSymbols.reduce((acc, obj) => {
      return (acc += obj.prizeAmount)
    }, 0 as any)
    const isBigWin = gamePrize > BIG_WIN_PRIZE
    console.log('TOTAL PRIZE', gamePrize)
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
