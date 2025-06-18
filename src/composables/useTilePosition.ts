import { tryOnScopeDispose } from '@vueuse/core'
import { ticker } from 'pixi.js'
import { ref } from 'vue'

export function useTilePosition(speed = 1) {
  const x = ref(0)

  function update(dt: number) {
    x.value += dt * 3.5 * speed
  }

  ticker.shared.add(update)

  tryOnScopeDispose(() => ticker.shared.remove(update))

  return x
}
