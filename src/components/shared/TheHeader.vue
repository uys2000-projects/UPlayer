<template>
  <header class="bg-neutral text-neutral-content flex justify-between items-center p-4 z-10 h-20">
    <div class="flex-none flex gap-4 items-center">
      <label class="btn btn-square btn-primary" v-if="!['HomeView', 'LoginView'].includes($route.name as string)"
        @click="back">
        <span class="material-symbols-outlined">
          arrow_back_ios_new
        </span>
      </label>
      <label for="drawer" aria-label="open sidebar" class="btn btn-square btn-primary lg:hidden">
        <span class="material-symbols-outlined">
          menu
        </span>
      </label>
    </div>
    <div>
      {{ authStore.user?.data?.name }}
    </div>
    <div class="flex gap-2 h-8 w-max">
      <ThemeBtn />
    </div>
  </header>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import ThemeBtn from '../daisy/ThemeBtn.vue';
import { useAuthStore } from '@/stores/auth';

export default {
  components: { RouterLink, ThemeBtn },
  data() {
    return { authStore: useAuthStore() }
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>