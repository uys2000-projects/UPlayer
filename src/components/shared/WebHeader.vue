<template>
  <header class="px-4 pt-4 sticky top-0 z-10">
    <div class="bg-neutral text-neutral-content flex justify-between items-center p-4 rounded-box">
      <RouterLink class="btn btn-sm btn-ghost" :to="{ name: 'HomeView' }">
        UPlayer IpTV Player
      </RouterLink>
      <div class="flex gap-2">
        <RouterLink class="btn btn-sm btn-ghost" :to="{ name: 'WebAboutView' }">
          About
        </RouterLink>
        <template v-if="authStore.isAuthenticated">
          <RouterLink class="btn btn-sm btn-ghost" :to="{ name: 'SettingsView' }">
            Settings
          </RouterLink>
          <a class="btn btn-sm btn-ghost" href="javascript:;" @click="signOut">
            Sign Out
          </a>
        </template>
        <template v-else>
          <RouterLink class="btn btn-sm btn-ghost" :to="{ name: 'LoginView' }">
            Sign In
          </RouterLink>
        </template>
        <ThemeBtn />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import Dropdown from '../daisy/Dropdown.vue';
import DropdownContent from '../daisy/DropdownContent.vue';
import ThemeBtn from '../daisy/ThemeBtn.vue';
import { useAuthStore } from '@/stores/auth';
import { removePreference } from '@/services/capacitor/preferences';

export default {
  components: { RouterLink, Dropdown, DropdownContent, ThemeBtn },
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