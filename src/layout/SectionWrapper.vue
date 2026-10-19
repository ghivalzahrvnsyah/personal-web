<script setup lang="ts">
import Container from "@/layout/Container.vue";

interface Props {
  id: string;
  background?: "parchment" | "bone";
  label?: string;
  narrow?: boolean;
  wide?: boolean;
}
 
withDefaults(defineProps<Props>(), {
  background: "parchment",
  narrow: false,
  wide: false,
});
</script>

<template>
  <section
    :id="id"
    class="border-t-2 border-space-indigo py-12 md:py-16"
    :class="background === 'bone' ? 'bg-bone' : 'bg-parchment'"
  >
    <Container :narrow="narrow" :wide="wide || Boolean(label)">
      <header v-if="label" class="mb-8 flex items-center gap-6">
        <p class="shrink-0 font-body text-ui font-medium text-twilight-indigo">{{ label }}</p>
        <span class="h-0 flex-1 border-t-2 border-space-indigo" aria-hidden="true" />
      </header>
      <div :class="wide ? '' : 'mx-auto w-full max-w-content'">
        <slot />
      </div>
    </Container>
  </section>
</template>
