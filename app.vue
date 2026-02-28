<script setup lang="ts">
const colorMode = useColorMode()
const showMenu = ref(false)

// Computed

const color = computed(() => (colorMode.value === "dark" ? "#18181b" : "white"))

// Head

useHead({
  titleTemplate: (title) => {
    if (!title) return "Felix Pomodoro"
    return title.includes("Pomodoro") ? title : `${title} - Felix Pomodoro`
  },
  meta: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, maximum-scale=1",
    },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [{ rel: "icon", type: "image/svg+xml", href: "/icon.svg" }],
  htmlAttrs: {
    lang: "en",
  },
})
</script>

<template>
  <UApp>
    <div>
      <header
        class="sticky top-0 z-50 w-full backdrop-blur flex-none border-b border-neutral-200 dark:border-neutral-800 bg-white/75 dark:bg-neutral-900/75"
      >
        <UContainer>
          <div class="h-16 flex items-center justify-between gap-3">
            <div class="lg:flex-1 flex items-center gap-1.5">
              <NuxtLink
                to="/"
                class="flex items-end gap-1.5 font-bold text-xl text-neutral-900 dark:text-white"
              >
                <span class="hidden sm:block">Felix</span>
                <span class="sm:text-primary-500 dark:sm:text-primary-400">
                  Pomodoro
                </span>
              </NuxtLink>
            </div>

            <div class="flex items-center justify-end lg:flex-1 gap-1.5">
              <ColorModeButton />

              <SocialButton
                to="https://bsky.app/profile/felixdolderer.com"
                target="_blank"
                icon="i-simple-icons-bluesky"
                class="hidden lg:inline-flex"
              />
              <SocialButton
                to="https://github.com/felix-dolderer"
                target="_blank"
                icon="i-simple-icons-github"
                class="hidden lg:inline-flex"
              />
              <UButton
                @click="showMenu = true"
                icon="i-lucide-panel-left"
                color="neutral"
                variant="ghost"
              />
              <USlideover v-model:open="showMenu">
                <template #header>
                  <div class="flex">
                    <h2 class="text-xl font-bold flex-grow">Settings</h2>
                    <UButton
                      @click="showMenu = false"
                      icon="i-lucide-x-circle"
                      variant="ghost"
                      color="neutral"
                    />
                  </div>
                </template>
                <template #body>
                  <ClientOnly>
                    <ConfigTimerPreset />
                    <USeparator class="my-4" />
                    <ConfigAutoPlay />
                    <USeparator class="my-4" />
                    <ConfigAutoRemove />
                  </ClientOnly>
                </template>
              </USlideover>
            </div>
          </div>
        </UContainer>
      </header>

      <UContainer>
        <NuxtPage />
      </UContainer>
    </div>
  </UApp>
</template>
