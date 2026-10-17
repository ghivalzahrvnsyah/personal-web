<script setup lang="ts">
interface Props {
  title: string;
  organization: string;
  period: string;
}

defineProps<Props>();
</script>

<template>
  <li class="relative pb-6 pl-8 font-body text-base text-space-indigo last:pb-0 before:absolute before:left-0 before:top-1 before:z-10 before:size-4 before:rounded-full before:border-2 before:border-space-indigo before:bg-bone after:absolute after:left-[0.4375rem] after:top-3 after:-bottom-3 after:w-0.5 after:bg-space-indigo last:after:hidden">
    <p class="font-semibold">{{ title }}</p>
    <p class="text-twilight-indigo">{{ organization }}</p>
    <p class="text-sm text-twilight-indigo">{{ period }}</p>
  </li>
</template>
