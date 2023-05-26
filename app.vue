<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <div v-if="user" class="min-h-full">
        <div
          class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
        >
          <div class="hidden md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft />
            </div>
          </div>
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <router-view />
          </main>
          <div
            class="hidden col-span-12 hidden md:block xs-col-span-4 xl:col-span-3"
          >
            <SidebarRight />
          </div>
        </div>
      </div>

      <AuthPage v-else />
    </div>
  </div>
</template>

<script setup>
const darkMode = ref(false);

const { useAuthUser, initAuth } = useAuth()
const user = useAuthUser()

onBeforeMount(() => {
  initAuth()
})
</script>
