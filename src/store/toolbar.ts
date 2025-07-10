import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DEFAULT_DEMO_BALANCE, DEFAULT_TICKET_PRIZE } from '../config/App'

export const useToolbarStore = defineStore('toolbar', () => {
  const balance = ref<number>(DEFAULT_DEMO_BALANCE)
  const win = ref<number>(0)
  const bet = ref<number>(DEFAULT_TICKET_PRIZE)

  const setBalance = (_balance: number) => (balance.value = _balance)
  const setWin = (_win: number) => (win.value = _win)
  const setBet = (_bet: number) => (bet.value = _bet)
  const addToBalance = (_val: number) => (balance.value = balance.value + _val)
  const decreaseBalance = (_val: number) =>
    (balance.value = balance.value - _val)

  return {
    balance,
    win,
    bet,
    setBalance,
    setWin,
    setBet,
    addToBalance,
    decreaseBalance
  }
})
