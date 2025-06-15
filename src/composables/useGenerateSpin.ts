/**
 * [CARD EXAMPLE]
 * 
 * <S2C xmlns:json='http://james.newtonking.com/projects/json' 
IUA="neow">  <RESULT>
<CODE>0</CODE>
<BTMID>7SxQ7nl5YkGO08CJJd9ZRQ</BTMID>
  </RESULT>





  <IsGameCompletionRequired>0</IsGameCompletionRequired>
  <BetTransactionId>0</BetTransactionId>
  <CARD>
     <SNO>102606805700</SNO>
     <ISNO>102606805700</ISNO>
     <BB>99.00</BB>
     <BA>99.50</BA>
     <GBB>0.00</GBB>
     <GBA>0.00</GBA>
     <PRZ>0.50</PRZ>
     <TBA>0.50</TBA>
     <RFGC></RFGC>
     <BTR>1=0.50^0^10,9^0-17-R-1=10.00=10.00;0-6-R-1=5.00=5.00;0-2-R-1=10.00=10.00;0-11-R-1=7.50=7.50;0-14-R-1=20.00=20.00;0-4-R-1=50.00=50.00;0-13-R-1=50.00=50.00;0-18-R-1=100.00=100.00;1-9-R-1=0.50=0.50;0-5-R-1=100.00=100.00^-</BTR>
     <GAV>3.01</GAV>


<CustomInfo></CustomInfo>
  </CARD>


//1 - 18
</S2C>

   e = '^',
        r = '-',
        i = ';',
        o = ',',
        a = '=',
 * 
 */

const TOTAL_SYMBOLS = 10
const SYMBOL_MAX = 18
const MAX_WIN = 100
const BIG_WIN_PRIZE = 70
const MAX_MULTIPLIER = 5

export const useGenerateSpin = () => {
  const toYourSymbol = (number: any) => {
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

  const generateRandomNumbers = () => {
    let numbers: number[] = []
    while (numbers.length < TOTAL_SYMBOLS) {
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
    const gamePrize = Math.floor(Math.random() * MAX_WIN)
    const isBigWin = gamePrize > BIG_WIN_PRIZE
    const houseSymbols: any[] = []
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
