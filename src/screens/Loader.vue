<script lang="ts" setup>
import { ref, computed, defineEmits } from 'vue';
import { Loader, useScreen, PTransition } from 'vue3-pixi'
import { __RESOURCES, __LOADED_RESOURCES } from '../config/Resources';
import { Graphics, Rectangle } from 'pixi.js';
import { LOADING_BAR_BORDER_COLOR } from '../config/Colors';
 
type LoaderOptionsType = {
	options?: {
		bgColor: number
		border: number
		borderColor: number
		fillColor: number
		height: number
		radius: number
		width: number
	}
}

const props = withDefaults(defineProps<LoaderOptionsType>(), {
	options: {
		//@ts-ignore
		bgColor: 0x0099FF,
		border: 4,
		borderColor: 0xFFFFFF,
		fillColor: 0xe55039,
		height: 20,
		radius: 25,
		width: 550,
	}
})

const loaderProgress = ref<number>(0);
const screen = useScreen()
const emitters = defineEmits(['loader:resolved'])
const renderProgressBar = (graphics: Graphics) => {
	graphics.beginFill(LOADING_BAR_BORDER_COLOR)
	graphics.drawRoundedRect(props.options.border, props.options.border, props.options.width - (props.options.border * 2), props.options.height - (props.options.border * 2), props.options.radius)
	graphics.beginFill(props.options.bgColor)
	graphics.drawRoundedRect(props.options.border, props.options.border, props.options.width - (props.options.border * 2), props.options.height - (props.options.border * 2), props.options.radius)
}

const createStaticBar = (graphics: Graphics) => {
	          // width: 400,
            //             height: 7, 
						let t  = props.options.width, e = props.options.height;
	graphics.beginFill(0x0eee00, 0),
	graphics.drawRect(0, -20, t, 2 * (e + 20));
	var r = new Graphics;
	r.beginFill(0xFFFFFF);
	r.drawRoundedRect(0, 0, t, e, e / 2),
	graphics.addChild(r);
                               
}

const updateProgress = computed(() =>{
 	return  (props.options.width * (loaderProgress.value * 100)/ 100)
})	

const onResolved = (evt: any) => { 
 	Object.entries(evt).forEach((el: any) => {
		__LOADED_RESOURCES[el[0]] = el[1];
	})
 	emitters('loader:resolved', evt) 
}

const onProgress = (evt: any) => {
	loaderProgress.value = evt
}
 
</script>
<template>
	<container>
		<Loader :resources="__RESOURCES" @resolved="onResolved" @progress="onProgress">
			<template #fallback="{ progress }"> 
				<Container :x="screen.width / 2" :y="screen.height / 2"> 
						<graphics  :scale=".4"  :x="0" :y="0"   @render="createStaticBar" :width="updateProgress"/>
		 				<text :x="0" :y="props.options.height + 5" :anchor="0.5" :style="{ fill: 'white' }">
							{{ `Loading... ${Number(progress * 100).toFixed(2)}` }}	</text>
				</Container>
			</template>
		</Loader>
	</container>
</template>
