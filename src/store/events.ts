import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { GameEvents } from '../types/Events'

export const useEventsStore = defineStore('events', () => {
  const events = ref<any>({})
  const currentEvent = ref<GameEvents>()

  const emit = (event: GameEvents, payload?: any) => {
    currentEvent.value = event

    if (!events.value || typeof events.value[event] === 'undefined')
      return false

    events.value[currentEvent.value as any].listeners.forEach(
      (listener: any) => {
        if (listener) {
          listener(payload)
        }
      }
    )
  }

  const on = (event: GameEvents, cb: Function) => {
    if (typeof events.value[event] === 'undefined') {
      events.value[event] = { listeners: [] }
    }

    events.value[event].listeners.push(cb)
  }

  const once = (event: GameEvents, payload?: any) => {
    currentEvent.value = event

    if (!events.value || typeof events.value[event] === 'undefined')
      return false

    if (
      typeof events.value[currentEvent.value as any].listeners[0] !==
      'undefined'
    ) {
      events.value[currentEvent.value as any].listeners[0](payload)
    }

    events.value[currentEvent.value as any].listeners = []
  }

  return {
    emit,
    on,
    once
  }
})
