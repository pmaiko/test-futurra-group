export const localizePath = (url: string, langCode?: string): string => {
  if (!url || /^(http:\/\/|https:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}(.+)?$/.test(url) || url.match(/^(tel|fax|mailto|skype|viber)/)) {
    return url
  }

  const { currentLocale, defaultLocale, locales } = useIndexStore()

  if (!langCode) {
    langCode = _get(currentLocale, 'code', '')
  }

  let localesLocal: string[] = []

  if (Array.isArray(locales)) {
    localesLocal = locales.map(l => l.code)
  }

  const regex = new RegExp(`^(\\/(${localesLocal.join('|')})\\/?)|^(\\/)`)
  url = url.replace(regex, '')

  url = (langCode === _get(defaultLocale, 'code', '')) ? url : langCode + '/' + url

  const normalizePath = (url: string) => {
    let normalized = url
    if (!url.length) {
      normalized = '/'
    }
    if (url.length > 1 && url.slice(0, 1) !== '/') {
      normalized = '/' + url
    }
    if (url.length > 1 && url.slice(-1) === '/') {
      normalized = normalized.slice(0, -1)
    }
    return normalized
  }

  return normalizePath(url)
}
