<script setup lang="ts">
interface Props {
  narrow?: boolean;
}

withDefaults(defineProps<Props>(), {
  narrow: false,
});
</script>

<template>
  <div class="mx-auto w-full px-6" :class="narrow ? 'max-w-narrow' : 'max-w-content'">
    <slot />
  </div>
</template>
