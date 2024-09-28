<template>
  <div class="drawer-side z-10">
    <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-neutral min-h-full w-max p-4 gap-2">
      <li>
        <RouterLink class="btn btn-primary" :to="{ name: 'HomeView' }">
          UPlayer
        </RouterLink>
      </li>
      <template v-if="authStore.isAuthenticated">
        <li>
          <RouterLink class="btn btn-primary" :to="{ name: 'GroupsView' }">
            Groups
          </RouterLink>
        </li>
        <li class="mt-auto">
          <RouterLink class="btn btn-primary" :to="{ name: 'SettingsView' }">
            Settings
          </RouterLink>
        </li>
        <li>
          <a class="btn btn-primary" href="javascript:;" @click="signOut">
            Sign Out
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>
<script lang="ts">
import { removePreference } from '@/services/capacitor/preferences';
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';

export default {
  components: { RouterLink },
  data() {
    return {
      authStore: useAuthStore()
    }
  },
  methods: {
    signOut() {
      this.authStore.unset()
      removePreference("id")
      this.$router.push({ name: "LoginView" })
    }
  }
}
</script>