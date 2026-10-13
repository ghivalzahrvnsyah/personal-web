<script setup lang="ts">
interface Props {
  label: string;
  variant?: "skill" | "tag";
}

withDefaults(defineProps<Props>(), {
  variant: "skill",
});
</script>

<template>
  <span
    class="inline-flex max-w-full items-center gap-2 border-retro bg-bone font-body font-medium text-space-indigo"
    :class="variant === 'skill' ? 'rounded-chip px-4 py-2 text-ui' : 'rounded-pill px-3 py-1 text-sm'"
  >
    <span v-if="$slots.icon" class="inline-flex shrink-0 items-center justify-center" aria-hidden="true">
      <slot name="icon" />
    </span>
    <span class="truncate">{{ label }}</span>
  </span>
</template>
