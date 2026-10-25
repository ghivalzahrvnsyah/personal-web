<script setup lang="ts">
import { useProfile } from "@/features/profile/composables/useProfile";
import BaseSkeleton from "@/components/BaseSkeleton.vue";
import BaseTimelineItem from "@/components/BaseTimelineItem.vue";
import SectionWrapper from "@/layout/SectionWrapper.vue";
import { ref } from "vue";

const { profile, timeline, isLoading } = useProfile();
const aboutPhotoFailed = ref(false);

function handleAboutPhotoError(event: Event) {
  aboutPhotoFailed.value = true;
  console.error("Failed to load about profile photo:", (event.currentTarget as HTMLImageElement).src);
}
</script>
  
<template>
  <SectionWrapper id="about" background="bone" label="About" wide>
    <div class="grid gap-12">
      <div class="flex flex-col items-center gap-12 lg:flex-row">
        <div class="relative mx-auto aspect-square w-full max-w-[16rem] shrink-0 lg:mx-0 lg:max-w-about-art">
          <div class="absolute bottom-0 left-0 h-[12rem] w-[14rem] rounded-block border-retro bg-air-force-blue lg:h-about-accent-height lg:w-about-accent-width" aria-hidden="true" />
          <div class="absolute right-0 top-0 flex h-[14rem] w-[12rem] items-center justify-center overflow-hidden rounded-card border-retro bg-parchment font-body text-sm text-twilight-indigo lg:h-about-photo-height lg:w-about-photo-width">
            <BaseSkeleton v-if="isLoading" role="status" aria-label="Memuat foto formal" class="h-full w-full rounded-card" />
            <img v-else-if="profile.aboutPhoto && !aboutPhotoFailed" :src="profile.aboutPhoto" alt="Foto formal" class="h-full w-full object-cover" loading="lazy" @error="handleAboutPhotoError" />
            <span v-else>Foto formal belum tersedia</span>
          </div>
          <svg aria-hidden="true" class="pointer-events-none absolute -right-8 top-8 hidden h-8 w-8 text-air-force-blue md:block" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 2 19 12l11 4-11 4-3 10-3-10-11-4 11-4 3-10Z" />
          </svg>
        </div>

        <div class="grid w-full min-w-0 flex-1 gap-6 lg:basis-96">
          <h2 class="font-display text-[clamp(2.5rem,7vw,4rem)] text-center font-bold text-space-indigo lg:text-left">
            <span aria-hidden="true">“</span>HELLO<span class="text-air-force-blue">.</span>
          </h2>
          <p class="font-body text-body-lg leading-relaxed text-twilight-indigo">
            {{ profile.aboutParagraphs[0] ?? "" }}
          </p>
          <p class="font-body text-body-lg leading-relaxed text-twilight-indigo">
            {{ profile.aboutParagraphs[1] ?? "" }}
          </p>
        </div>
      </div>

      <div class="grid gap-12 lg:grid-cols-2">
        <section class="grid content-start gap-6" aria-labelledby="education-heading">
          <h3 id="education-heading" class="font-display text-h3 font-semibold text-space-indigo">Pendidikan</h3>
          <ul v-if="timeline.education.length" class="grid list-none gap-0 p-0">
            <BaseTimelineItem
              v-for="(entry, index) in timeline.education"
              :key="`${entry.title}-${index}`"
              :title="entry.title"
              :organization="entry.organization"
              :period="entry.period"
            />
          </ul>
          <ul v-else class="grid list-none gap-0 p-0">
            <BaseTimelineItem title="[Program Studi]" organization="[Universitas]" period="[Tahun mulai]–[Tahun lulus]" />
          </ul>
        </section>

        <section class="relative grid content-start gap-6" aria-labelledby="experience-heading">
          <h3 id="experience-heading" class="font-display text-h3 font-semibold text-space-indigo">Pengalaman</h3>
          <svg aria-hidden="true" class="pointer-events-none absolute right-0 top-0 hidden h-10 w-10 text-air-force-blue md:block" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 31c3-12 11-20 24-23-3 13-11 21-23 24Z" />
            <path d="M9 32c5-7 10-12 18-18" />
          </svg>
          <ul v-if="timeline.experience.length" class="grid list-none gap-0 p-0">
            <BaseTimelineItem
              v-for="(entry, index) in timeline.experience"
              :key="`${entry.title}-${index}`"
              :title="entry.title"
              :organization="entry.organization"
              :period="entry.period"
            />
          </ul>
          <ul v-else class="grid list-none gap-0 p-0">
            <BaseTimelineItem title="[Posisi]" organization="[Organisasi]" period="[Periode]" />
            <BaseTimelineItem title="[Posisi]" organization="[Organisasi]" period="[Periode]" />
          </ul>
        </section>
      </div>
    </div>
  </SectionWrapper>
</template>
