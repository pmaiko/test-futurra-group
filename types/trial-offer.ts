import type { UILink } from '~/types/ui'

export interface TrialOffer {
  title: string,
  subtitle: string,
  hint: string,
  promoTotalTime: number,
  promoEndTime: number,
  promoEndText: string,
  list: string[],
  paymentButton: UILink,
  text: string
}
