<script setup lang="ts">
import { ref, watch } from "vue";
import { store } from "../store";
import Button from "./Button.vue";
import Switch from "./Switch.vue";
import Icon from "./Icon.vue";
import books from "../books.json";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const routeBook: string = route.params.book
  ? route.params.book.toString()
  : "matthew";
const routeChapter: string = route.params.chapter
  ? route.params.chapter.toString()
  : "1";
const activeBook = ref(routeBook);
</script>

<template>
  <transition name="overlay">
    <div
      class="overlay"
      v-if="store.navigationActive"
      @click="store.navigationActive = false"
    ></div>
  </transition>
  <transition name="navigation">
    <section class="navigation" v-if="store.navigationActive">
      <ul class="bible-navigation">
        <li
          v-for="book in books"
          :class="{ book: true, 'active-book': activeBook === book.id }"
          @click="activeBook = book.id"
        >
          <span class="book-name">{{ book.name }}</span>
          <ul v-if="book.chapterCount > 0" class="chapters">
            <li
              v-for="index in book.chapterCount"
              class="chapter"
              @click="store.navigationActive = false"
            >
              <router-link
                class="chapter-link"
                :to="`/${activeBook}/${index}`"
                >{{ index }}</router-link
              >
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </transition>
</template>

<style scoped>
.overlay {
  inset: 0;
  position: fixed;
  background-color: var(--color-bg-overlay);
}
.navigation {
  position: fixed;
  left: 0;
  top: 0;
  width: 300px;
  height: 100vh;
  background-color: var(--color-bg-surface-1);
  border-right: 1px solid var(--color-border-secondary);
  /* box-shadow: 2px 0 10px rgb(0 0 0 / 10%), 4px 0 15px rgb(0 0 0 / 5%),
    20px 0px 75px rgb(0 0 0 / 20%); */
  overflow: auto;
  z-index: 1;
}

.bible-navigation {
  margin: 0;
  padding: 0;
  list-style-type: none;
  font-size: 16px;
}

.book {
  overflow: hidden;
  border-bottom: 1px solid var(--color-border-secondary);
  font-family: var(--font-family-body);
}

.book-name {
  display: block;
  font-size: var(--18px);
  padding: 14px 16px;
  color: var(--color-text-secondary);
  cursor: pointer;
}

.book-name:hover {
  background-color: var(--color-bg-interactive-hover);
}

.active-book .book-name {
  background-color: var(--color-bg-interactive-active);
}
.active-book .book-name:hover {
  background-color: var(--color-bg-interactive-active-hover);
}

.chapters {
  display: none;
  padding: 1px 0 0 0;
  list-style-type: none;
  flex-wrap: wrap;
  background-color: var(--bg-surface-2);
}

.active-book .chapters {
  display: flex;
}

.chapter {
  width: 50px;
  height: 50px;
  box-shadow: 0 -1px 0 var(--color-border-primary),
    1px 0 0 var(--color-border-primary);
  cursor: pointer;
}

a.chapter-link {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--18px);
}
a.chapter-link:hover {
  background-color: var(--color-bg-interactive-hover);
}

/*-- Animations --*/

/* we will explain what these classes do next! */
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 300ms var(--ease-out-cubic);
  opacity: 1;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.navigation-enter-active {
  transition: translate 500ms var(--ease-out-quint);
}
.navigation-leave-active {
  transition: translate 200ms var(--ease-in-quad);
}

.navigation-enter-from,
.navigation-leave-to {
  translate: -373px 0;
}
</style>
