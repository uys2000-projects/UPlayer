<template>
  <div class="p-4 flex flex-col gap-2 w-full h-page">
    <label class="input input-bordered flex items-center gap-2">
      Id: {{ authStore.id }}
    </label>
    <label class="input input-bordered flex items-center gap-2">
      Name:
      <input type="text" class="grow" placeholder="Mehmet" v-model="user.data.name" />
    </label>
    <label class="input input-bordered flex items-center gap-2">
      Playlist Link:
      <input type="text" class="grow" placeholder="http://mehmetuysal.dev/path/to/playlist"
        v-model="user.data.playlist" />
    </label>
    <div class="flex flex-nowrap w-full gap-2 flex-col lg:flex-row">
      <button class="btn w-full flex-shrink" @click="() => loadChannels(true)">Load Channels Safely</button>
      <button class="btn w-full flex-shrink" @click="() => loadChannels(false)">Load Channels</button>
      <button class="btn w-full flex-shrink" @click="() => loadChannels(null)">Load Channels AllInOne</button>
      <button class="btn w-full flex-shrink" @click="cancel">Cancel</button>
      <button class="btn w-full flex-shrink" @click="update">Save</button>
    </div>
    <div class="alert alert-warning mt-auto mb-4">
      <span class="material-symbols-outlined">
        warning
      </span>
      I am saving channels and groups to access them more memory efficiently, And I am not providing any security for
      them.
    </div>
  </div>
</template>

<script lang="ts">
import Modal from '@/components/daisy/Modal.vue';
import { addChannels, addGroups, updateUser } from '@/services/firebase/db';
import { get } from '@/services/http';
import { parse } from '@/services/iptv';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';
import { TransitionGroup } from 'vue';
export default {
  components: { TransitionGroup, Modal },
  data() {
    return {
      text: "",
      user: { data: {} } as UDocument<UUser>,
      authStore: useAuthStore(),
      appStore: useAppStore()
    }
  },
  methods: {
    getFile() {
      const url = encodeURIComponent(this.user.data.playlist)
      return get(`http://192.168.1.200:3000/get?url=${url}`)
    },
    getPlaylist(result: string) {
      return parse.logger(result)
    },
    async loadChannels(safeMode: boolean | null) {
      let isCanceled = false
      const checkCancel = () => {
        return isCanceled
      }
      const cancel = () => {
        isCanceled = true;
        this.appStore.toastLabel = ""
      }
      this.appStore.toast = "info"
      this.appStore.toastLabel = "Playlist has been downloading..."
      this.appStore.toastCancel = cancel
      const response = await this.getFile().catch(() => undefined)
      if (!response?.result) return this.appStore.toastLabel = "URL Not Accessable..."
      this.appStore.toastLabel = "Playlist has been parsing..."
      const playlist = this.getPlaylist(response.result)
      if (!response?.result) return this.appStore.toastLabel = "Playlist Not Parsable..."
      this.appStore.toastLabel = `Channels have been uploading...`
      if (this.authStore.user) {
        let index = 0;
        const groups = [... new Set(playlist.items.map(i => i.group.title))]
        await addGroups(checkCancel, this.authStore.user, groups, () => {
          index++
          this.appStore.toastLabel = `Groups have been uploading ${index}/${groups.length}...`
        }, safeMode)
        index = 0;
        await addChannels(checkCancel, this.authStore.user, playlist, () => {
          index++
          this.appStore.toastLabel = `Channels have been uploading ${index}/${playlist.items.length}...`
        }, safeMode)

        this.appStore.toast = "success"
        this.appStore.toastLabel = "All downloaded and uploaded with parsing..."
      }

    },
    cancel() {
      if (this.authStore.user) {
        this.user = { ...this.authStore.user }
      }
    },
    async update() {
      const user = await updateUser(this.user)
      this.authStore.set(user);
    }
  },
  mounted() {
    if (this.authStore.user)
      this.user = { ...this.authStore.user }
  }
}
</script>

<style>
.flip-enter-active,
.flip-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}

.flip-enter-from,
.flip-leave-to {
  opacity: 0;
  transform: rotateY('180deg');
}
</style>