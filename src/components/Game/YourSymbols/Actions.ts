export const useYourSymbolsActions = (symbols: any) => {
  const enable = () => {
    symbols.forEach((symbol: any) => {
      symbol.enable()
    })
  }

  const disable = () => {
    symbols.forEach((symbol: any) => {
      symbol.disable()
    })
  }

  const reveal = (_index: number) => {
    symbols[_index].reveal()
  }

  const getSymbols = () => symbols

  const enableByIndexed = (_index: number) => {
    symbols[_index].enable()
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
    console.log('SYMBOLS', symbols)
    symbols.map((symbol: any) => {
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
