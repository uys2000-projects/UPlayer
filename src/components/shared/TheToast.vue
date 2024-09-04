<template>
  <div class="toast" v-if="appStore.toastLabel">
    <div class="alert" :class="type">
      <span class="material-symbols-outlined cursor-pointer" @click="appStore.cancel">
        cancel
      </span>
      <span>{{ appStore.toastLabel }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app';

export default {
  data() {
    return {
      appStore: useAppStore()
    }
  },
  computed: {
    type() {
      switch (this.appStore.toast) {
        case "info":
          return "alert-info"
        case "success":
          return "alert-success"
        case "warning":
          return "alert-warning"
        case "error":
          return "alert-error"
        default:
          return ""
      }
    }
  }
}
</script>