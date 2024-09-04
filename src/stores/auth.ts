import {
  removePreference,
  setPreference,
} from "@/services/capacitor/preferences";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state() {
    return {
      id: null as null | string,
      user: null as null | UDocument<UUser>,
    };
  },
  getters: {
    isAuthenticated: (state) => !!state.id,
  },
  actions: {
    unset() {
      this.id = null;
      this.user = null;
      removePreference("id");
    },
    set(user: UDocument<UUser>) {
      this.id = user.id;
      this.user = user;
      setPreference("id", user.id);
    },
  },
});
