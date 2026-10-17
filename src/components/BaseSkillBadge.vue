<script setup lang="ts">
import BrandIcon from "@/components/BrandIcon.vue";

interface Props {
  label: string;
  icon: string;
  color: string;
}

defineProps<Props>();
</script>

<template>
  <span
    class="inline-flex min-h-12 max-w-full items-center gap-2 rounded-control border-retro px-4 py-2 font-display text-sm font-semibold text-white shadow-retro sm:text-base"
    :style="{ backgroundColor: color }"
  >
    <BrandIcon :icon="icon" :name="label" />
    <span>{{ label }}</span>
  </span>
</template>
