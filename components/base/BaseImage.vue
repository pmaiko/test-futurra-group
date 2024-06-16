<template>
  <div
    v-if="image"
    :class="classes"
    :style="{backgroundImage: animation === 'blur' ? `url(${_get(image, 'thumb', '')}?thumb)` : null}"
  >
    <picture
      v-if="!lazy || isInView"
      class="base-image__picture"
    >
      <source
        v-if="srcset.webp"
        :srcset="srcset.webp"
        :sizes="sizes"
        type="image/webp"
      >
      <source
        v-if="srcset.default"
        :srcset="srcset.default"
        :sizes="sizes"
      >
      <img
        :src="_get(image, 'originalSrc', '') || image"
        :alt="alt"
        :title="_get(image, 'title', '')"
        class="base-image__img"
        @load="onLoaded"
        @mouseenter="onRemoveTitle"
        @mouseleave="onAddTitle"
      >
    </picture>
  </div>
</template>
<script>
  let loadObserver

  export default {
    name: 'BaseImage',

    props: {
      image: [Object, String],
      lazy: Boolean,
      preload: Boolean,
      objectFit: {
        type: String,
        default: 'cover'
      },
      animation: {
        type: String,
        validator: value => ['blur', 'opacity', 'slide-right'].includes(value)
      },
      descriptor: {
        type: String,
        default: 'w',
        validator: value => ['w', 'x'].includes(value)
      },
      relativeWidth: Number
    },

    data () {
      return {
        isLoaded: false,
        isInView: false
      }
    },

    // head () {
    //   if (this.preload) {
    //     const createLink = (imagesrcset) => {
    //       return {
    //         rel: 'preload',
    //         as: 'image',
    //         imagesrcset,
    //         type: 'image/webp'
    //       }
    //     }
    //     const links = [
    //       createLink(this.srcset.webp || {})
    //     ]
    //     return {
    //       link: links
    //     }
    //   }
    // },

    computed: {
      classes () {
        return [
          'base-image',
          { 'base-image_lazy': this.lazy },
          { 'base-image_loaded': this.isLoaded },
          { [`base-image_object-fit-${this.objectFit}`]: this.objectFit },
          { [`base-image_animation-${this.animation}`]: this.animation }
        ]
      },

      alt () {
        return _get(this.image, 'alt', '')
      },

      sizes () {
        return this.relativeWidth ? this.relativeWidth + 'px' : null
      },

      srcset () {
        const types = ['webp', 'default']
        const sizes = Object.keys(_get(this.image, 'default', '') || {})

        const getSrcset = (type) => {
          const createSrcset = (type, size) => {
            return `${_get(this.image, `${type}.${size}`)} ${size}${this.descriptor}`
          }
          let srcsetArray = []
          for (let i = 0; i < sizes.length; i++) {
            const size = sizes[i]
            const sizeNext = sizes[i + 1]

            const srcset = createSrcset(type, size)

            if (this.relativeWidth && this.relativeWidth <= size) {
              srcsetArray = [srcset]
              if (sizeNext) {
                srcsetArray.push(createSrcset(type, sizeNext))
              }
              break
            }

            srcsetArray.push(srcset)
          }
          return srcsetArray.join(', ')
        }

        return types.reduce((acc, type) => {
          acc[type] = _get(this.image, type, '') && getSrcset(type)
          return acc
        }, {})
      }
    },

    async mounted () {
      if (this.lazy) {
        const ObserverService = (await import('~/services/ObserverService')).default

        loadObserver = new ObserverService(undefined, this.onInView)
        loadObserver.observe(this.$el)
      }
    },

    beforeUnmount () {
      loadObserver?.unobserve(this.$el)
    },

    methods: {
      onLoaded () {
        this.isLoaded = true
        this.$emit('load', this._uid)
      },

      onInView () {
        this.isInView = true
      },

      onRemoveTitle (event) {
        const el = event.target

        if (el) {
          el.removeAttribute('title')
        }
      },

      onAddTitle (event) {
        const el = event.target

        if (el) {
          el.setAttribute('title', _get(this.image, 'title', ''))
        }
      }
    }
  }
</script>
<style lang="scss">
  .base-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;

    $root: &;

    &__picture {
      display: flex;
      width: 100%;
      height: 100%;
    }

    &__img {
      width: 100%;
      height: 100%;
      object-position: center;
    }

    &_animation {
      &-opacity {
        opacity: 0;
        transition: opacity 0.3s;

        &#{$root}_loaded {
          opacity: 1;
        }
      }

      &-slide-right {
        overflow: hidden;
        pointer-events: none;

        &::before {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          padding-top: 100%;
          content: '';
          background: #eee;
          border-radius: 100%;
          transition: transform 1s cubic-bezier(0.6, 0.15, 0.35, 0.8), opacity 1s;
          transform: scale(1.5);
        }

        &#{$root}_loaded {
          opacity: 1;

          &::before {
            transform: translateX(100%) scale(1);
          }
        }
      }
    }

    &_object-fit {
      &-cover {
        background-size: cover;

        #{$root} {
          &__img {
            object-fit: cover;
          }
        }
      }

      &-contain {
        background-size: contain;

        #{$root} {
          &__img {
            object-fit: contain;
          }
        }
      }
    }

    &_loaded {
      background-image: none !important;
    }
  }
</style>
