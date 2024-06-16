type Param = { name: string, pageURL?: string }

export const useSocialShare = () => {
  return {
    openPopup: function (param: Param) {
      const url = this.getURL(param)

      if (url && window.top) {
        const width = 600
        const height = 400
        const left = window.top.outerWidth / 2 + window.top.screenX - width / 2
        const top = window.top.outerHeight / 2 + window.top.screenY - height / 2

        window.open(
          url,
          'sharer',
          `
    width=${width},
    height=${height},
    left=${left},
    top=${top},
    toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no
    `
        )
      }
    },

    getURL: function ({ name, pageURL }: Param) {
      if (!pageURL) { pageURL = window.location.pathname }

      const formattedPageURL = encodeURIComponent(`${/(http|https)|(tel:)|(mailto:)/.test(pageURL) ? '' : window.location.origin}${pageURL}`)

      switch (name) {
        case 'facebook': {
          return `https://www.facebook.com/sharer/sharer.php?u=${formattedPageURL}`
        }
        case 'twitter': {
          return `http://twitter.com/intent/tweet?text=${formattedPageURL}`
        }
        case 'telegram': {
          return `https://telegram.me/share/url?url=${formattedPageURL}`
        }
        case 'viber': {
          return `viber://forward?text=${formattedPageURL}`
        }
        case 'fb-messenger': {
          return `fb-messenger://share/?link=${formattedPageURL}`
        }
        default: {
          return null
        }
      }
    }
  }
}

