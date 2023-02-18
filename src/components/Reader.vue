<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const content = ref("");
const book: string = route.params.book
  ? route.params.book.toString()
  : "matthew";
const chapter: string = route.params.chapter
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

const books: Books = {
  genesis: "GEN",
  exodus: "EXO",
  leviticus: "LEV",
  numbers: "NUM",
  deuteronomy: "DEU",
  joshua: "JOS",
  judges: "JDG",
  ruth: "RUT",
  "1samuel": "1SA",
  "2samuel": "2SA",
  "1kings": "1KI",
  "2kings": "2KI",
  "1chronicles": "1CH",
  "2chronicles": "2CH",
  ezra: "EZR",
  nehemiah: "NEH",
  esther: "EST",
  job: "JOB",
  psalms: "PSA",
  proverbs: "PRO",
  ecclesiastes: "ECC",
  songofsolomon: "SNG",
  isaiah: "ISA",
  jeremiah: "JER",
  lamentations: "LAM",
  ezekiel: "EZK",
  daniel: "DAN",
  hosea: "HOS",
  joel: "JOL",
  amos: "AMO",
  obadiah: "OBA",
  jonah: "JON",
  micah: "MIC",
  nahum: "NAM",
  habakkuk: "HAB",
  zephaniah: "ZEP",
  haggai: "HAG",
  zechariah: "ZEC",
  malachi: "MAL",
  matthew: "MAT",
  mark: "MRK",
  luke: "LUK",
  john: "JHN",
  acts: "ACT",
  romans: "ROM",
  "1corinthians": "1CO",
  "2corinthians": "2CO",
  galatians: "GAL",
  ephesians: "EPH",
  philippians: "PHP",
  colossians: "COL",
  "1thessalonians": "1TH",
  "2thessalonians": "2TH",
  "1timothy": "1TI",
  "2timothy": "2TI",
  titus: "TIT",
  philemon: "PHM",
  hebrews: "HEB",
  james: "JAS",
  "1peter": "1PE",
  "2peter": "2PE",
  "1john": "1JN",
  "2john": "2JN",
  "3john": "3JN",
  jude: "JUD",
  revelation: "REV",
};

fetch(
  `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/chapters/${books[book]}.${chapter}`,
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
  <main class="reader">
    <h1 class="chapter-title">{{ formatBookTitle() }} {{ chapter }}</h1>
    <section v-html="content"></section>
  </main>
</template>

<style scoped>
.reader {
  padding: 0 7vw;
}

section {
  max-width: 60ch;
  padding-bottom: 16rem;
  font-size: var(--22px);
  line-height: 157%;
  font-family: var(--font-family-body);
  color: var(--color-text-secondary);
}

:deep(.v) {
  /* display: none; */
  margin-right: 0.18rem;
  color: var(--color-text-tertiary);
  vertical-align: super;
  font-size: var(--14px);
  line-height: 0;
  position: relative;
  top: 3px;
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

:deep(.wj) {
  color: var(--color-text-jesus-words);
}

@media (max-width: 500px) {
  section {
    line-height: 150%;
    padding-bottom: 0;
    font-size: var(--20px);
  }

  .reader {
    padding: 0 4vw;
  }

  .chapter-title {
    padding: 50px 0;
  }
}
</style>
