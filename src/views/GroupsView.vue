<template>
  <div class="h-page w-full p-4 flex flex-col gap-4">
    <label class="input input-bordered flex items-center gap-2 flex-shrink-0">
      Search:
      <input type="text" class="grow" placeholder="Movie" v-model="search" />
    </label>
    <div class="flex flex-wrap gap-4 justify-center overflow-auto max-h-full flex-shrink">
      <template v-for="item in listGroups">
        <div class="bg-neutral text-neutral-content min-w-40 rounded-box p-2 cursor-pointer text-center"
          @click="() => openGroup(item.id)">
          {{ item.data }}
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { getGroups } from '@/services/firebase/db';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';

export default {
  data() {
    return {
      search: "",
      appStore: useAppStore(),
      authStore: useAuthStore(),
      list: [] as UDocument<string>[]
    }
  },
  computed: {
    listGroups() {
      return [...this.list].filter(i => i.data.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
    }
  },
  methods: {
    openGroup(id: string) {
      this.$router.push({ name: "ChannelsView", params: { id } })
    }
  },
  async mounted() {
    if (this.authStore.user) {
      this.appStore.toastLabel = "Loading..."
      this.list = await getGroups(this.authStore.user)
      this.appStore.toastLabel = `Loaded ${this.list.length} groups`
    }
  }
}
</script>