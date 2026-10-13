<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { useActiveSection } from "@/composables/useActiveSection";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const menuOpen = ref(false);
const { activeSection } = useActiveSection(links.map((link) => link.id));

function closeMenu() {
  menuOpen.value = false;
}
</script>

<template>
  <header class="sticky top-0 z-50 h-nav border-b-2 border-space-indigo bg-parchment" @keydown.esc="closeMenu">
    <div class="mx-auto flex h-full max-w-content items-center justify-between px-6">
      <a href="#home" class="font-display text-xl font-bold text-space-indigo" @click="closeMenu">
        [Inisial]
      </a>

      <nav aria-label="Navigasi utama" class="hidden items-center gap-8 md:flex">
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="border-b-2 py-2 font-body text-ui font-medium transition-colors duration-200 hover:border-air-force-blue focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-twilight-indigo"
          :class="activeSection === link.id ? 'border-air-force-blue text-space-indigo' : 'border-transparent text-twilight-indigo'"
          :aria-current="activeSection === link.id ? 'page' : undefined"
          @click="closeMenu"
        >
          {{ link.label }}
        </a>
      </nav>

      <BaseButton
        variant="hamburger"
        class="md:hidden"
        :aria-label="menuOpen ? 'Tutup navigasi' : 'Buka navigasi'"
        :aria-expanded="menuOpen"
        aria-controls="mobile-navigation"
        @click="menuOpen = !menuOpen"
      />
    </div>

    <nav
      v-if="menuOpen"
      id="mobile-navigation"
      aria-label="Navigasi mobile"
      class="absolute inset-x-0 top-full grid gap-2 border-b-2 border-space-indigo bg-parchment px-6 py-4 shadow-retro md:hidden"
    >
      <a
        v-for="link in links"
        :key="link.id"
        :href="`#${link.id}`"
        class="rounded-control px-4 py-3 font-body text-base font-medium text-space-indigo hover:bg-bone focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-twilight-indigo"
        :aria-current="activeSection === link.id ? 'page' : undefined"
        @click="closeMenu"
      >
        {{ link.label }}
      </a>
    </nav>
  </header>
</template>
