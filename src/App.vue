<template>
  <router-view v-slot="{ Component }">
    <transition name="layout">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { RouterView } from "vue-router";
import { getUser } from "./services/firebase/db";
import { useAuthStore } from "./stores/auth";
import router from "./router";
import { getPreference } from "./services/capacitor/preferences";
export default {
  components: {
    RouterView,
  },
  data() {
    return {
      authStore: useAuthStore(),
    };
  },
  async mounted() {
    const id = await getPreference("id");
    if (id) {
      const user = await getUser(id);
      if (user) this.authStore.set(user);
      else { this.authStore.unset(); this, router.push({ name: "LoginView" }) }
    }
  },
};
</script>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
