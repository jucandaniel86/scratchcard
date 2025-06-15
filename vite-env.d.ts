import { Texture } from 'pixi.js'
import { VSpineButtonType } from './src/components/Core/VSpineButton'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

type VSpinePosition = {
  x: number
  y: number
}

interface VSpineProps {
  resource: any
  settings?: {
    animation: string
    autoplay?: boolean
    visible?: boolean
    autoUpdate?: boolean
    alpha?: number
    skin?: string
    position?: VSpinePosition
  }
  // ...
}

interface VParticlesProps {
  texture: Texture
  settings?: any
  // ...
}

interface VSpineComponent {
  (props: VSpineProps): any
}

interface VParticlesComponent {
  (props: VParticlesProps): any
}

interface VSpineComponent {
  (props: VSpineButtonType): any
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    VSpine: VSpineComponent
    VParticles: VParticlesComponent
    VSpineButton: VSpineComponent
  }
}
export {}
