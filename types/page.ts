export interface Page {
  meta: Meta,
  blocks: Block[]
}

export interface Meta {
  seo: Seo
}

export interface Seo {
  variant?: string
  title: string
  description: string
  og: {
    title: string
    description: string
    image: string
  },
  robots?: string
  breadcrumbs?: breadcrumb[],
  favicons?: favicon[]
}

export interface breadcrumb {
  label: string
  url: string
}

export interface favicon {
  rel: string
  type?: string,
  sizes?: string,
  href: string,
  color?: string
}

export interface Block {
  id: string
  attributes: any
}
