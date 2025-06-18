import { defineStore } from 'pinia'
import { ref } from 'vue'

export type SymbolType = {
  finalPrizeAmount: number
  isMultiplier: boolean
  isWin: boolean
  isWinAll: boolean
  multiplier: number
  prizeAmount: number
  symbolID: string | number
}

type TicketType = {
  gamePrize: number
  isBigWin: boolean
  symbols: SymbolType[]
}

export const useGameStore = defineStore('game', () => {
  const spin = ref<TicketType>()

  const setSpin = (_ticket: TicketType) => {
    spin.value = _ticket
  }

  return {
    spin,
    setSpin
  }
})
