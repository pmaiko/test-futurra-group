import type { Config } from 'tailwindcss'
import breakpoints from './assets/variables/breakpoints'
import fontSizes from './assets/variables/font-sizes'
import lineHeights from './assets/variables/line-heights'

export default <Partial<Config>>{
  theme: {
    extend: {
      screens: Object.entries(breakpoints).reduce((acc, [key, value]) => {
        acc[key] = `${value}px`
        return acc
      }, {} as { [key: string]: string }),

      colors: {},
      fontFamily: {
        main: ['ProximaNova', '-apple-system', 'BlinkMacSystemFont', 'Arial', 'sans-serif'],
        secondary: ['Intro', '-apple-system', 'BlinkMacSystemFont', 'Arial', 'sans-serif'],
      },
      fontSize: Object.entries(fontSizes).reduce((acc, [key, value]) => {
        acc[key] = [value, lineHeights[key.replace('fs', 'lh') as keyof typeof lineHeights]]
        return acc
      }, {} as { [key: string]: [string, string] }),
      lineHeight: Object.entries(lineHeights).reduce((acc, [key, value]) => {
        acc[key] = value
        return acc
      }, {} as { [key: string]: string })
    }
  }
}
