import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state() {
    return {
      theme: "light",
      toast: "info" as "info" | "success" | "warning" | "error",
      toastLabel: "",
      toastCancel: () => {},
    };
  },
  actions: {
    cancel() {
      this.toastLabel = "";
      this.toastCancel();
    },
  },
});
