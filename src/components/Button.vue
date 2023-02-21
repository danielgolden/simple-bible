<script lang="ts" setup>
import Icon from "./Icon.vue";
import { PropType, useSlots } from "vue";

const slots = useSlots();
const props = defineProps({
  type: {
    required: false,
    type: String as PropType<"primary" | "secondary" | "tertiary" | "danger">,
  },
  icon: {
    required: false,
    type: String,
  },
  inactive: {
    required: false,
    type: Boolean,
  },
});
</script>

<template>
  <button
    :class="{
      btn: true,
      'btn-primary': props.type === 'primary' || !props.type,
      'btn-secondary': props.type === 'secondary',
      'btn-tertiary': props.type === 'tertiary',
      'btn-danger': props.type === 'danger',
      'has-icon': props.icon,
      'icon-only': props.icon && !slots.default,
      inactive: props.inactive,
    }"
    v-bind="$attrs"
  >
    <Icon
      v-if="props.icon"
      :name="props.icon"
      :color="
        props.inactive
          ? 'var(--color-text-tertiary)'
          : 'var(--color-icon-primary)'
      "
      class="btn-icon"
    />
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 44px;
  flex-shrink: 0;
  padding-inline: 8px;
  border-radius: 8px;
  font-family: var(--font-family-primary);
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 50ms var(--ease-out-quad);
  white-space: nowrap;
  transition: all 50ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

/*-- Primary buttons --*/
.btn-primary {
  padding: 8px 14px;
  background-color: transparent;
  box-shadow: inset 0 0 0 1px var(--color-border-button-primary);
  color: var(--color-text-button-primary);
}

.btn-primary.inactive {
  background-color: transparent;
  color: var(--color-text-muted);
  font-weight: 400;
  box-shadow: inset 0 0 0 1px var(--color-border-primary);
}
.btn-primary.inactive :deep(.btn-icon) {
  opacity: 0.75;
}

.btn-primary.inactive:hover {
  color: var(--color-text-secondary);
}

.btn-primary.has-icon:not(.icon-only) {
  padding: 6px 14px 6px 14px;
}

.btn-primary:hover {
  background-color: var(--color-bg-button-hover-primary);
  box-shadow: inset 0 0 0 1px var(--color-border-button-hover-primary),
    0 1px 3px rgb(0 0 0 / 3%), 0 3px 5px rgb(0 0 0 / 1.5%);
}

.btn-primary:active {
  translate: 0 1px;
}

/*-- Secondary buttons --*/
.btn-tertiary {
  padding: 7px 14px 10px;
  background-color: var(--color-bg-button-tertiary);
  box-shadow: inset 0 0 0 1px var(--color-border-button-tertiary);
  color: var(--color-text-button-tertiary);
}

.btn-tertiary.has-icon:not(.icon-only) {
  padding: 7px 14px 10px 11px;
}

.btn-tertiary:hover {
  background-color: var(--color-bg-button-hover-tertiary);
  box-shadow: inset 0 0 0 1px var(--color-border-button-hover-tertiary),
    0 1px 3px rgb(0 0 0 / 3%), 0 3px 5px rgb(0 0 0 / 1.5%);
}

.btn-tertiary:active {
  background-color: var(--color-bg-button-hover-primary);
  /* box-shadow: inset 0 0 0 1px var(--color-border-button-hover-tertiary),
    0 1px 3px rgb(0 0 0 / 3%), 0 3px 5px rgb(0 0 0 / 1.5%); */
}

.icon-only {
  width: 44px;
  height: 44px;
  padding: 0;
}
</style>
