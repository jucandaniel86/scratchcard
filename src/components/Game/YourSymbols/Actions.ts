import { ref } from 'vue'

interface CreateSymbolsI {
  locations: any[]
  onRevealStart: () => Promise<void>
  onRevealComplete: () => Promise<void>
}

export const useYourSymbolsActions = (symbols: any) => {
  const _symbols = ref<any>([])

  const createSymbols = ({
    locations,
    onRevealStart,
    onRevealComplete
  }: CreateSymbolsI) => {
    for (let i = 0; i < 10; i++) {
      _symbols.value.push({
        index: i,
        locations,
        onRevealStart,
        onRevealComplete
      })
    }
  }

  const enable = () => {
    _symbols.value.forEach((symbol: any) => {
      symbol.enable()
    })
  }

  const disable = () => {
    _symbols.value.forEach((symbol: any) => {
      symbol.disable()
    })
  }

  const reveal = (_index: number) => {
    _symbols.value[_index].reveal()
  }

  const getSymbols = () => _symbols.value

  const enableByIndexed = (_index: number) => {
    _symbols.value[_index].enable()
  }

  const playWinAll = (symbol: any) => {
    return symbols[symbol.index].value.playWinAll()
  }

  const playWinAllComplete = async () => {
    // const promises = symbols.map((symbol: any) => {
    // 	return symbol.
    // })
  }

  const playCTA = () => {
    symbols.value.map((symbol: any) => {
      symbol.playCTA()
    })
  }

  const stopCTA = () => {
    symbols.map((symbol: any) => {
      symbol.stopCTA()
    })
  }

  const playMultiplier = async (_symbols: any[]) => {
    const promises = _symbols.map((symbol: any) => {
      return symbols[symbol.index].value.playMultiplier(symbol)
    })

    return Promise.all(promises)
  }

  const playWinAnimation = async (_symbols: any[]) => {
    const promises = _symbols.map((symbol: any) => {
      return symbols[symbol.index].playWinAnimation(symbol)
    })

    return Promise.all(promises)
  }

  const revealAll = async (_symbols: any[]) => {
    const promises = _symbols.map((symbol: any) => {
      return symbols[symbol.index].value.reveal(symbol)
    })

    return Promise.all(promises)
  }

  return {
    createSymbols,
    playWinAll,
    playWinAllComplete,
    playCTA,
    stopCTA,
    playMultiplier,
    playWinAnimation,
    revealAll,
    enable,
    disable,
    reveal,
    getSymbols,
    enableByIndexed
  }
}
