<template>
  <header class="bg-neutral text-neutral-content flex justify-between items-center p-4 z-10">
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