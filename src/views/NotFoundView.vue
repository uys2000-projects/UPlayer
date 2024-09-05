<template>
  <div class="hero h-screen w-full -mt-[80px]" style="background-image: url(/images/404.jpeg);">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-neutral-content text-center">
      <div class="max-w-md">
        <h1 class="text-8xl font-bold">404</h1>
        <h2 class="mb-5 text-3xl">Page Not Found</h2>
        <RouterLink class="btn btn-primary" :to="{ name: 'WebView' }">
          To Home
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';

export default {
  components: {
    RouterLink
  }
}
</script>