import colorsVar1 from './colors-var1'
import colorsVar2 from './colors-var2'
import fonts from './fonts'
import fontSizes from './font-sizes'
import lineHeights from './line-heights'
import breakpoints from './breakpoints'
import zIndexes from './indexes'
import sizes from './sizes'
import transitions from './transitions'

import _kebabCase from 'lodash/kebabCase'

export default {
  ...Object.keys({ ...colorsVar1, ...colorsVar2 }).reduce((acc: Record<string, string>, key) => {
    key = _kebabCase(key)
    acc[key] = `var(--${key})`
    return acc
  }, {}),
  ...fonts,
  ...fontSizes,
  ...lineHeights,
  breakpoints,
  ...zIndexes,
  ...sizes,
  ...transitions
}
