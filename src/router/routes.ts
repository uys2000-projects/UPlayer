import type { RouteRecordRaw } from "vue-router";

export const routes = [
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
