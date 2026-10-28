<script setup lang="ts">
import { useProfile } from "@/features/profile/composables/useProfile";
import BaseSkeleton from "@/components/BaseSkeleton.vue";
import SectionWrapper from "@/layout/SectionWrapper.vue";
import { computed, onMounted, onUnmounted, ref } from "vue";

const { profile, isLoading } = useProfile();
const firstName = computed(() => profile.value.firstName ?? "");
const lastName = computed(() => profile.value.lastName ?? "");
const year = computed(() => profile.value.year ?? "");
const cvUrl = computed(() => profile.value?.cvUrl ?? "");
const heroPhotoFailed = ref(false);
const typedRole = ref("");
const roles = ["Mobile Android Developer", "Software Engineer", "UI/UX Enthusiast"];
let typingTimer: number | undefined;

function typeRole(roleIndex: number, characterIndex = 0, deleting = false) {
  const role = roles[roleIndex];
  if (!role) return;

  if (!deleting) {
    typedRole.value = role.slice(0, characterIndex + 1);
    const nextCharacterIndex = characterIndex + 1;

    if (nextCharacterIndex === role.length) {
      typingTimer = window.setTimeout(() => typeRole(roleIndex, nextCharacterIndex, true), 1300);
      return;
    }

    typingTimer = window.setTimeout(() => typeRole(roleIndex, nextCharacterIndex), 82);
    return;
  }

  typedRole.value = role.slice(0, characterIndex - 1);
  if (characterIndex > 1) {
    typingTimer = window.setTimeout(() => typeRole(roleIndex, characterIndex - 1, true), 38);
    return;
  }

  const nextRoleIndex = (roleIndex + 1) % roles.length;
  typingTimer = window.setTimeout(() => typeRole(nextRoleIndex), 250);
}

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    typedRole.value = roles[0];
    return;
  }

  // Let the name, CV button, and profile photo finish entering first.
  typingTimer = window.setTimeout(() => typeRole(0), 1350);
});

onUnmounted(() => {
  if (typingTimer !== undefined) window.clearTimeout(typingTimer);
});

function handleHeroPhotoError(event: Event) {
  heroPhotoFailed.value = true;
  console.error("Failed to load hero profile photo:", (event.currentTarget as HTMLImageElement).src);
}
</script>

<template>
  <SectionWrapper id="home" background="parchment" wide>
    <div class="relative flex min-h-hero-section flex-col items-center justify-center gap-8 overflow-hidden lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:pt-8">
      <div class="relative z-10 order-2 grid w-full min-w-0 justify-items-center gap-6 text-center lg:order-1 lg:w-auto lg:flex-1 lg:justify-items-start lg:text-left lg:basis-hero-art">
        <p class="hero-entrance hero-entrance-1 font-body text-ui font-bold uppercase tracking-eyebrow text-twilight-indigo lg:text-base">
          Portofolio · {{ year }}
        </p>

        <h1 class="hero-entrance hero-entrance-2 grid justify-items-center font-display text-[clamp(2.5rem,5vw,5rem)] font-bold uppercase leading-none tracking-tight text-space-indigo lg:justify-items-start lg:text-[clamp(4rem,6vw,6rem)]">
          <span class="rounded-card border-retro bg-air-force-blue px-6 py-2">{{ firstName }}</span>
          <span>{{ lastName }}<span aria-hidden="true" class="text-air-force-blue">.</span></span>
        </h1>

        <p class="hero-entrance hero-entrance-3 font-body text-base text-twilight-indigo lg:text-lg">
          Tinggal di Bandung, Indonesia
        </p>
 
        <p class="min-h-[3em] max-w-tagline font-body text-[clamp(1.125rem,1.8vw,1.375rem)] leading-relaxed text-twilight-indigo lg:min-h-[1.5em] lg:text-[clamp(1.5rem,2.2vw,2rem)]" aria-label="Mobile Android Developer, Software Engineer, UI/UX Enthusiast">
          <span class="typewriter-caret" aria-hidden="true">{{ typedRole }}</span>
        </p>

        <div class="hero-entrance hero-entrance-4 flex w-full flex-wrap items-center justify-center gap-6 lg:w-auto lg:justify-start">
          <a
            v-if="!isLoading && cvUrl"
            :href="cvUrl"
            download
            class="inline-flex min-h-14 w-full items-center justify-center rounded-pill border-retro bg-space-indigo px-8 font-body text-cta font-bold text-parchment shadow-retro transition duration-retro hover:border-twilight-indigo hover:bg-twilight-indigo focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-twilight-indigo lg:w-auto lg:text-[1.375rem]"
          >
            Download CV
          </a>
          <BaseSkeleton
            v-if="isLoading"
            role="status"
            aria-label="Memuat CV"
            class="h-14 w-full rounded-pill lg:w-48"
          />
          <span
            v-else-if="!cvUrl"
            role="status"
            class="inline-flex min-h-14 w-full items-center justify-center rounded-pill border-retro bg-space-indigo/50 px-8 font-body text-cta font-bold text-parchment lg:w-auto lg:text-[1.375rem]"
          >
            CV belum tersedia
          </span>
        </div>
      </div>

      <div class="hero-entrance hero-entrance-5 relative order-1 mx-auto aspect-square w-full max-w-[clamp(16rem,68vw,20rem)] shrink-0 lg:order-2 lg:mx-0 lg:max-w-[clamp(26rem,36vw,34rem)]">
        <div class="absolute inset-[4%] rotate-[-5deg] border-retro bg-air-force-blue" aria-hidden="true" />
        <div class="absolute inset-[2%] rotate-[4deg] border-retro bg-brick" aria-hidden="true" />
        <div class="absolute inset-0 flex items-center justify-center overflow-hidden border-retro bg-bone font-body text-sm text-twilight-indigo shadow-retro-lg">
          <img v-if="profile.heroPhoto && !heroPhotoFailed" :src="profile.heroPhoto" :alt="`Foto profil ${firstName} ${lastName}`" class="h-full w-full object-cover object-[center_35%]" width="640" height="640" fetchpriority="high" decoding="async" @error="handleHeroPhotoError" />
          <BaseSkeleton v-else-if="isLoading" role="status" aria-label="Memuat foto profil" class="h-full w-full" />
          <span v-else>Foto profil belum tersedia</span>
        </div>
      </div>

    </div>
  </SectionWrapper>
</template>
