<template>
  <dialog ref="dialog" class="modal">
    <div class="modal-box">
      <form method="dialog" @submit="$emit('close')">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <slot />
    </div>
    <form method="dialog" class="modal-backdrop" @submit="$emit('close')">
      <button>close</button>
    </form>
  </dialog>
</template>

<script lang="ts">
export default {
  emits: ["close"],
  methods: {
    open() {
      const dialog = this.$refs.dialog as HTMLDialogElement;
      dialog.showModal()
    },
    close() {
      const dialog = this.$refs.dialog as HTMLDialogElement;
      dialog.close()
    }
  }
}
</script>