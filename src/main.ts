import { appInjectKey, createApp } from 'vue3-pixi'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'
import { Application } from 'pixi.js'
import App from './App.vue'

//import css
import './main.css'

//import config
import { ConfigResolutions } from './config/App'

//import composables
import { useScaleManager } from './composables/useScaleManager'
import { useCustomElements } from './composables/useCustomElements'
import { useMetaData } from './composables/useMetaData'

export const __PIXI_APP = new Application({
  antialias: true,
  transparent: true,
  // resolution: window.devicePixelRatio,
  // forceCanvas: false
  width: ConfigResolutions.landscape.width,
  height: ConfigResolutions.landscape.height
})

const pinia = createPinia()
const { observe } = useScaleManager()
const { init } = useMetaData()

//@ts-ignore
document.querySelector('#game-panel').appendChild(__PIXI_APP.view as any)
const app = createApp(App)

useCustomElements()
init()

///width: 1280px; height: 720px; margin-left: 245px; margin-top: 0px; transform: scale(0.741124, 0.741124);

//@ts-ignore
observe(
  //@ts-ignore
  document.querySelector('#game-panel'),
  document.querySelector('#game-container')
)

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.provide(appInjectKey, __PIXI_APP)
app.mount(__PIXI_APP.stage)
