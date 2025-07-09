export const hackFontStyle = (label: any) => {
  let fonts = label.fontFamily || []
  const labelObject = { ...label }

  if (!Array.isArray(fonts)) {
    fonts = fonts.split(',').map((font: string) => font.trim())
  }
  labelObject.fontFamily = fonts.join(',')

  fonts.push('Arial')
}
