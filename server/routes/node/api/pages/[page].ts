import _ from 'lodash'
import { Variants, abTestKey } from '~/utils/config'

export default defineEventHandler(async (event) => {
  const lang = event.req.headers['accept-language'] || useRuntimeConfig().public.LOCALE_DEFAULT
  const page = event?.context?.params?.page
  const query = getQuery(event)

  const variantKey = query[abTestKey] as Variants
  const variant = Variants[variantKey] || (() => '')

  const data: any = await useStorage('assets:server').getItem(`pages/${page}/${lang}/index${_.upperFirst(variant)}.json`)

  if (data) {
    const deepFindAndUpdate = (obj: any, targetKey: string, newValue: any): void => {
      _.forOwn(obj, (value, key) => {
        if (_.isObject(value)) {
          deepFindAndUpdate(value, targetKey, newValue)
        } else if (key === targetKey) {
          obj[key] = newValue
        }
      })
    }

    const promoTotalTime = 3 * 60000
    const promoEndTime = new Date(new Date().getTime() + promoTotalTime).getTime()

    deepFindAndUpdate(data, 'promoTotalTime', promoTotalTime)
    deepFindAndUpdate(data, 'promoEndTime', promoEndTime)

    if (typeof data.meta?.seo === 'object' ) {
      data.meta.seo.variant = variant
    }

    return data
  }

  setResponseStatus(event, 404)
  return {
    success: false,
    statusCode: 404,
    message: 'Not Found',
    page
  }
})
