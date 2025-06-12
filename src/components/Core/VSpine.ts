import { Spine } from 'pixi-spine'
import { Container } from 'pixi.js'

type VSpinePosition = {
  x: number
  y: number
}

export interface VSpineInterface {
  animation: string
  autoplay?: boolean
  visible?: boolean
  autoUpdate?: boolean
  alpha?: number
  skin?: string
  position?: VSpinePosition
}

const DEFAULT_VSPINE_SETTINGS: VSpineInterface = {
  autoplay: true,
  visible: true,
  autoUpdate: true,
  alpha: 1,
  skin: 'default',
  position: { x: 0, y: 0 },
  animation: ''
}

class VSpine extends Container {
  constructor(resource: any, settings?: VSpineInterface) {
    super()
    this.name = 'SpineContainer'

    const currentSettings = { ...DEFAULT_VSPINE_SETTINGS, ...settings }

    const spine: any = new Spine(resource.spineData)
    spine.skeleton.setSkinByName('default')
    spine.skeleton.setSlotsToSetupPose()
    spine.visible = currentSettings.visible
    spine.position = currentSettings.position
    spine.alpha = currentSettings.alpha
    spine.scale.set(1)
    spine.autoUpdate = currentSettings.autoUpdate
    spine.state.setAnimation(0, settings?.animation, currentSettings.autoplay)
    this.addChild(spine)
  }
}

export default VSpine
