import FontFaceObserver from 'fontfaceobserver'
import WebFont from 'webfontloader'
import { BASE_URL } from '../main'

export type FontType = {
  fontFamily: string
  file: string
}

export const useFontFaceLoader = (fonts: FontType[]) => {
  const load = () => {
    const families = fonts.map((font) => font.fontFamily)
    const urls = fonts.map((font) => `${BASE_URL}fonts/${font.file}`)

    WebFont.load({
      custom: {
        families,
        urls
      }
    })
  }

  const observer = () => {
    let observers: Promise<void>[] = []
    fonts.forEach((font) => {
      const obs = new FontFaceObserver(font.fontFamily)
      observers.push(obs.load())
    })
    return Promise.all(observers)
  }

  return {
    load,
    observer
  }
}
