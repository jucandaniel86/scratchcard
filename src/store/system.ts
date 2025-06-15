import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GAME_NAME } from '../config/App'

export const useSystemStore = defineStore(
  'system',
  () => {
    const omitSplashScreen = ref<boolean>(false)

    return {
      omitSplashScreen
    }
  },
  {
    persist: {
      key: `${GAME_NAME.toLowerCase().split(' ').join('_')}.system`
    }
  }
)
