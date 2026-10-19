<script setup lang="ts">
interface Props {
  narrow?: boolean;
  wide?: boolean;
}
 
withDefaults(defineProps<Props>(), {
  narrow: false,
  wide: false,
});
</script>

<template>
  <div class="mx-auto w-full px-6" :class="narrow ? 'max-w-narrow' : wide ? 'max-w-content-wide' : 'max-w-content'">
    <slot />
  </div>
</template>
