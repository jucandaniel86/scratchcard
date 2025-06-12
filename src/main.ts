import {
  appInjectKey,
  createApp,
  renderer,
  patchProp as defPathProp
} from 'vue3-pixi'
import { createPinia } from 'pinia'
import { Application } from 'pixi.js'
import App from './App.vue'
import './main.css'
//custom components
import VSpine from './components/Core/VSpine'
import VParticles from './components/Core/VParticles'

export const __PIXI_APP = new Application({
  antialias: true,
  transparent: true,
  resolution: window.devicePixelRatio,
  forceCanvas: false,
  width: 1250,
  height: 720
})

const pinia = createPinia()

document.body.appendChild(__PIXI_APP.view as any)
const app = createApp(App)

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

app.use(pinia)
app.provide(appInjectKey, __PIXI_APP)
app.mount(__PIXI_APP.stage)
