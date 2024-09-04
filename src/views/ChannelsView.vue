<template>
  <div class="h-page w-full p-4 flex flex-col gap-4">
    <label class="input input-bordered flex items-center gap-2 flex-shrink-0">
      Search:
      <input type="text" class="grow" placeholder="Movie" v-model="search" />
    </label>
    <div class="flex flex-wrap gap-4 justify-center overflow-auto max-h-full flex-shrink">
      <template v-for="item in listGroups">
        <div class="item bg-neutral cursor-pointer relative" @click="() => open(item.id)">
          <img class="w-96 h-auto min-h-24" :src="item.data.tvg.logo" alt="" loading="lazy">
          <div class="absolute glass w-full h-full top-0 left-0 opacity-0 flex flex-col justify-center items-center">
            <div class=" text-neutral">
              {{ item.data.name }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { getChannels, getGroup } from '@/services/firebase/db';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';
import type { PlaylistItem } from 'iptv-playlist-parser';

export default {
  data() {
    return {
      search: "",
      appStore: useAppStore(),
      authStore: useAuthStore(),
      list: [] as UDocument<PlaylistItem>[],

    }
  },
  computed: {
    listGroups() {
      return [...this.list].filter(i => i.data.name.includes(this.search.toLocaleLowerCase()))
    }
  },
  methods: {
    open(id: string) {
      this.$router.push({ name: "PlayerView", params: { id } })
    }
  },
  async mounted() {
    if (this.authStore.user && this.$route.params.id) {
      if (this.$route.params.id != "all") {
        this.appStore.toastLabel = "Loading..."
        const group = await getGroup.pLogger(this.authStore.user, this.$route.params.id as string)
        this.appStore.toastLabel = `Loaded ${group.data}`
        this.list = await getChannels.pLogger(this.authStore.user, group.data)
        //this.appStore.toastLabel = `Loaded ${this.list.length}`
      }
    }
  }
}
</script>

<style scoped>
.item:hover .glass {
  @apply opacity-100;
}
</style>