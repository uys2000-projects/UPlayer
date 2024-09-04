<template>
  <header class="bg-neutral text-neutral-content flex justify-between items-center p-4 z-10">
    <div class="flex-none lg:hidden">
      <label for="drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
        <span class="material-symbols-outlined text-primary">
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
  }
}
</script>