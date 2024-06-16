import UAParser from 'ua-parser-js'
import { deviceType, type ParsedInfo } from '~/types'

export default defineNuxtPlugin(async () => {
  const event = useRequestEvent()
  const uaParser = new UAParser().setUA(event?.req.headers['user-agent'] || '')

  const convert = (name: string = ''): string | null => {
    return name ? 'is' + _upperFirst(_camelCase(name)) : null
  }

  const parsed: ParsedInfo = {
    osName: (convert(uaParser.getOS().name)) as ParsedInfo['osName'],
    browserName: (convert(uaParser.getBrowser().name)) as ParsedInfo['browserName'],
    deviceType: (convert(uaParser.getDevice().type) || deviceType.isDesktop) as ParsedInfo['deviceType']
  }

  event?.res.setHeader('parsed-user-agent', JSON.stringify(parsed))
  useHelpersStore().setParsedUserAgent(parsed)
})
