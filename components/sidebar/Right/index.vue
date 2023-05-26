<template>
  <div class="flex flex-col">
    <SidebarRightPreviewCard title="What's happening">
      <SidebarRightPreviewCardItem v-for="whatsHappening in whatsHappening">
        <div>
          <h2 class="font-bold text-gray-800 text-md dark:text-white">{{ whatsHappening.title }}</h2>
          <p class="text-xs text-gray-400">{{ whatsHappening.count }}</p>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>
    <SidebarRightPreviewCard title="Who to Follow">
      <SidebarRightPreviewCardItem v-for="whoToFollow in whoToFollowItems">
        <div class="flex flex-row justify-between items-center p-2">
          <div class="flex flex-row">
            <img
              :src="whoToFollow.image"
              class="w-10 h-10 rounded-full"
              :alt="whoToFollow.handle" />
              <div class="flex flex-col ml-2">
                <h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ whoToFollow.name }}</h1>
                <p class="text-xs text-gray-400">{{whoToFollow.handle}}</p>
              </div>
          </div>
          <div class="flex h-full">
            <button
              class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full"
            >
              Follow
            </button>
          </div>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>
  </div>
</template>
<script setup>
const whatsHappening = ref([
  {
    title: 'SpaceX',
    count: '18.8k tweets'
  },
  {
    title: '#CodingIsFun',
    count: '18.8k tweets'
  },
  {
    title: '#artforall',
    count: '18.8k tweets'
  },
])

const whoToFollowItems = ref([
  {
    name: 'Joe Biden',
    handle: '@joebiden',
    image: 'https://picsum.photos/200/200'
  },
  {
    name: 'Joe Biden',
    handle: '@joebiden',
    image: 'https://picsum.photos/200/200'
  },
  {
    name: 'Joe Biden',
    handle: '@joebiden',
    image: 'https://picsum.photos/200/200'
  },
])
</script>
