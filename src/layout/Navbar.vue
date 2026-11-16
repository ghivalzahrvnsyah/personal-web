<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { useActiveSection } from "@/composables/useActiveSection";
import { supabase } from "@/lib/supabaseClient";

const logoUrl = supabase.storage
  .from("portofolio-assets")
  .getPublicUrl("logo/logo-gh.svg").data.publicUrl;

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const menuOpen = ref(false);
const isScrolled = ref(false);
const isExpanded = ref(false);
const { activeSection } = useActiveSection(links.map((link) => link.id));

function updateScrollState() {
  isScrolled.value = window.scrollY > 80;

  if (!isScrolled.value) {
    isExpanded.value = false;
    menuOpen.value = false;
  }
}

function closeMenu() {
  menuOpen.value = false;
  isExpanded.value = false;
}

function handleLogoClick(event: MouseEvent) {
  if (isScrolled.value && window.matchMedia("(max-width: 767px)").matches) {
    event.preventDefault();
    isExpanded.value = !isExpanded.value;
    menuOpen.value = isExpanded.value;
    return;
  }

  closeMenu();
}

function expandNavbar() {
  if (!isScrolled.value) return;

  isExpanded.value = true;
  if (window.matchMedia("(max-width: 767px)").matches) menuOpen.value = true;
}

function collapseNavbar(event?: MouseEvent) {
  const nav = event?.currentTarget;
  if (nav instanceof HTMLElement && nav.contains(document.activeElement)) return;

  isExpanded.value = false;
  menuOpen.value = false;
}

function handleFocusOut(event: FocusEvent) {
  const nextTarget = event.relatedTarget;
  if (!(nextTarget instanceof Node) || !event.currentTarget?.contains(nextTarget)) {
    collapseNavbar();
  }
}

onMounted(() => {
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollState);
});
</script>

<template>
  <header class="sticky top-0 z-50 h-nav" @keydown.esc="closeMenu">
    <div
      class="flex items-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      :class="isScrolled
        ? [
            'fixed left-1/2 top-4 z-[60] h-14 -translate-x-1/2 rounded-full border-2 border-space-indigo bg-parchment shadow-retro',
            isExpanded ? 'w-16 md:w-[min(44rem,calc(100vw-2rem))]' : 'w-16',
          ]
        : 'relative mx-auto h-full w-full max-w-content-wide justify-between border-b-2 border-space-indigo bg-parchment px-[clamp(1.5rem,4vw,4rem)]'"
      @mouseenter="expandNavbar"
      @mouseleave="collapseNavbar"
      @focusin="expandNavbar"
      @focusout="handleFocusOut"
    >
      <a
        href="#home"
        class="flex shrink-0 items-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        :class="isScrolled && !isExpanded
          ? 'absolute left-1/2 -translate-x-1/2'
          : isScrolled ? 'ml-3' : ''"
        :aria-label="isScrolled && menuOpen ? 'Tutup navigasi' : 'Ghivalza Harviansyah, ke beranda'"
        :aria-expanded="isScrolled ? isExpanded : undefined"
        @click="handleLogoClick"
      >
        <img :src="logoUrl" alt="Ghivalza Harviansyah" :class="isScrolled ? 'h-8 w-8 object-contain' : 'h-10 w-auto'" />
      </a>

      <nav
        aria-label="Navigasi utama"
        class="hidden items-center gap-6 transition-all duration-300 md:flex"
        :class="isScrolled
          ? isExpanded ? 'mr-4 opacity-100' : 'pointer-events-none max-w-0 overflow-hidden opacity-0'
          : 'mr-0 gap-8 opacity-100'"
        :inert="isScrolled && !isExpanded"
      >
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="whitespace-nowrap border-b-2 py-2 font-body text-ui font-medium transition-colors duration-200 hover:text-space-indigo focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-twilight-indigo"
          :class="activeSection === link.id ? 'border-air-force-blue text-space-indigo' : 'border-transparent text-twilight-indigo'"
          :aria-current="activeSection === link.id ? 'location' : undefined"
          @click="closeMenu"
        >
          {{ link.label }}
        </a>
      </nav>

      <BaseButton
        v-if="!isScrolled"
        variant="hamburger"
        class="md:hidden"
        :aria-label="menuOpen ? 'Tutup navigasi' : 'Buka navigasi'"
        :aria-expanded="menuOpen"
        aria-controls="mobile-navigation"
        @click="menuOpen = !menuOpen"
      />

      <nav
        v-if="menuOpen"
        id="mobile-navigation"
        aria-label="Navigasi mobile"
        class="absolute left-1/2 top-full mt-3 grid w-[calc(100vw-2rem)] -translate-x-1/2 gap-2 rounded-block border-2 border-space-indigo bg-parchment px-4 py-4 shadow-retro md:inset-x-0 md:left-0 md:mt-0 md:w-auto md:translate-x-0 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none"
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
    </div>
  </header>
</template>
