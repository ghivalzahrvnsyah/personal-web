<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
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
const isDarkTheme = ref(document.documentElement.dataset.theme === "retro-midnight");
const scrollStage = ref<"top" | "compact">("top");
const isExpanded = ref(false);
const hoverEnabled = ref(true);
const isMobileViewport = ref(false);
const isSmallScreen = ref(false);
const isScrolled = computed(() => scrollStage.value !== "top");
const { activeSection } = useActiveSection(links.map((link) => link.id));

function toggleTheme() {
  isDarkTheme.value = !isDarkTheme.value;
  const theme = isDarkTheme.value ? "retro-midnight" : "retro-vintage";
  document.documentElement.dataset.theme = theme;

  try {
    window.localStorage.setItem("portfolio-theme", theme);
  } catch {
    // The theme still works for this page view when storage is unavailable.
  }
}

function updateViewportState() {
  isMobileViewport.value = window.matchMedia("(max-width: 767px)").matches;
  isSmallScreen.value = window.matchMedia("(max-width: 639px)").matches;
  syncBottomNavigationSpace();
}

function syncBottomNavigationSpace() {
  document.body.classList.toggle("mobile-bottom-nav-visible", isSmallScreen.value && isScrolled.value);
}

function setScrollStage(stage: "top" | "compact") {
  if (scrollStage.value === stage) return;

  hoverEnabled.value = stage !== "compact";
  scrollStage.value = stage;
  isExpanded.value = false;
  menuOpen.value = false;
  syncBottomNavigationSpace();
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
  if (isMobileViewport.value) {
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
  if (isMobileViewport.value) menuOpen.value = true;
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
  updateViewportState();
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateViewportState, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollState);
  window.removeEventListener("resize", updateViewportState);
  document.body.classList.remove("mobile-bottom-nav-visible");
});
</script>

<template>
  <header class="pointer-events-none fixed inset-x-0 top-4 z-50" @keydown.esc="closeMenu">
    <button
      type="button"
      role="switch"
      :aria-checked="isDarkTheme"
      :aria-label="isDarkTheme ? 'Aktifkan light mode' : 'Aktifkan dark mode'"
      class="pointer-events-auto fixed right-4 top-4 flex h-12 items-center gap-2 rounded-full border-2 border-space-indigo bg-parchment px-2 shadow-retro transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-twilight-indigo"
      @click="toggleTheme"
    >
      <svg aria-hidden="true" class="h-5 w-5 text-secondary-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
      <span class="relative h-6 w-11 rounded-full bg-bone" aria-hidden="true">
        <span class="absolute top-0.5 size-5 rounded-full bg-space-indigo shadow-sm transition-transform duration-300" :class="isDarkTheme ? 'translate-x-5' : 'translate-x-0.5'"></span>
      </span>
      <svg aria-hidden="true" class="h-5 w-5 text-secondary-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" /></svg>
    </button>

    <div
      data-floating-navbar
      class="pointer-events-auto relative mx-auto flex h-14 items-center rounded-full border-2 border-space-indigo bg-parchment shadow-retro transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      :class="[
        !isScrolled
          ? isSmallScreen
            ? 'w-16 justify-center'
            : 'w-[min(44rem,calc(100vw-6rem))] justify-between px-4'
          : isExpanded
            ? 'w-16 justify-center md:w-[min(44rem,calc(100vw-6rem))] md:justify-between md:px-4'
            : 'w-16 justify-center',
        isSmallScreen && isScrolled
          ? 'pointer-events-none -translate-y-2 opacity-0'
          : 'translate-y-0 opacity-100',
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
          ? isSmallScreen ? 'left-1/2 -translate-x-1/2' : 'left-4'
          : isExpanded
            ? 'left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0'
            : 'left-1/2 -translate-x-1/2'"
        :aria-label="isMobileViewport
          ? menuOpen ? 'Tutup navigasi' : 'Buka navigasi'
          : 'Ghivalza Harviansyah, ke beranda'"
        :aria-expanded="isMobileViewport ? menuOpen : isScrolled ? isExpanded : undefined"
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
          :class="activeSection === link.id ? 'border-air-force-blue text-space-indigo' : 'border-transparent text-secondary-text'"
          :aria-current="activeSection === link.id ? 'location' : undefined"
          @click="closeMenu"
        >
          {{ link.label }}
        </a>
      </nav>

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

    <Transition name="mobile-bottom-nav">
      <nav
        v-if="isSmallScreen && isScrolled"
        aria-label="Navigasi utama"
        class="mobile-bottom-navigation pointer-events-auto fixed inset-x-3 z-[60] mx-auto flex max-w-[28rem] items-center justify-around rounded-pill border-2 border-space-indigo bg-parchment px-2 py-2 shadow-retro sm:hidden"
      >
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-pill py-2 font-body text-[0.625rem] font-medium leading-none transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-twilight-indigo"
          :class="activeSection === link.id ? 'bg-bone text-space-indigo' : 'text-secondary-text hover:text-space-indigo'"
          :aria-current="activeSection === link.id ? 'location' : undefined"
          @click="closeMenu"
        >
          <svg v-if="link.id === 'home'" aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></svg>
          <svg v-else-if="link.id === 'about'" aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5" /><path d="M5 21v-1a7 7 0 0 1 14 0v1" /></svg>
          <svg v-else-if="link.id === 'skills'" aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m13 2-9 12h7l-1 8 10-13h-7z" /></svg>
          <svg v-else-if="link.id === 'projects'" aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
          <svg v-else aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
          <span>{{ link.label }}</span>
        </a>
      </nav>
    </Transition>
  </header>
</template>
