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
      <button class="btn w-full flex-shrink" @click="loadChannels">Load Channels</button>
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
import { updateUser } from '@/services/firebase/db';
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
    async loadChannels() {
      this.appStore.toast = "info"
      this.appStore.toastLabel = "We are checking the Playlist"
      const response = await this.getFile().catch(() => undefined)
      if (!response?.result) {
        this.appStore.toast = "error"
        this.appStore.toastLabel = "URL Not Accessable."
      } else {
        this.appStore.toast = "success"
        this.appStore.toastLabel = "Channels are saved."
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