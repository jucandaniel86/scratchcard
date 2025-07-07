import { ref, watch } from 'vue'

type GameDataType = {
  houseSymbols: any[]
  yourSymbols: any[]
}
type SymbolType = {
  index: number
  isRevealed: boolean
  isWin?: boolean
  symbolID: string | number
  isWinAll?: boolean
  winAllSymbol?: any
  isMultiplier?: boolean
}

enum SymbolTypeEnum {
  HOUSE = 'house',
  YOURS = 'yours'
}

interface RevealListI {
  houseToRevealData: SymbolType[]
  houseMatchesData: SymbolType[]
  yourToRevealData: SymbolType[]
  yourMatchesData: SymbolType[]
}

type GameAreaStateType = {
  data: RevealListI
  state: any
}

export const useGameArea = () => {
  //states
  const state = ref({
    isWinAll: false,
    isAllCompleted: false,
    isHouseCompleted: false,
    isYourCompleted: false
  })
  const revealList = ref<RevealListI>({
    houseToRevealData: [],
    houseMatchesData: [],
    yourToRevealData: [],
    yourMatchesData: []
  })
  const yourSymbols = ref<SymbolType[]>([])
  const houseSymbols = ref<SymbolType[]>([])
  const resolvedSymbolIDs = ref<any[]>([])

  const resetState = () => {
    state.value = {
      isWinAll: false,
      isAllCompleted: false,
      isHouseCompleted: false,
      isYourCompleted: false
    }
  }

  const createSymbolItem = (_symbol: any, index: number) => ({
    ..._symbol,
    index,
    isRevealed: false
  })

  const setSymbolsData = (_payload: GameDataType) => {
    resetState()
    houseSymbols.value = _payload.houseSymbols.map(createSymbolItem)
    yourSymbols.value = _payload.yourSymbols.map(createSymbolItem)
    resolvedSymbolIDs.value = []
  }

  const createRevealLists = () => {
    revealList.value = {
      houseToRevealData: [],
      houseMatchesData: [],
      yourToRevealData: [],
      yourMatchesData: []
    }

    return {
      houseToRevealData: [],
      houseMatchesData: [],
      yourToRevealData: [],
      yourMatchesData: []
    }
  }

  const getHouseRevealedMatches = (symbolID: string | number): SymbolType[] => {
    return houseSymbols.value.filter(
      (el) => el.isRevealed && el.symbolID === symbolID
    )
  }

  const getYourRevealedMatches = (symbolID: string | number): SymbolType[] => {
    return yourSymbols.value.filter(
      (el) => el.isWin && el.isRevealed && el.symbolID === symbolID
    )
  }

  const isSymbolsTypeCompleted = (symbolType: SymbolTypeEnum) => {
    return (
      symbolType === SymbolTypeEnum.HOUSE
        ? houseSymbols.value
        : yourSymbols.value
    ).every((symbol) => symbol.isRevealed)
  }

  const updateState = (winAll: any) => {
    state.value.isWinAll = winAll
    state.value.isYourCompleted = isSymbolsTypeCompleted(SymbolTypeEnum.YOURS)
    state.value.isHouseCompleted = isSymbolsTypeCompleted(SymbolTypeEnum.HOUSE)
    state.value.isAllCompleted =
      state.value.isYourCompleted && state.value.isHouseCompleted
  }

  const updateStateOnComplete = (t: boolean) => {
    state.value.isWinAll = t
    state.value.isYourCompleted = true
    state.value.isHouseCompleted = true
    state.value.isAllCompleted = true
  }

  const setYourSymbolRevealed = (symbolIndex: number) => {
    createRevealLists()
    const symbol: SymbolType = yourSymbols.value[symbolIndex]

    yourSymbols.value[symbolIndex].isRevealed = true
    revealList.value.yourToRevealData.push(symbol)

    if (symbol.isWin) {
      revealList.value.houseMatchesData = getHouseRevealedMatches(
        symbol.symbolID
      )
    }
    if (revealList.value.houseMatchesData.length) {
      revealList.value.yourMatchesData.push(symbol)
      resolvedSymbolIDs.value.push(symbol.symbolID)
    }

    const newState = revealList.value.yourToRevealData.some(
      (symbol) => symbol.isWinAll
    )

    updateState(newState)

    return {
      state: state.value,
      data: revealList
    }
  }

  const setHouseSymbolRevealed = (symbolIndex: number) => {
    createRevealLists()
    const symbol = houseSymbols.value[symbolIndex]

    houseSymbols.value[symbolIndex].isRevealed = true
    revealList.value.houseToRevealData.push(symbol)
    revealList.value.yourMatchesData = getYourRevealedMatches(symbol.symbolID)

    if (revealList.value.yourMatchesData.length) {
      resolvedSymbolIDs.value.push(symbol.symbolID)
    }
    revealList.value.houseMatchesData = [symbol]

    updateState([])

    return {
      state: state.value,
      data: revealList
    }
  }

  const setWinAll = () => {
    createRevealLists()
    revealList.value.yourToRevealData = yourSymbols.value.filter(
      (el) => !el.isRevealed
    )
    revealList.value.houseToRevealData = houseSymbols.value.filter(
      (el) => !el.isRevealed
    )
    updateStateOnComplete(true)
  }

  const getWinAllData = () => {
    return yourSymbols.value.reduce(
      (prev: any, next) => {
        return (
          next.isWinAll
            ? (prev.winAllSymbol = next)
            : prev.otherSymbols.push(next),
          prev
        )
      },
      {
        winAllSymbol: null,
        otherSymbols: []
      }
    )
  }

  const setAllRevealed = (): GameAreaStateType => {
    const newState = createRevealLists()

    if (
      ((newState.yourToRevealData = yourSymbols.value.filter(
        (el: SymbolType) => !el.isRevealed
      ) as any),
      (newState.houseToRevealData = houseSymbols.value.filter(
        (el: SymbolType) => !el.isRevealed
      ) as any),
      newState.yourToRevealData.some((el: SymbolType) => el.isWinAll))
    ) {
      return setWinAll()
    }

    newState.yourMatchesData = newState.yourToRevealData.filter(
      (_symbol: SymbolType) => {
        return _symbol.isWin && !_symbol.isMultiplier
      }
    )

    if (newState.yourMatchesData && newState.houseToRevealData.length) {
      newState.yourMatchesData = newState.houseToRevealData.reduce(
        (previousValue: SymbolType, currentValue: SymbolType) => {
          const check = yourSymbols.value.filter((_symbol) => {
            _symbol.symbolID === currentValue.symbolID && _symbol.isRevealed
          })
          return [...previousValue, ...check]
        },
        newState.yourMatchesData
      )
      if (newState.yourMatchesData.length) {
        const check = [
          ...new Set(
            newState.yourMatchesData.map((_el: SymbolType) => _el.symbolID)
          ),
          ...resolvedSymbolIDs.value
        ]
        newState.houseMatchesData = houseSymbols.value.filter((_symbol) => {
          return check.includes(_symbol.symbolID)
        })
      }
    }

    updateStateOnComplete(true)
    return {
      state: state.value,
      data: newState
    }
  }

  const getUnrevealedSymbolsIndexes = (symbols: SymbolType[]) => {
    return symbols.filter((el) => !el.isRevealed).map((el) => el.index)
  }

  const getHouseUnrevealedIndexes = () => {
    return getUnrevealedSymbolsIndexes(houseSymbols.value)
  }

  const getYourUnrevealedIndexes = () => {
    return getUnrevealedSymbolsIndexes(yourSymbols.value)
  }

  watch(state, () => {
    console.log('new state', state.value)
  })

  return {
    state,
    yourSymbols,
    houseSymbols,
    resetState,
    setSymbolsData,
    setYourSymbolRevealed,
    setHouseSymbolRevealed,
    setWinAll,
    getWinAllData,
    setAllRevealed,
    getUnrevealedSymbolsIndexes,
    getHouseUnrevealedIndexes,
    getYourUnrevealedIndexes
  }
}
