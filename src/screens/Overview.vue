<script setup lang="ts">
import { ref, reactive } from 'vue'
import { __LOADED_RESOURCES } from '../config/Resources'
import { useAppStore } from '../store/app'
import { ScreenOrientationEnum } from '../config/App'
import DoubleSprite from '../components/UI/DoubleSprite.vue'
import { useDataEntry } from '../composables/useDataEntry'
import Checkbox from '../components/UI/Checkbox.vue'
import { useSystemStore } from '../store/system'

const layout = useDataEntry('splash_screen_layout')
const textStyles = useDataEntry('text_styles')
const store = useAppStore()
const sysStore = useSystemStore()
const orientation = ref<ScreenOrientationEnum>(store.orientation)

//continue btn config
const buttonStates = reactive({
  normal: {
    animationID: 'up',
    loop: true,
    style: textStyles.Continue_over
  },
  pressed: {
    animationID: 'press',
    loop: false,
    style: textStyles.Continue_over
  },
  hover: {
    animationID: 'over',
    loop: true,
    style: textStyles.Continue_over
  },
  disabled: {
    animationID: 'disabled',
    loop: false,
    style: textStyles.Continue_over
  }
})

const emitters = defineEmits(['changeScreen'])

const continueAction = () => {
  emitters('changeScreen')
}

const checkedAction = ({ state }: any) => {
  sysStore.omitSplashScreen = state
}

store.$subscribe(() => {
  orientation.value = store.orientation
})
</script>
<template>
  <DoubleSprite
    :portrait="__LOADED_RESOURCES.splashVertical"
    :landscape="__LOADED_RESOURCES.splashHorizontal"
    :layout="layout.background"
  />
  <DoubleSprite
    :portrait="__LOADED_RESOURCES.logoVert"
    :landscape="__LOADED_RESOURCES.logoHorz"
    :layout="layout.logo"
    :anchor="0.5"
  />

  <v-spine
    :resource="__LOADED_RESOURCES.splash_bg_json"
    :settings="{ animation: 'alltime' }"
  />

  <text
    :style="textStyles.TextTitle"
    :x="layout.title1[orientation].x"
    :y="layout.title1[orientation].y"
    :anchor="0.5"
    >{{ `MAGIC SPHERE` }}</text
  >
  <text
    :style="textStyles.TextTitle"
    :x="layout.title2[orientation].x"
    :y="layout.title2[orientation].y"
    :anchor="0.5"
    >{{ `BLUE CRYSTAL` }}</text
  >
  <text
    :style="textStyles.TextLabel"
    :x="layout.label1[orientation].x"
    :y="layout.label1[orientation].y"
    :anchor="0.5"
    >{{ `DOUBLE THE PRIZE` }}</text
  >
  <text
    :style="textStyles.TextLabel"
    :x="layout.label2[orientation].x"
    :y="layout.label2[orientation].y"
    :anchor="0.5"
    >{{ `WIN ALL 10 PRIZES` }}</text
  >
  <v-spine-button
    :label="`Continue`"
    :spineData="__LOADED_RESOURCES.continue_button_json.spineData"
    :statesData="buttonStates"
    :x="layout.continueButton[orientation].x"
    :y="layout.continueButton[orientation].y"
    :onClick="continueAction"
  />

  <Checkbox
    :labels="{ checked: 'Do not show again' }"
    :x="layout.checkbox[orientation].x"
    :y="layout.checkbox[orientation].y"
    :selected="__LOADED_RESOURCES.selected"
    :unselected="__LOADED_RESOURCES.unselected"
    :style="textStyles.TextCheckbox"
    @onChecked="checkedAction"
  />
</template>
