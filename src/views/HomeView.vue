<template>
  <div class="hero h-page w-full" style="background-image: url(/images/city.webp);">
    <div class="hero-overlay bg-opacity-20"></div>
    <div class="hero-content text-neutral-content text-center bg-neutral bg-opacity-90 rounded-box">
      <div class="max-w-md flex flex-col gap-2">
        <h1 class="mb-5 text-5xl font-bold">Welcome</h1>
        <p>
          Welcome to your Free Web Based IPTV Application
        </p>
        <p class="bg-error text-error-content rounded-btn p-1">
          Note: Some Video formats are not suported.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth';

export default {
  data() {
    return {
      authStore: useAuthStore()
    }
  }
}
</script>
