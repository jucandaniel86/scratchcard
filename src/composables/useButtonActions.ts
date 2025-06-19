import { Container, Graphics, Sprite, Texture, Rectangle, Text } from 'pixi.js'
import { onMounted, ref, defineEmits } from 'vue'

type UseButtonActionsType = {
  texture: Texture
  onClick: (v: any) => void
}

export enum ButtonState {
  DOWN = 'down',
  UP = 'up',
  DISABLED = 'disabled',
  OVER = 'over'
}

const fontFamily = 'Roboto Condensed, Arial'

export const useButtonActions = ({
  texture,
  onClick
}: UseButtonActionsType) => {
  //models
  const buttonState = ref<ButtonState>(ButtonState.UP)
  const isDownState = ref<boolean>(false)
  const interactive = ref<boolean>(true)
  const container = ref<Container>(new Container())
  //states
  const upState = ref<Sprite>()
  const downState = ref<Sprite>()
  const overState = ref<Sprite>()
  const disabledState = ref<Sprite>()

  const onCreate = () => {
    isDownState.value = false
    upState.value = createUpState()
    downState.value = createDownState()
    overState.value = createOverState()
    disabledState.value = createDisabledState()
    container.value.addChild(disabledState.value)
    container.value.addChild(downState.value)
    container.value.addChild(overState.value)
    container.value.addChild(upState.value)
  }

  //methods
  const centerObject = (
    object1: Sprite | Container | Graphics,
    object2: Sprite | Container | Graphics
  ) => {
    object2.position.set(
      object1.width / 2 - object2.width / 2,
      object1.height / 2 - object2.height / 2
    )
  }

  const labelRender = (_text: Text, _style?: any) => {
    _text.style = { ..._style, fontFamily }
  }

  const createDisabledState = () => {
    const rectangle = new Rectangle(
      texture.frame.x + texture.orig.width / 2,
      texture.frame.y + texture.orig.height / 2,
      texture.orig.width / 2,
      texture.orig.height / 2
    )
    const _texture = new Texture(texture.baseTexture, rectangle)
    return Sprite.from(_texture.baseTexture)
  }

  const createOverState = () => {
    const rectangle = new Rectangle(
      texture.frame.x + texture.orig.width / 2,
      texture.frame.y,
      texture.orig.width / 2,
      texture.orig.height / 2
    )
    const _texture = new Texture(texture.baseTexture, rectangle)
    return Sprite.from(_texture.baseTexture)
  }

  const createDownState = () => {
    const rectangle = new Rectangle(
      texture.frame.x,
      texture.frame.y + texture.orig.height / 2,
      texture.orig.width / 2,
      texture.orig.height / 2
    )
    const _texture = new Texture(texture.baseTexture, rectangle)
    return Sprite.from(_texture.baseTexture)
  }

  const createUpState = () => {
    const rectangle = new Rectangle(
      texture.frame.x,
      texture.frame.y,
      texture.orig.width / 2,
      texture.orig.height / 2
    )
    const _texture = new Texture(texture.baseTexture, rectangle)
    return Sprite.from(_texture.baseTexture)
  }

  const onMouseDown = () => {
    isDownState.value = true
    buttonState.value = ButtonState.DOWN
    // switchToDownState()
  }

  const onMouseOver = () => {
    isDownState.value = false
    buttonState.value = ButtonState.OVER
    // switchToOverState()
  }

  const onMouseUpOutside = () => {
    isDownState.value = false
    buttonState.value = ButtonState.OVER
  }

  const setUpStateTexture = (_texture: Texture) =>
    (upState.value!.texture = _texture)
  const setDownStateTexture = (_texture: Texture) =>
    (downState.value!.texture = _texture)
  const setOverStateTexture = (_texture: Texture) =>
    (overState.value!.texture = _texture)
  const setDisabledStateTexture = (_texture: Texture) =>
    (disabledState.value!.texture = _texture)

  const onMouseOut = () => {}

  const enable = () => (interactive.value = true)

  const disable = () => (interactive.value = false)

  const isEnabled = () => interactive.value

  const makeInteractive = () => {
    enable()
    container.value.buttonMode = true
  }

  const setupListeners = () => {
    if ('ontouchstart' in window) {
      container.value.on('tap', onClick)
      container.value.on('touchstart', onMouseDown)
      container.value.on('touchendoutside', onMouseUpOutside)
      return
    }

    container.value.on('click', onClick)
    container.value.on('mousedown', onMouseDown)
    container.value.on('mouseupoutside', onMouseUpOutside)
    container.value.on('mouseout', onMouseOut)
    container.value.on('mouseover', onMouseOver)
  }

  const init = () => {
    onCreate()
    makeInteractive()
    setupListeners()
  }

  onMounted(() => {
    init()
  })

  return {
    container,
    buttonState,
    isDownState,
    init,
    enable,
    disable,
    isEnabled,
    setUpStateTexture,
    setDownStateTexture,
    setOverStateTexture,
    setDisabledStateTexture,
    makeInteractive,
    setupListeners,
    onCreate,
    centerObject,
    labelRender,
    createDisabledState,
    createOverState,
    createDownState,
    createUpState,
    onClick,
    onMouseDown,
    onMouseOver,
    onMouseUpOutside
  }
}
