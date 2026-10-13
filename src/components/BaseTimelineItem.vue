<script setup lang="ts">
interface Props {
  title: string;
  organization: string;
  period: string;
}

defineProps<Props>();
</script>

<template>
  <li class="border-l-2 border-space-indigo pl-6 font-body text-base text-space-indigo">
    <p class="font-semibold">{{ title }}</p>
    <p class="text-twilight-indigo">{{ organization }} · {{ period }}</p>
  </li>
</template>
