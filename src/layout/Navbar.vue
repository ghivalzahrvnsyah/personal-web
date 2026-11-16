<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
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
const scrollStage = ref<"top" | "compact">("top");
const isExpanded = ref(false);
const hoverEnabled = ref(true);
const isScrolled = computed(() => scrollStage.value !== "top");
const { activeSection } = useActiveSection(links.map((link) => link.id));

function setScrollStage(stage: "top" | "compact") {
  if (scrollStage.value === stage) return;

  hoverEnabled.value = stage !== "compact";
  scrollStage.value = stage;
  isExpanded.value = false;
  menuOpen.value = false;
}

function updateScrollState() {
  const scrollY = window.scrollY;

  setScrollStage(scrollY <= 80 ? "top" : "compact");
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
  if (scrollStage.value !== "compact") return;

  isExpanded.value = true;
  if (window.matchMedia("(max-width: 767px)").matches) menuOpen.value = true;
}

function expandNavbarFromPointer() {
  if (hoverEnabled.value) expandNavbar();
}

function handlePointerMove(event: PointerEvent) {
  if (hoverEnabled.value || event.pointerType === "touch") return;
  hoverEnabled.value = true;

  if (event.target instanceof Element && event.target.closest("[data-floating-navbar]")) {
    expandNavbar();
  }
}

function collapseNavbar(event?: MouseEvent) {
  const nav = event?.currentTarget;
  if (nav instanceof HTMLElement && nav.contains(document.activeElement)) return;

  if (scrollStage.value !== "compact") return;

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
  <header class="pointer-events-none fixed inset-x-0 top-4 z-50" @keydown.esc="closeMenu">
    <div
      data-floating-navbar
      class="pointer-events-auto relative mx-auto flex h-14 items-center rounded-full border-2 border-space-indigo bg-parchment shadow-retro transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      :class="[
        !isScrolled
          ? 'w-[min(44rem,calc(100vw-2rem))] justify-between px-4'
          : isExpanded
            ? 'w-16 justify-center md:w-[min(44rem,calc(100vw-2rem))] md:justify-between md:px-4'
            : 'w-16 justify-center',
      ]"
      @mouseenter="expandNavbarFromPointer"
      @mouseleave="collapseNavbar"
      @focusin="expandNavbar"
      @focusout="handleFocusOut"
      @pointermove="handlePointerMove"
    >
      <a
        href="#home"
        class="absolute flex items-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        :class="!isScrolled
          ? 'left-4'
          : isExpanded
            ? 'left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0'
            : 'left-1/2 -translate-x-1/2'"
        :aria-label="isScrolled && menuOpen ? 'Tutup navigasi' : 'Ghivalza Harviansyah, ke beranda'"
        :aria-expanded="isScrolled ? isExpanded : undefined"
        @click="handleLogoClick"
      >
        <img
          :src="logoUrl"
          alt="Ghivalza Harviansyah"
          class="object-contain transition-[width,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          :class="isScrolled ? 'h-8 w-10' : 'h-10 w-12'"
        />
      </a>

      <nav
        aria-label="Navigasi utama"
        class="hidden max-w-[36rem] items-center gap-8 overflow-hidden transition-[max-width,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:flex"
        :class="isScrolled
          ? isExpanded
            ? 'ml-auto mr-4 max-w-[36rem] opacity-100'
            : 'pointer-events-none ml-0 mr-0 max-w-0 opacity-0'
          : 'ml-auto mr-0 opacity-100'"
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
