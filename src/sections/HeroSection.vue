<script setup lang="ts">
import { useProfile } from "@/features/profile/composables/useProfile";
import SectionWrapper from "@/layout/SectionWrapper.vue";
import { computed, ref } from "vue";

const { profile } = useProfile();
const firstName = computed(() => profile.value?.firstName ?? "[Nama Depan]");
const lastName = computed(() => profile.value?.lastName ?? "[Nama Belakang]");
const year = computed(() => profile.value?.year ?? "[Tahun]");
const tagline = computed(() => profile.value?.tagline ?? "[Jabatan Profesional] — [Kalimat nilai yang Anda tawarkan]");
const cvUrl = computed(() => profile.value?.cvUrl ?? "");
const heroPhotoFailed = ref(false);

function handleHeroPhotoError(event: Event) {
  heroPhotoFailed.value = true;
  console.error("Failed to load hero profile photo:", (event.currentTarget as HTMLImageElement).src);
}
</script>

<template>
  <SectionWrapper id="home" background="parchment" wide>
    <div class="relative flex min-h-hero-section flex-col items-center justify-center gap-8 overflow-hidden lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:pt-8">
      <div class="relative z-10 order-2 grid w-full min-w-0 justify-items-center gap-6 text-center lg:order-1 lg:w-auto lg:flex-1 lg:justify-items-start lg:text-left lg:basis-hero-art">
        <p class="font-body text-ui font-bold uppercase tracking-eyebrow text-twilight-indigo lg:text-base">
          Portofolio · {{ year }}
        </p>

        <h1 class="grid justify-items-center font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-none tracking-tight text-space-indigo lg:text-[clamp(4rem,6vw,6rem)]">
          <span class="rounded-card border-retro bg-air-force-blue px-6 py-2">{{ firstName }}</span>
          <span>{{ lastName }}<span class="text-air-force-blue">.</span></span>
        </h1>
 
        <p class="max-w-tagline font-body text-[clamp(1.125rem,1.8vw,1.375rem)] leading-relaxed text-twilight-indigo lg:text-[clamp(1.5rem,2.2vw,2rem)]">
          {{ tagline }}
        </p>

        <div class="flex w-full flex-wrap items-center justify-center gap-6 lg:w-auto lg:justify-start">
          <a
            v-if="cvUrl"
            :href="cvUrl"
            download
            class="inline-flex min-h-14 w-full items-center justify-center rounded-pill border-retro bg-space-indigo px-8 font-body text-cta font-bold text-parchment shadow-retro transition duration-retro hover:border-twilight-indigo hover:bg-twilight-indigo focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-twilight-indigo lg:w-auto lg:text-[1.375rem]"
          >
            Download CV
          </a>
          <span
            v-else
            role="status"
            class="inline-flex min-h-14 w-full items-center justify-center rounded-pill border-retro bg-space-indigo/50 px-8 font-body text-cta font-bold text-parchment lg:w-auto lg:text-[1.375rem]"
          >
            {{ profile ? "CV belum tersedia" : "Memuat CV..." }}
          </span>
        </div>
      </div>

      <div class="relative order-1 mx-auto aspect-square w-full max-w-[clamp(16rem,68vw,20rem)] shrink-0 lg:order-2 lg:mx-0 lg:max-w-[clamp(26rem,36vw,34rem)]">
        <div class="absolute left-1/2 top-1/2 h-hero-ring-mobile w-hero-ring-mobile -translate-x-1/2 -translate-y-1/2 rounded-full border-retro lg:h-[clamp(24rem,34vw,32rem)] lg:w-[clamp(24rem,34vw,32rem)]" aria-hidden="true" />
        <div class="absolute bottom-4 right-2 h-hero-accent-mobile w-hero-accent-mobile rounded-card border-retro bg-air-force-blue lg:bottom-8 lg:right-0 lg:h-[clamp(18rem,22vw,22rem)] lg:w-[clamp(18rem,22vw,22rem)]" aria-hidden="true" />
        <div class="absolute left-1/2 top-1/2 flex h-[clamp(14rem,60vw,18rem)] w-[clamp(14rem,60vw,18rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border-retro bg-bone font-body text-sm text-twilight-indigo lg:h-[clamp(20rem,28vw,27rem)] lg:w-[clamp(20rem,28vw,27rem)]">
          <img v-if="profile?.heroPhoto && !heroPhotoFailed" :src="profile.heroPhoto" :alt="`Foto profil ${firstName} ${lastName}`" class="h-full w-full object-cover" @error="handleHeroPhotoError" />
          <span v-else>[Foto Profil]</span>
        </div>
        <svg aria-hidden="true" class="pointer-events-none absolute -left-8 top-16 hidden h-12 w-12 text-air-force-blue md:block" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 3 24 16 37 20 24 24 20 37 16 24 3 20 16 16 20 3Z" />
          <path d="M34 4v7m-3.5-3.5h7" />
        </svg>
        <svg aria-hidden="true" class="pointer-events-none absolute -left-8 bottom-10 hidden h-16 w-16 text-space-indigo md:block" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="8" y="10" width="48" height="34" rx="4" /><path d="M20 54h24M26 44v10m12-10v10M20 22l7 6-7 6m14 0h10" />
        </svg>
        <svg aria-hidden="true" class="pointer-events-none absolute -right-8 bottom-10 hidden h-16 w-16 text-space-indigo md:block" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 38a18 18 0 1 1 20 0c-4 3-4 7-4 9H26c0-2 0-6-4-9Z" /><path d="M26 53h12m-10 5h8M32 4v5m22 9-5 3M10 18l5 3m-2 20 5-2m28 0 5 2" />
        </svg>
      </div>

    </div>
  </SectionWrapper>
</template>
