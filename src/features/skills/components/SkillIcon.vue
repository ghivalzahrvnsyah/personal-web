<script setup lang="ts">
import { computed } from "vue";

interface Props {
  icon: string;
}

const props = defineProps<Props>();

const iconPaths: Record<string, string[]> = {
  generic: ["M12 3 14.8 9.2 21 12l-6.2 2.8L12 21l-2.8-6.2L3 12l6.2-2.8L12 3Z"],
  code: ["m8 8-4 4 4 4", "m16 8 4 4-4 4", "m14 5-4 14"],
  design: ["M12 3a9 9 0 1 0 0 18h1.2a2 2 0 0 0 1.4-3.4 1.5 1.5 0 0 1 1.1-2.6H18a3 3 0 0 0 3-3A9 9 0 0 0 12 3Z", "M7.5 10h.01", "M11 7h.01", "M15.5 8h.01"],
  tools: ["M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4L15 12l-3-3 2.7-2.7Z"],
};

const paths = computed(() => iconPaths[props.icon] ?? iconPaths.generic);
</script>

<template>
  <svg
    aria-hidden="true"
    class="h-5 w-5 shrink-0 text-space-indigo"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path v-for="path in paths" :key="path" :d="path" />
  </svg>
</template>
