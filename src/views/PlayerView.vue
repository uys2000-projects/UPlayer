<template>
  <div class="h-page w-full">
    <template v-if="channel">
      <template v-if="isChannel">
        <LivePlayer :src="channel.data.url" />
      </template>
      <template v-else>
        <Player :src="channel.data.url" @error="() => isChannel = true" />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { getChannel } from '@/services/firebase/db';
import { useAuthStore } from '@/stores/auth';
import type { PlaylistItem } from 'iptv-playlist-parser';
import { defineAsyncComponent } from 'vue'

const LivePlayer = defineAsyncComponent(() =>
  import('@/components/shared/LivePlayer.vue')
)
const Player = defineAsyncComponent(() =>
  import('@/components/shared/Player.vue')
)

export default {
  components: { LivePlayer, Player },
  data() {
    return {
      isChannel: undefined as undefined | boolean,
      channel: null as null | UDocument<PlaylistItem>,
      authStore: useAuthStore()
    }
  },
  methods: {
    isChannelUrl(url: string) {
      return url.search(/[.][^.\/]*$/) == -1;
    }
  },
  async mounted() {
    if (this.authStore.user && this.$route.params.id) {
      const channel = await getChannel.pLogger(this.authStore.user, this.$route.params.id as string)
      this.isChannel = this.isChannelUrl(channel.data.url)
      this.channel = channel
    }
  }
}
</script>