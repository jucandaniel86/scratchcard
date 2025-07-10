<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Graphics } from 'pixi.js'
import { useDataEntry } from '../../composables/useDataEntry'
import ToolbarTextItem from './ToolbarTextItem.vue'
import { ScreenOrientationEnum } from '../../config/App'
import { useAppStore } from '../../store/app'
import { storeToRefs } from 'pinia'
import { useToolbarStore } from '../../store/toolbar'
import { useTextCounter } from '../../composables/useTextCounter'

const store = useAppStore()
const orientation = ref<ScreenOrientationEnum>(store.orientation)
const config = useDataEntry('toolbar_layout', 'infoBar')
const layout = config[orientation.value]
const { balance, win, bet } = storeToRefs(useToolbarStore())

const backgroundRender = (graphics: Graphics) => {
  graphics.beginFill(0)
  graphics.drawRect(0, 0, layout.width, layout.height)
  graphics.endFill()
  graphics.alpha = 0.85
}

store.$subscribe(() => {
  orientation.value = store.orientation
})
</script>
<template>
  <container
    :x="layout.x"
    :y="layout.y + 4"
    :width="layout.width"
    :height="layout.height"
  >
    <graphics @render="backgroundRender" />
    <ToolbarTextItem
      :title="'DEMO BALANCE'"
      :value="balance"
      :styles="config.font_style_primary"
      :x="layout.components.balancePanel.x"
      :y="layout.components.balancePanel.y"
    />
    <ToolbarTextItem
      :title="'WIN UP TO'"
      :value="win"
      :styles="config.font_style_primary"
      :x="layout.components.winUpToPanel.x"
      :y="layout.components.winUpToPanel.y"
    >
    </ToolbarTextItem>
    <ToolbarTextItem
      :title="'TOTAL COST'"
      :value="bet"
      :styles="config.font_style_primary"
      :x="layout.components.totalCostPanel.x"
      :y="layout.components.totalCostPanel.y"
    />
  </container>
</template>
