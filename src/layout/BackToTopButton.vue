<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const isVisible = ref(false);
let aboutSection: HTMLElement | null = null;

function updateVisibility() {
  if (!aboutSection) return;

  // Reveal the FAB shortly before About enters the viewport.
  isVisible.value = aboutSection.getBoundingClientRect().top <= window.innerHeight - 80;
}

onMounted(() => {
  aboutSection = document.getElementById("about");
  updateVisibility();
  window.addEventListener("scroll", updateVisibility, { passive: true });
  window.addEventListener("resize", updateVisibility);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateVisibility);
  window.removeEventListener("resize", updateVisibility);
});
</script>

<template>
  <Transition name="fab-fade" appear>
    <a
      v-if="isVisible"
      href="#home"
      aria-label="Kembali ke atas"
      class="fixed bottom-6 right-6 z-20 hidden h-14 w-14 items-center justify-center rounded-full border-retro bg-space-indigo text-parchment shadow-retro transition duration-250 hover:bg-twilight-indigo focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-twilight-indigo sm:flex"
    >
      <svg aria-hidden="true" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </a>
  </Transition>
</template>

<style>
.fab-fade-enter-active,
.fab-fade-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.fab-fade-enter-from,
.fab-fade-leave-to {
  opacity: 0;
  transform: translateY(0.5rem);
}

@media (prefers-reduced-motion: reduce) {
  .fab-fade-enter-active,
  .fab-fade-leave-active {
    transition: none;
  }
}
</style>
