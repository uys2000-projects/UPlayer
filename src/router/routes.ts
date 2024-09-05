import type { RouteRecordRaw } from "vue-router";
const appRoutes = [
  {
    path: "/",
    name: "Layout",
    component: () => import("../layouts/Layout.vue"),
    meta: { title: "Base" },
    children: [
      {
        path: "",
        name: "LoginView",
        component: () => import("../views/LoginView.vue"),
        meta: { title: "Login", authRequired: false },
      },
      {
        path: "",
        name: "HomeView",
        component: () => import("../views/HomeView.vue"),
        meta: { title: "Home", authRequired: true },
      },
      {
        path: "groups",
        name: "GroupsView",
        component: () => import("../views/GroupsView.vue"),
        meta: { title: "Groups", authRequired: true },
      },
      {
        path: "channels/:id",
        name: "ChannelsView",
        component: () => import("../views/ChannelsView.vue"),
        meta: { title: "Channels", authRequired: true },
      },
      {
        path: "player/:id",
        name: "PlayerView",
        component: () => import("../views/PlayerView.vue"),
        meta: { title: "Player", authRequired: true },
      },
      {
        path: "settings",
        name: "SettingsView",
        component: () => import("../views/SettingsView.vue"),
        meta: { title: "Home", authRequired: true },
      },
    ],
  },
] as RouteRecordRaw[];
const webRoutes = [
  {
    path: "/",
    name: "WebLayout",
    component: () => import("../layouts/WebLayout.vue"),
    meta: { title: "Base" },
    children: [
      {
        path: "",
        name: "WebView",
        component: () => import("../views/WebView.vue"),
        meta: { title: "Home", authRequired: false },
      },
      {
        path: "about",
        name: "WebAboutView",
        component: () => import("../views/WebAboutView.vue"),
        meta: { title: "Home", authRequired: false },
      },
      {
        path: "login",
        name: "LoginView",
        component: () => import("../views/LoginView.vue"),
        meta: { title: "Login", authRequired: false },
      },
      {
        path: "settings",
        name: "SettingsView",
        component: () => import("../views/SettingsView.vue"),
        meta: { title: "Home", authRequired: true },
      },
      {
        path: "/:pathMatch(.*)*",
        name: "NotFoundView",
        component: () => import("../views/NotFoundView.vue"),
        meta: { title: "404", authRequired: false },
      },
    ],
  },
] as RouteRecordRaw[];

export const routes =
  import.meta.env.VITE_BUILD_TYPE == "WEB" ? webRoutes : appRoutes;
