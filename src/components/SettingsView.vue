<script setup lang="ts">
import { watch } from "vue";
import { store } from "../store";
import Button from "./Button.vue";
import Icon from "./Icon.vue";

watch(
  () => store.theme,
  (newValue) => {
    document.documentElement.dataset.theme = store.theme;
  }
);

watch(
  () => store.displayVerseNumbers,
  (newValue) => {
    store.readerElement!.style.setProperty(
      "--verse-numbers-display",
      store.displayVerseNumbers ? "inline" : "none"
    );
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
  <section class="settings">
    <Button
      class="btn-close-settings"
      icon="cross-1"
      @click="store.settingsViewActive = false"
      type="tertiary"
    />
    <div class="settings-primary-content">
      <div class="setting-block setting-block-theme">
        <label class="setting-label">Theme</label>
        <div class="setting-block-control control-theme">
          <Button
            icon="sun"
            class="btn-setting-block"
            @click="store.theme = 'light'"
            :inactive="store.theme === 'dark'"
            >Light</Button
          >
          <Button
            icon="moon"
            class="btn-setting-block"
            @click="store.theme = 'dark'"
            :inactive="store.theme === 'light'"
            >Dark</Button
          >
        </div>
      </div>
      <div class="setting-block setting-block-verse-number">
        <label class="setting-label">Verse numbers</label>
        <div class="setting-block-control control-verse-numbers">
          <Button
            icon="eye-open"
            class="btn-setting-block"
            @click="store.displayVerseNumbers = true"
            :inactive="!store.displayVerseNumbers"
            >Visible</Button
          >
          <Button
            icon="eye-closed"
            class="btn-setting-block"
            @click="store.displayVerseNumbers = false"
            :inactive="store.displayVerseNumbers"
            >Hidden</Button
          >
        </div>
      </div>
      <div class="setting-block setting-block-font">
        <label class="setting-label">Font</label>
        <ul class="setting-block-control control-font">
          <li
            :class="{
              'control-font-option': true,
              active: store.bodyFont === 'kings-caslon',
            }"
            data-font="kings-caslon"
            @click="store.bodyFont = 'kings-caslon'"
            :inactive="store.bodyFont !== 'kings-caslon'"
          >
            King's Caslon
            <Icon
              v-if="store.bodyFont === 'kings-caslon'"
              name="check"
              color="var(--color-text-primary)"
            />
          </li>
          <li
            :class="{
              'control-font-option': true,
              active: store.bodyFont === 'plantin',
            }"
            data-font="franklin-gothic-atf"
            @click="store.bodyFont = 'plantin'"
          >
            Plantin
            <Icon
              v-if="store.bodyFont === 'plantin'"
              name="check"
              color="var(--color-text-primary)"
            />
          </li>
          <li
            :class="{
              'control-font-option': true,
              active: store.bodyFont === 'freight-text-pro',
            }"
            data-font="freight-text-pro"
            @click="store.bodyFont = 'freight-text-pro'"
          >
            Freight Text
            <Icon
              v-if="store.bodyFont === 'freight-text-pro'"
              name="check"
              color="var(--color-text-primary)"
            />
          </li>
          <li
            :class="{
              'control-font-option': true,
              active: store.bodyFont === 'system',
            }"
            data-font="system"
            @click="
              store.bodyFont =
                'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'
            "
          >
            System font
            <Icon
              v-if="store.bodyFont.includes('system')"
              name="check"
              color="var(--color-text-primary)"
            />
          </li>
        </ul>
      </div>
      <div class="setting-block setting-block-font-size">
        <label class="setting-label" for="font-size">Font size</label>
        <div class="setting-block-control control-font-size">
          <input
            type="range"
            class="settings-slider"
            id="font-size"
            v-model="store.fontSize"
            name="volume"
            step=".25"
            min="1"
            max="2.25"
          />
          <div class="settings-slider-labels">
            <span class="settings-slider-label-min">Aa</span>
            <span class="settings-slider-label-max">Aa</span>
          </div>
        </div>
      </div>
      <div class="setting-block setting-block-line-length">
        <label class="setting-label" for="line-length">Line length</label>
        <div
          class="setting-block-control setting-block-control-slider control-line-length"
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
          <div class="settings-slider-labels">
            <span class="settings-slider-label-min"
              ><Icon
                name="rectangle-vertical"
                color="var(--color-text-tertiary)"
            /></span>
            <span class="settings-slider-label-max"
              ><Icon name="box" color="var(--color-text-tertiary)"
            /></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.settings {
  width: 75%;
  position: fixed;
  left: 50%;
  bottom: 36px;
  translate: -50% 0;
  padding: 24px;
  background-color: var(--color-bg-surface-2);
  border: 1px solid var(--color-border-primary);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 10%), 0 4px 15px rgb(0 0 0 / 5%),
    0 20px 75px rgb(0 0 0 / 20%);
  overflow: hidden;
}

.settings-primary-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "theme          font     font-size"
    "verse-numbers  font     line-length";
  row-gap: 16px;
  column-gap: 36px;
}

.btn-close-settings {
  position: absolute;
  top: 0px;
  right: 0px;
}

.setting-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.setting-block-theme {
  grid-area: theme;
}
.setting-block-verse-numbers {
  grid-area: verse-numbers;
}
.setting-block-font {
  grid-area: font;
}
.setting-block-font-size {
  grid-area: font-size;
}
.setting-block-line-length {
  grid-area: line-length;
}
.btn-setting-block {
  flex-grow: 1;
}

.setting-label {
  font-size: var(--14px);
  font-weight: 500;
  color: var(--color-text-primary);
}

.control-theme,
.control-verse-numbers {
  display: flex;
  gap: 12px;
}

.control-font {
  list-style-type: none;
  margin: 0;
  padding: 0;
  border: 1px solid var(--color-border-primary);
  border-radius: 8px;
  overflow: hidden;
}

.control-font-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
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

.control-font-option:last-child {
  border-bottom: none;
}

.control-font-option[data-font="kings-caslon"] {
  font-size: var(--18px);
  font-family: kings-caslon;
}

.control-font-option[data-font="franklin-gothic-atf"] {
  font-family: franklin-gothic-atf;
}

.control-font-option[data-font="freight-text-pro"] {
  font-size: var(--19px);
  font-family: freight-text-pro;
}

.control-font-option[data-font="system"] {
  font-size: var(--17px);
  font-family: "Inter", system-ui, Avenir, Helvetica, Arial, sans-serif;
}

.setting-block-control-slider {
  margin-top: -5px;
}

.settings-slider {
  width: 100%;
  margin-bottom: 0;
}

.settings-slider-labels {
  margin-top: -2px;
  display: flex;
  justify-content: space-between;
  color: var(--color-text-muted);
}

.control-font-size .settings-slider-label-min {
  font-size: var(--12px);
}

.control-font-size .settings-slider-label-max {
  font-size: var(--18px);
}
</style>
