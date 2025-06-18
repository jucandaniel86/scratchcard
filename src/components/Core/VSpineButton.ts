import { Container, TextStyle, Text } from 'pixi.js'
import { Spine } from 'pixi-spine'

type VSpineButtonStatesData = {
  animationID: string
  loop: boolean
  style: TextStyle
}

export type VSpineButtonType = {
  spineData: any
  label: string
  onClick: () => void
  statesData: {
    normal: VSpineButtonStatesData
    pressed: VSpineButtonStatesData
    hover: VSpineButtonStatesData
    disabled: VSpineButtonStatesData
  }
}

class VSpineButton extends Container {
  statesData: any
  spine: any
  labelText!: Text

  constructor({ spineData, label, statesData }: VSpineButtonType) {
    super()
    this.name = 'VSpineButton'

    this.spine = new Spine(spineData)
    this.spine.autoUpdate = true

    this.statesData = statesData

    //button mode
    this.interactive = true
    this.buttonMode = true
    this.cursor = 'pointer'

    //actions
    this.on('pointerup', this.pointerUp)
    this.on('pointerdown', this.pointerDown)
    this.on('pointerover', this.pointerOver)
    this.on('pointerout', this.pointerOut)

    //label
    this.addLabel(label)

    this.addChild(this.spine, this.labelText)
  }

  addLabel(_label: string) {
    const defaultLabelStyles = this.hasState('normal')
      ? this.statesData['normal'].style
      : {}

    let labelSprite = new Container()

    this.labelText = new Text(_label)
    this.labelText.anchor.set(0.5)
    this.labelText.style = defaultLabelStyles

    labelSprite.addChild(this.labelText)
    labelSprite.width = 100
    labelSprite.y = 76

    return labelSprite
  }

  private hasState(_state: string) {
    return typeof this.statesData[_state] !== 'undefined'
  }

  pointerUp() {
    if (this.hasState('pressed')) {
      this.labelText.style = this.statesData.pressed.style
      this.spine.state.setAnimation(
        0,
        this.statesData.pressed.animationID,
        this.statesData.pressed.loop
      )
    }
  }

  pointerDown() {
    if (this.hasState('down')) {
      this.labelText.style = this.statesData.down.style
      this.spine.state.setAnimation(
        0,
        this.statesData.down.animationID,
        this.statesData.down.loop
      )
    }
  }

  pointerOver() {
    if (this.hasState('hover')) {
      this.labelText.style = this.statesData.hover.style
      this.spine.state.setAnimation(
        0,
        this.statesData.hover.animationID,
        this.statesData.hover.loop
      )
    }
  }

  pointerOut() {
    if (this.hasState('normal')) {
      this.labelText.style = this.statesData.normal.style
      this.spine.state.setAnimation(
        0,
        this.statesData.normal.animationID,
        this.statesData.normal.loop
      )
    }
  }
}

export default VSpineButton
