<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Button from "./Button.vue";
import Icon from "./Icon.vue";
</script>

<template>
  <section class="settings">
    <div class="settings-primary-content">
      <div class="setting-block">
        <label class="setting-label">Theme</label>
        <div class="setting-block-control control-theme">
          <Button icon="sun" class="btn-setting-block">Light</Button>
          <Button icon="moon" class="btn-setting-block" inactive>Dark</Button>
        </div>
      </div>
      <div class="setting-block">
        <label class="setting-label">Verse numbers</label>
        <div class="setting-block-control control-verse-numbers">
          <Button icon="eye-open" class="btn-setting-block">Visible</Button>
          <Button icon="eye-closed" class="btn-setting-block" inactive
            >Hidden</Button
          >
        </div>
      </div>
      <div class="setting-block">
        <label class="setting-label">Font</label>
        <ul class="setting-block-control control-font">
          <li class="control-font-option active" data-font="kings-caslon">
            King's Caslon
            <Icon v-if="true" name="check" color="var(--color-text-primary)" />
          </li>
          <li class="control-font-option" data-font="franklin-gothic-atf">
            Franklin Gothic
            <Icon v-if="false" name="check" color="var(--color-text-primary)" />
          </li>
          <li class="control-font-option" data-font="freight-text-pro">
            Freight Text
            <Icon v-if="false" name="check" color="var(--color-text-primary)" />
          </li>
          <li class="control-font-option" data-font="system">
            System font
            <Icon v-if="false" name="check" color="var(--color-text-primary)" />
          </li>
        </ul>
      </div>
      <div class="setting-block">
        <label class="setting-label"></label>
        <div class="setting-block-control"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.settings {
  position: fixed;
  right: 0;
  top: 0;
  width: 320px;
  height: 100vh;
  padding: 36px;
  background-color: var(--color-bg-surface-2);
  border-left: 1px solid var(--color-border-secondary);
}

.settings-primary-content {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.setting-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.btn-setting-block {
  flex-grow: 1;
}

.setting-label {
  font-size: var(--14px);
  font-weight: 500;
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
  padding: 10px 16px;
  border-bottom: 1px solid var(--color-border-primary);
  cursor: pointer;
  color: var(--color-text-muted);
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
</style>
