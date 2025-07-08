import { Container, DisplayObject, Graphics, Text } from 'pixi.js'
import { ref } from 'vue'

type InteractiveObjectLocation = {
  x: number
  y: number
  width: number
  height: number
}

type InteractiveObjectProps = {
  disableHandler?: (id: string | number) => void
  enableHandler?: (id: string | number) => void
  pressHandler?: (id: string | number) => void
  pointerUpOutsideHandler?: (id: string | number) => void
  clickHandler?: (id: string | number) => void
  hoverOutHandler?: (id: string | number) => void
  hoverInHanlder?: (id: string | number) => void
}

export const useInteractiveObject = (props: InteractiveObjectProps) => {
  const isEnabled = ref<boolean>(false)
  const isPressedDown = ref<boolean>(false)
  const location = ref<InteractiveObjectLocation>()
  const id = ref<string | number>('')

  const hitArea = ref<DisplayObject | undefined>()

  //methods
  const init = (object: DisplayObject | Container | Graphics | Text) => {
    hitArea.value = object
    try {
      const position = hitArea.value.getGlobalPosition()
      location.value = {
        x: position.x,
        y: position.y,
        //@ts-ignore
        width: hitArea.value.width,
        //@ts-ignore
        height: hitArea.value.height
      }
    } catch (e) {}

    hitArea.value.interactive = true
    hitArea.value.buttonMode = true
    hitArea.value.cursor = 'pointer'

    setHandlers()
  }

  const getHitAreaLocation = () => location.value

  const disable = () => {
    isEnabled.value = false
    if (hitArea.value) {
      hitArea.value.interactive = false
    }

    if (typeof props.disableHandler === 'function') {
      props.disableHandler(id.value)
    }
  }

  const enable = () => {
    isEnabled.value = true
    if (hitArea.value) {
      hitArea.value.interactive = true
    }

    if (typeof props.enableHandler === 'function') {
      props.enableHandler(id.value)
    }
  }

  const setButtonMode = (buttonMode: boolean) => {
    if (hitArea.value) {
      hitArea.value.buttonMode = buttonMode
    }
  }

  const pointerPress = () => {
    isPressedDown.value = true
    if (typeof props.pressHandler === 'function') {
      props.pressHandler(id.value)
    }
  }

  const pointerUpOutside = () => {
    isPressedDown.value = false
    if (typeof props.pointerUpOutsideHandler === 'function') {
      props.pointerUpOutsideHandler(id.value)
    }
  }

  const pointerUp = () => {
    if (isPressedDown.value) {
      isPressedDown.value = false
    }
    if (typeof props.clickHandler === 'function') {
      props.clickHandler(id.value)
    }
  }

  const mouseOut = () => {
    if (typeof props.hoverOutHandler === 'function') {
      props.hoverOutHandler(id.value)
    }
  }

  const mouseOver = () => {
    if (typeof props.hoverInHanlder === 'function') {
      props.hoverInHanlder(id.value)
    }
  }

  const removeHandlers = () => {
    if (hitArea.value) {
      hitArea.value.removeAllListeners()
    }
  }

  const destroy = () => {
    removeHandlers()
  }

  const setVisible = () => {
    if (hitArea.value) {
      hitArea.value.visible = true
    }
  }

  const setInteractiveEvents = (
    object: any,
    pointerPress: any,
    pointerUp: any,
    pointerUpOutside: any,
    mouseOut: any,
    mouseOver: any
  ) => {
    'ontouchstart' in window
      ? (object.on('touchend', pointerUp),
        object.on('touchendoutside', pointerUpOutside),
        object.on('touchstart', pointerPress))
      : (object.on('mousedown', pointerPress),
        object.on('click', pointerUp),
        object.on('mouseout', mouseOut),
        object.on('mouseover', mouseOver),
        object.on('mouseupoutside', pointerUpOutside))
  }

  const setHandlers = () => {
    setInteractiveEvents(
      hitArea.value,
      pointerPress,
      pointerUp,
      pointerUpOutside,
      mouseOut,
      mouseOver
    )
  }

  return {
    hitArea: hitArea.value,
    init,
    getHitAreaLocation,
    disable,
    enable,
    setButtonMode,
    destroy,
    setVisible
  }
}
