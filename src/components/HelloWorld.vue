<script setup lang="ts">
import { ref } from "vue";

const content = ref("");

fetch(
  "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/chapters/MAT.7",
  {
    headers: {
      "api-key": "d24e35d1e97b1b9c536b80f5416d244e",
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
    content.value = data.data.content.replaceAll("¶ ", "");
  });
</script>

<template>
  <h1 class="chapter-title">Matthew 7</h1>
  <section v-html="content"></section>
</template>

<style scoped>
section {
  max-width: 60ch;
  padding-bottom: 16rem;
  font-size: var(--22px);
  line-height: 150%;
  font-family: var(--font-family-body);
  color: var(--color-text-secondary);
}

:deep(.v) {
  /* display: none; */
  margin-right: 0.15rem;
  color: var(--color-text-tertiary);
  vertical-align: super;
  font-size: var(--12px);
  line-height: 0;
  position: relative;
  top: 1.5px;
  -webkit-font-smoothing: auto;
  /* font-family: var(--font-family-heading); */
}

:deep(p:first-child) {
  margin-top: 0;
}

.chapter-title {
  align-items: center;
  justify-content: center;
  padding: 75px 0;
  font-family: var(--font-family-heading);
  font-size: var(--36px);
  margin: 0;
  text-align: center;
  color: var(--color-text-primary);
}
</style>
