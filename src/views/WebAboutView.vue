<template>
  <div class="h-screen w-full -mt-[80px] overflow-auto">
    <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content flex-col lg:flex-row max-w-3xl">
        <img src="/images/watch.jpeg" class="max-w-xs rounded-lg shadow-2xl" />
        <div>
          <h1 class="text-5xl font-bold">Free</h1>
          <h2 class="text-2xl">Web Based IP TV Application</h2>
        </div>
      </div>
    </div>
    <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content flex-col lg:flex-row-reverse  max-w-3xl">
        <img src="/images/bridge.jpeg" class="max-w-xs rounded-lg shadow-2xl" />
        <div>
          <h1 class="text-5xl font-bold">Download Now</h1>
          <p class="py-6">
            Available for Windows and Linux. <br>
            Latest version available on github.
          </p>
          <a class="btn btn-primary" href="https://github.com/uys2000-projects/UPlayer/releases"
            target="_blank">Download Now</a>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen" style="background-image: url(/images/code.webp);">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-neutral-content text-center">
        <div class="max-w-md bg-neutral text-neutral-content p-8 rounded-box bg-opacity-90">
          <h1 class="text-5xl font-bold">Contact With Me</h1>
          <div class="py-6 flex flex-col gap-2 links">
            <span>
              <a class="link" href="mailto:siliente2020@gmail.com" target="_blank">siliente2020@gmail.com</a>
            </span>
            <span>
              <a class="link" href="https://mehmetuysal.dev" target="_blank">mehmetuysal.dev</a>
            </span>
            <span>
              <a class="link" href="https://github.com/uys2000-projects/UPlayer" target="_blank">source code</a>
            </span>
          </div>
        </div>
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

<style scoped>
.links span::before {
  content: "-> ";
}

.links span::after {
  content: " <-";
}
</style>