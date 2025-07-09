import { FontType } from '../composables/useFontFaceLoader'

interface StringMap {
  [key: string]: string
}

const BASE_URL = import.meta.env.PROD
  ? `${import.meta.env.BASE_URL}/assets/`
  : '/assets/'
const IMGS = BASE_URL + 'imgs/'

export const __RESOURCES: StringMap = {
  autoplayBtn: IMGS + 'autoplayButton.png',
  bigWinAmount: IMGS + 'BigWinAmountFont.png',
  cancelBtn: IMGS + 'cancel.png',
  infoIcon1: IMGS + 'Info_Icon_1.png',
  infoIcon2: IMGS + 'Info_Icon_2.png',
  infoPanelLogo: IMGS + 'Info_Panel_Logo.png',
  logoHorz: IMGS + 'Logo_Horz.png',
  logoLandscape: IMGS + 'Logo_landscape.png',
  logoPortrait: IMGS + 'Logo_portrait.png',
  logoVert: IMGS + 'Logo_Vert.png',
  mainHorizontal: IMGS + 'main_horizontal.jpg',
  mainVertical: IMGS + 'main_vertical.jpg',
  menuBtns: IMGS + 'Menu_Buttons.png',
  multiplierPrizeWin: IMGS + 'MultiplierPrizeWin.png',
  optionsActive: IMGS + 'Options_Active.png',
  options: IMGS + 'Options.png',
  playBtn: IMGS + 'playButton.png',
  prize: IMGS + 'Prize.png',
  splashHorizontal: IMGS + 'splash_horizontal.jpg',
  splashVertical: IMGS + 'splash_vertical.jpg',
  stopBtn: IMGS + 'stopButton.png',
  symbols: IMGS + 'symbols.png',
  symbols2: IMGS + 'symbols2.png',
  toolbar: IMGS + 'Toolbar.png',
  selected: IMGS + 'selected.jpg',
  unselected: IMGS + 'unselected.jpg',
  arrowBlack: IMGS + 'arrowBlack.png',
  arrowWhite: IMGS + 'arrowWhite.png',
  closeButton: IMGS + 'closeButton.png',

  //atlas all_time_bg
  all_time_bg_json: 'assets/atlas/all_time_bg.json',
  all_time_bg_png: 'assets/atlas/all_time_bg.png',
  all_time_bg_atlas: 'assets/atlas/all_time_bg.atlas',
  //atlas all time
  all_time_json: 'assets/atlas/all_time.json',
  all_time_png: 'assets/atlas/all_time.png',
  all_time_atlas: 'assets/atlas/all_time.atlas',

  //atlas splash bg
  splash_bg_json: 'assets/atlas/splash_bg.json',
  splash_bg: 'assets/atlas/splash_bg.png',
  splash_bg_atlas: 'assets/atlas/splash_bg.atlas',

  //atlast continue button
  continue_button_json: 'assets/atlas/button.json',
  continue_button_png: 'assets/atlas/button.png',
  continue_button_atlas: 'assets/atlas/button.atlas',

  general_win_json: 'assets/atlas/general_win.json',
  general_win_png: 'assets/atlas/general_win.png',
  general_win_atlas: 'assets/atlas/general_win.atlas',

  house_reveal_json: 'assets/atlas/house_reveal.json',
  house_reveal_png: 'assets/atlas/house_reveal.png',
  house_reveal_atlas: 'assets/atlas/house_reveal.atlas',

  symbols_json: 'assets/atlas/symbols.json',
  symbols_png: 'assets/atlas/symbols.png',
  // symbols_atlas: 'assets/atlas/symbols.atlas',

  your_reveal_json: 'assets/atlas/your_reveal.json',
  your_reveal_png: 'assets/atlas/your_reveal.png',

  //atlast toolbar
  toolbar_json: 'assets/json/Toolbar.json',
  menu_buttons_json: 'assets/json/Menu_Buttons.json',

  //particles
  wizard_particles: 'assets/json/WizardAppearParticles.json',
  wizard_particles_img: 'assets/imgs/WizardAppearParticle.png',

  //positions
  main_screen_layout: 'assets/json/main_screen_layout.json',
  splash_screen_layout: 'assets/json/splash_screen_layout.json',
  toolbar_layout: 'assets/json/toolbar_layout.json',
  menu_layout: 'assets/json/menu_layout.json',
  autoplay_layout: 'assets/json/autoplay_layout.json',

  //texts
  text_styles: 'assets/json/TextStyles.json',
  main_text_styles: 'assets/json/MainStyles.json'
}

export const __FONTS: FontType[] = [
  {
    fontFamily: 'Bebas Neue Bold',
    file: 'BebasNeue-Bold.ttf'
  },
  {
    fontFamily: 'Roboto Condensed Light',
    file: 'RobotoCondensed-Light.ttf'
  },
  {
    fontFamily: 'Roboto Condensed',
    file: 'RobotoCondensed-Regular.ttf'
  }
]

export let __LOADED_RESOURCES: any = {}
