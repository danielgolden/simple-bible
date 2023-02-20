<script setup lang="ts">
import { watch } from "vue";
import { store } from "../store";
import Button from "./Button.vue";
import Switch from "./Switch.vue";
import Icon from "./Icon.vue";

const fontOptions = [
  {
    id: "caslon",
    displayName: "Caslon",
    value: "kings-caslon",
  },
  {
    id: "plantin",
    displayName: "Plantin",
    value: "plantin",
  },
  {
    id: "freight",
    displayName: "Freight",
    value: "freight-text-pro",
  },
  {
    id: "system",
    displayName: "System font",
    value: "inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
];

watch(
  () => store.theme,
  (newValue) => {
    document.documentElement.dataset.theme = store.theme;
  }
);

watch(
  () => store.bodyFont,
  (newValue) => {
    document.documentElement.style.setProperty(
      "--font-family-body",
      store.bodyFont
    );
  }
);

watch(
  () => store.fontSize,
  (newValue) => {
    store.readerElement!.style.setProperty(
      "--body-font-size",
      `${store.fontSize}rem`
    );
  }
);

watch(
  () => store.lineLength,
  (newValue) => {
    store.readerElement!.style.setProperty(
      "--body-line-length",
      `${store.lineLength}ch`
    );
  }
);
</script>

<template>
  <transition name="overlay">
    <div class="overlay" v-if="store.settingsViewActive"></div>
  </transition>
  <transition name="settings">
    <section class="settings" v-if="store.settingsViewActive">
      <div class="settings-header">
        <Button
          class="btn-close-settings"
          icon="cross-1"
          @click="store.settingsViewActive = false"
          type="tertiary"
        />
      </div>
      <div class="settings-primary-content">
        <div class="settings-section">
          <h3 class="settings-section-heading">Design</h3>

          <div class="setting-block">
            <div class="setting-block-control control-theme">
              <Button
                icon="sun"
                class="btn-setting-block"
                @click="store.theme = 'light'"
                >Light
                <span class="radio-container"
                  ><input
                    type="radio"
                    :checked="store.theme === 'light'" /></span
              ></Button>
              <Button
                icon="moon"
                class="btn-setting-block"
                @click="store.theme = 'dark'"
                >Dark
                <span class="radio-container"
                  ><input
                    type="radio"
                    :checked="store.theme === 'dark'" /></span
              ></Button>
            </div>
          </div>

          <div class="setting-block">
            <ul class="setting-block-control control-font">
              <li
                v-for="font in fontOptions"
                :class="{
                  'control-font-option': true,
                  active: store.bodyFont === font.value,
                }"
                :data-font="font.value"
                @click="store.bodyFont = font.value"
              >
                {{ font.displayName }}
                <Icon
                  v-if="store.bodyFont === font.value"
                  name="check"
                  color="var(--color-text-primary)"
                />
              </li>
            </ul>
          </div>

          <div class="settings-box setting-box-horizontal">
            <div class="settings-row">
              <label class="settings-row-label"
                ><Icon name="font-size" color="var(--color-icon-primary)" />Font
                size</label
              >
              <input
                type="range"
                class="settings-slider"
                id="font-size"
                v-model="store.fontSize"
                name="volume"
                step=".05"
                min=".813"
                max="2.25"
              />
            </div>
            <div class="settings-row">
              <label class="settings-row-label"
                ><Icon name="width" color="var(--color-icon-primary)" /> Line
                length</label
              >
              <input
                type="range"
                class="settings-slider"
                id="font-size"
                v-model="store.lineLength"
                name="volume"
                min="50"
                max="70"
              />
            </div>
          </div>
        </div>

        <div class="settings-section">
          <h3 class="settings-section-heading">Content</h3>
          <div class="settings-box setting-box-horizontal">
            <label class="settings-row" for="verse-numbers">
              <span class="settings-row-label">Verse numbers</span>
              <Switch id="verse-numbers" v-model="store.displayVerseNumbers" />
            </label>
            <label class="settings-row" for="jesus-words">
              <span class="settings-row-label">Jesus' words in red</span>
              <Switch id="jesus-words" v-model="store.highlightJesusWords" />
            </label>
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>

<style scoped>
.overlay {
  inset: 0;
  position: fixed;
  background-color: var(--color-bg-overlay);
}
.settings {
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 100vh;
  padding: 36px;
  background-color: var(--color-bg-surface-1);
  border-left: 1px solid var(--color-border-secondary);
  /* box-shadow: -2px 0 10px rgb(0 0 0 / 10%), -4px 0 15px rgb(0 0 0 / 5%),
    -20px 0px 75px rgb(0 0 0 / 20%); */
  overflow: auto;
  z-index: 1;
}

.settings-primary-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 36px;
}

.settings-header {
  margin-top: -16px;
  display: flex;
  justify-content: flex-end;
}

.settings-heading {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.settings-heading:not(:first-child) {
  margin-top: 24px;
}

.setting-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.setting-block-horizontal {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  border: 1px solid var(--color-border-primary);
  padding: 8px 16px;
  border-radius: 6px;
}

.setting-label {
  display: flex;
  flex-grow: 1;
  gap: 8px;
  align-items: center;
  font-size: var(--14px);
  font-weight: 400;
  color: var(--color-text-primary);
}

.setting-block-horizontal .setting-label {
  width: 120px;
}

.control-verse-numbers {
  display: flex;
  gap: 12px;
}

.control-font {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  list-style-type: none;
  margin: 0;
  padding: 0;
  border: 1px solid var(--color-border-primary);
  border-radius: 6px;
  overflow: hidden;
}

.control-font-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 16px;
  border-bottom: 1px solid var(--color-border-primary);
  cursor: pointer;
  color: var(--color-text-muted);
  transition: all 35ms var(--ease-out-quad);
}

.control-font-option.active {
  color: var(--color-text-primary);
  background-color: var(--color-bg-interactive-active);
}
.control-font-option.active:hover {
  background-color: var(--color-bg-interactive-active-hover);
}
.control-font-option:hover {
  background-color: var(--color-bg-interactive-hover);
}

.control-font-option:last-child,
.control-font-option:nth-child(3) {
  border-bottom: none;
}

.control-font-option:nth-child(odd) {
  border-right: 1px solid var(--color-border-primary);
}

.control-font-option[data-font="kings-caslon"] {
  font-size: var(--17px);
  font-family: kings-caslon;
}

.control-font-option[data-font="plantin"] {
  font-size: var(--16px);
  font-family: plantin;
}

.control-font-option[data-font="freight-text-pro"] {
  font-size: var(--17px);
  font-family: freight-text-pro;
}

.control-font-option:last-child {
  font-size: var(--15px);
  font-family: "Inter", system-ui, Avenir, Helvetica, Arial, sans-serif;
}

.control-theme {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
}

.radio-container {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
}

.settings-slider {
  width: 100%;
  margin-bottom: 0;
}

.settings-slider-labels {
  margin-top: -2px;
  display: none;
  justify-content: space-between;
  color: var(--color-text-muted);
}

.control-font-size .settings-slider-label-min {
  font-size: var(--12px);
}

.control-font-size .settings-slider-label-max {
  font-size: var(--18px);
}

.setting-block-control-slider {
  margin-top: -9px;
  flex-grow: 1;
}

/*-- New settings styles --*/

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.settings-section-heading {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-muted);
}

.settings-box {
  border: 1px solid var(--color-border-primary);
  border-radius: 6px;
}

.settings-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-border-primary);
  padding: 12px 16px;
}

.settings-row > :nth-child(2) {
  justify-self: end;
}

.settings-row:last-child {
  border: none;
}

.settings-row-label {
  display: flex;
  flex-grow: 1;
  gap: 8px;
  align-items: center;
  font-size: var(--14px);
  font-weight: 400;
  color: var(--color-text-primary);
}

span.settings-row-label {
  cursor: pointer;
}

.settings-row > input[type="range"] {
  margin: 0;
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

.settings-enter-active {
  transition: translate 500ms var(--ease-out-quint);
}
.settings-leave-active {
  transition: translate 200ms var(--ease-in-quad);
}

.settings-enter-from,
.settings-leave-to {
  translate: 373px 0;
}
</style>
