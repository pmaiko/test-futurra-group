export interface Locale {
  name: string
  code: string
  default: boolean
  current: boolean
}

export enum osName {
  isMacOs = 'isMacOs',
  isIOs = 'isIOs',
  isAndroid = 'isAndroid',
  isWindows = 'isWindows',
  isUbuntu = 'isUbuntu',
}

export enum browserName {
  isSafari = 'isSafari',
  isChrome = 'isChrome',
  isFirefox = 'isFirefox',
  isEdge = 'isEdge',
}

export enum deviceType {
  isConsole = 'isConsole',
  isMobile = 'isMobile',
  isTablet = 'isTablet',
  isDesktop = 'isDesktop',
  isSmarttv = 'isSmarttv',
  isWearable = 'isWearable',
  isEmbedded = 'isEmbedded',
}

export type ParsedInfo = {
  osName: keyof typeof osName | null;
  browserName: keyof typeof browserName | null;
  deviceType: keyof typeof deviceType;
};
