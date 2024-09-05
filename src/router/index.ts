import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { useAuthStore } from "@/stores/auth";
import { getPreference } from "@/services/capacitor/preferences";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach((to, from) => {
  document.title = `${to.meta.title} | Mehmet Uysal`;
});

router.beforeResolve(async (to, from) => {
  const authStore = useAuthStore();
  const id = await getPreference("id");
  if (id) authStore.id = id;
  if (!authStore.isAuthenticated && to.meta.authRequired)
    return { name: "LoginView" };
});
export default router;
