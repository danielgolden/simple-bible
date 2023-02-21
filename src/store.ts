// store.js
import { reactive } from "vue";

export const store = reactive({
  settingsViewActive: false,
  navigationActive: false,
  bodyFont: "kings-caslon",
  theme: "dark",
  displayVerseNumbers: true,
  highlightJesusWords: true,
  lineLength: 60,
  fontSize: 1.375,
  readerElement: <null | HTMLElement>null,
});
