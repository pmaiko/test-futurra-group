<template>
  <header
    :class="classes"
    class="header"
  >
    <div class="container h-100">
      <div class="header__inner h-100">
        <div class="header__left">
          <BaseLink
            url="/"
            class="header__logo"
            aria-label="site"
          >
            LOGO
          </BaseLink>
        </div>
        <div class="header__center">
          <nav class="header__nav">
            <ul class="header__nav-list">
              <li class="header__nav-list-item">
                <BaseLink
                  url="/"
                  class="header__nav-link menu-link"
                >
                  Home
                </BaseLink>
              </li>
              <li>
                <BaseLink
                  url="/about"
                  class="header__nav-link menu-link"
                >
                  About
                </BaseLink>
                <BaseLink
                  url="/login"
                  class="header__nav-link menu-link"
                >
                  Login
                </BaseLink>
                <BaseLink
                  url="/registration"
                  class="header__nav-link menu-link"
                >
                  Registration
                </BaseLink>
                <BaseLink
                  url="/cabinet"
                  class="header__nav-link menu-link"
                >
                  Cabinet
                </BaseLink>
                <BaseLink
                  url="/map"
                  class="header__nav-link menu-link"
                >
                  Map
                </BaseLink>
              </li>
            </ul>
          </nav>
        </div>
        <div class="header__right">
          - {{ authStore.isLoggedIn }}
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
  const { classes } = useHeaderOnScroll()

  defineProps<{
    title: string
  }>()

  const authStore = storeToRefs(useAuthStore())
</script>
