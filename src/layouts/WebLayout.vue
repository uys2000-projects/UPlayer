<template>
  <div class="h-screen bg-base-300 overflow-hidden">
    <WebHeader />
    <div class="h-app-page w-screen relative">
      <router-view v-slot="{ Component, route }">
        <transition name="app">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
      <TheToast />
    </div>
  </div>
</template>

<script lang="ts">
import WebHeader from '@/components/shared/WebHeader.vue';
import TheDrawer from '@/components/shared/TheDrawer.vue';
import { RouterView } from 'vue-router'
import TheToast from '@/components/shared/TheToast.vue';
export default {
  components: {
    WebHeader,
    TheDrawer,
    TheToast,
    RouterView
  },
}
</script>

<style>
.app-enter-active,
.app-leave-active {
  transition: 0.5s ease;
  position: absolute;
}

.app-enter-from {
  transform: translateX(-100vw);
  opacity: 0;

}

.app-leave-to {
  transform: translateX(100vw);
  opacity: 0;
}
</style>