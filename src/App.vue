<script setup lang="ts">
import { store } from "./store";

const setUserColorSchemePreference = () => {
  store.theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

setUserColorSchemePreference();
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

if (mediaQuery?.addEventListener) {
  mediaQuery.addEventListener("change", setUserColorSchemePreference);
} else {
  mediaQuery.addListener(setUserColorSchemePreference);
}
</script>

<template>
  <main :data-theme="store.theme">
    <router-view></router-view>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color-bg-surface-1);
}
</style>
