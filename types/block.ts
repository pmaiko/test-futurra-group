import type { UILink } from '~/types/ui'
import type { TrialOffer } from '~/types/trial-offer'

export interface BaseBlockData {
  id: string
}

export interface BlockMainData extends BaseBlockData {
  logo: string,
  backgroundImage: string,
  title: string,
  subtitle: string,
  button: UILink,
  card: TrialOffer
}
