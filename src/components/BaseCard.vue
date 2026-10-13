<script setup lang="ts">
interface Props {
  as?: "button" | "div";
  type?: "button" | "submit" | "reset";
}

withDefaults(defineProps<Props>(), {
  as: "button",
  type: "button",
});
</script>

<template>
  <component
    :is="as"
    :type="as === 'button' ? type : undefined"
    class="border-retro shadow-retro block overflow-hidden rounded-card bg-parchment text-left transition duration-retro hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-retro-lg focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-twilight-indigo"
  >
    <slot />
  </component>
</template>
