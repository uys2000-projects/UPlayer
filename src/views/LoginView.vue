<template>
  <div class="hero h-page w-full"
    style="background-image: url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp);">
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
      id: "",
      authStore: useAuthStore()
    }
  },
  methods: {
    async signIn() {
      const user = await getUser(this.id)
      if (user) {
        this.authStore.set(user)
        this.$router.push({ name: "HomeView" })
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
      this.$router.push({ name: "HomeView" })
    },
  }
}
</script>
