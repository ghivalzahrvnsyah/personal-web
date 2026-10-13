<script setup lang="ts">
import { computed } from "vue";

type ButtonVariant = "cta" | "secondary" | "hamburger";

interface Props {
  variant?: ButtonVariant;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
  iconOnly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "secondary",
  type: "button",
  disabled: false,
});

const classes = computed(() => {
  const base = "btn border-retro shadow-retro font-body font-bold transition duration-retro focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-twilight-indigo";

  if (props.variant === "cta") {
    return `${base} min-h-14 w-full rounded-pill bg-space-indigo px-8 text-cta text-parchment hover:border-twilight-indigo hover:bg-twilight-indigo md:w-auto`;
  }

  if (props.variant === "hamburger") {
    return `${base} min-h-12 min-w-12 rounded-control bg-transparent p-0 text-space-indigo hover:bg-bone`;
  }

  if (props.iconOnly) {
    return `${base} h-12 min-h-12 w-12 min-w-12 rounded-control bg-space-indigo p-0 text-base text-parchment hover:border-twilight-indigo hover:bg-twilight-indigo`;
  }

  return `${base} min-h-12 rounded-control bg-space-indigo px-6 text-base text-parchment hover:border-twilight-indigo hover:bg-twilight-indigo`;
});
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :class="classes"
    :href="href"
    :type="href ? undefined : type"
    :disabled="href ? undefined : disabled"
    :aria-label="ariaLabel"
  >
    <slot />
    <svg
      v-if="variant === 'hamburger'"
      aria-hidden="true"
      class="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  </component>
</template>
