<template>
  <div class="hero w-full" :class="{ '-mt-[80px] h-screen': isWeb, 'h-page': !isWeb }"
    style="background-image: url(/images/user.webp);">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-neutral-content text-center">
      <div class="max-w-md flex flex-col gap-2">
        <input type="text" class="input" placeholder="user-id" v-model="id">
        <button class="btn" @click="signIn">SignIn</button>
        <button class="btn" @click="register">Register</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { addUser, getUser } from '@/services/firebase/db';
import { useAuthStore } from '@/stores/auth';

export default {
  data() {
    return {
      isWeb: import.meta.env.VITE_BUILD_TYPE == "WEB",
      id: "",
      authStore: useAuthStore()
    }
  },
  methods: {
    async signIn() {
      const user = await getUser(this.id)
      if (user) {
        this.authStore.set(user)
        if (import.meta.env.VITE_BUILD_TYPE == "WEB") {
          this.$router.push({ name: "SettingsView" })
        } else this.$router.push({ name: "HomeView" })
      }
    },
    async register() {
      const newUser = { id: "", timestamp: Date.now(), utimestamp: Date.now(), data: { name: "", theme: "", playlist: "" } }
      const userDoc = await addUser.pLogger(newUser)
      this.authStore.set.logger(userDoc)
      if (this.$route.redirectedFrom?.name) {
        this.$router.push({ name: this.$route.redirectedFrom.name })
        return
      }
      if (import.meta.env.VITE_BUILD_TYPE == "WEB") {
        this.$router.push({ name: "SettingsView" })
      } else this.$router.push({ name: "HomeView" })
    },
  },
}
</script>
