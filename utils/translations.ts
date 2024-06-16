export const t = (key: string): string  => {
  const { translations } = useIndexStore()

  return _get(translations, key, '')
}
