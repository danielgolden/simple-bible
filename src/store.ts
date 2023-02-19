// store.js
import { reactive } from "vue";

export const store = reactive({
  settingsViewActive: false,
  bodyFont: "kings-caslon",
  theme: "dark",
  displayVerseNumbers: true,
  lineLength: 60,
  fontSize: 22,
});
