<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Button from "./Button.vue";
import books from "../books.json";
import { store } from "../store";
import SettingsView from "./SettingsView.vue";
import NavigationView from "./NavigationView.vue";

const reader = ref<HTMLElement | null>(null);
const route = useRoute();
const content = ref("");
const contentLoaded = ref(false);
let book: string = route.params.book ? route.params.book.toString() : "matthew";
let chapter: string = route.params.chapter
  ? route.params.chapter.toString()
  : "1";

const formatBookTitle = () => {
  const stringContainsNumber = (string: string): boolean => /\d/.test(string);

  if (book === "songofsolomon") return "Song of Solomon";

  if (stringContainsNumber(book)) {
    const number = book[0];
    return `${number} ${book[1].toUpperCase()}${book.substring(2)}`;
  }

  return book.charAt(0).toUpperCase() + book.slice(1);
};

const getBookAbbreviation = (bookId: string) => {
  const bookData = books.find((book) => book.id === bookId);
  return bookData?.abbreviation;
};

const fetchContent = () => {
  fetch(
    `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/chapters/${getBookAbbreviation(
      book
    )}.${chapter}`,
    {
      headers: {
        "api-key": "d24e35d1e97b1b9c536b80f5416d244e",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      contentLoaded.value = true;
      content.value = data.data.content.replaceAll("¶ ", "");
    });
};

watch(
  () => reader.value,
  () => {
    store.readerElement = reader.value;
  }
);

watch(
  () => route.params,
  () => {
    book = route.params.book.toString();
    chapter = route.params.chapter.toString();
    fetchContent();
  }
);

onMounted(() => fetchContent());
</script>

<template>
  <transition name="reader">
    <div
      :class="{
        reader: true,
        'menu-active': store.settingsViewActive || store.navigationActive,
        'highlight-jesus-words': store.highlightJesusWords,
        'show-verse-numbers': store.displayVerseNumbers,
      }"
      v-if="contentLoaded"
      ref="reader"
    >
      <h1 class="chapter-title">{{ formatBookTitle() }} {{ chapter }}</h1>
      <section class="body-content" v-html="content"></section>

      <Button
        icon="settings"
        class="btn-settings"
        type="tertiary"
        @click="store.settingsViewActive = !store.settingsViewActive"
      ></Button>
      <Button
        icon="hamburger-menu"
        class="btn-navigation"
        type="tertiary"
        @click="store.navigationActive = !store.navigationActive"
      ></Button>
    </div>
  </transition>

  <NavigationView />
  <SettingsView />
</template>

<style scoped>
main {
  display: contents;
}
.reader {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 7vw 16vw;
  transition: scale 300ms var(--ease-in-out-quad);

  --verse-numbers-display: inline;
  --body-font-size: var(--22px);
  --title-font-size: calc(var(--body-font-size) * 1.6363636364);
  --body-line-length: 60ch;
}

.chapter-title {
  width: 100%;
}

.body-content {
  max-width: var(--body-line-length);
  font-size: var(--body-font-size);
  line-height: 157%;
  font-family: var(--font-family-body);
  color: var(--color-text-secondary);
}
:deep(.v) {
  display: none;
}
.show-verse-numbers :deep(.v) {
  display: var(--verse-numbers-display);
  margin-right: 0.18rem;
  color: var(--color-text-tertiary);
  vertical-align: super;
  font-size: 0.6em;
  line-height: 0;
  position: relative;
  top: 0.2em;
  -webkit-font-smoothing: auto;
  /* font-family: var(--font-family-heading); */
}

:deep(p:first-child) {
  margin-top: 0;
}

.chapter-title {
  align-items: center;
  justify-content: center;
  padding: 2.1em 0;
  font-family: var(--font-family-heading);
  font-size: var(--title-font-size);
  margin: 0;
  font-weight: 700;
  text-align: center;
  color: var(--color-text-primary);
}

:deep(.wj) {
  transition: color 200ms var(--ease-in-out-cubic);
}
.highlight-jesus-words :deep(.wj) {
  color: var(--color-text-jesus-words);
}

.btn-settings {
  position: fixed;
  bottom: 16px;
  right: 16px;
}

.btn-navigation {
  position: fixed;
  top: 16px;
  left: 16px;
}

.menu-active {
  scale: 0.99;
  /*  I think I can use transform-origin to prevent the weird long page side effects of just regular scale */
  /* height: 100vh;
  overflow: hidden; */
}

.settings-view-active .btn-settings {
  opacity: 0;
  pointer-events: none;
}

@media (max-width: 1024px) {
  .reader {
    padding: 0 7vw 7vw;
  }
}

@media (max-width: 500px) {
  .body-content {
    font-size: var(--20px);
    line-height: 150%;
    padding-bottom: 0;
  }

  .reader {
    padding: 0 6vw;
  }

  .chapter-title {
    padding: 75px 0 50px;
  }

  .btn-settings {
    position: fixed;
    top: 16px;
    right: 16px;
  }
}
</style>
