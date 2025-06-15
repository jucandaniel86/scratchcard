import { renderer, patchProp as defPathProp } from 'vue3-pixi'

//import custom elements
import VSpine from '../components/Core/VSpine'
import VParticles from '../components/Core/VParticles'
import VSpineButton from '../components/Core/VSpineButton'

export const useCustomElements = () => {
  //Register custom components
  renderer.use({
    name: 'VSpine',
    createElement: (props) => {
      // console.log('VSpine::props', props)
      return new VSpine(props.resource, props.settings)
    },
    patchProp(el: any, key: any, prevValue: any, nextValue: any) {
      return defPathProp(el, key, prevValue, nextValue)
    }
    // handle special prop here..
  })
  renderer.use({
    name: 'VParticles',
    createElement: (props) => {
      return new VParticles(props.texture, props.settings)
    },
    patchProp(el: any, key: any, prevValue: any, nextValue: any) {
      return defPathProp(el, key, prevValue, nextValue)
    }
  })

  renderer.use({
    name: 'VSpineButton',
    createElement: (props: any) => {
      return new VSpineButton(props)
    },
    patchProp(el: any, key: any, prevValue: any, nextValue: any) {
      return defPathProp(el, key, prevValue, nextValue)
    }
  })
}
