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
        <div class="relative mx-auto aspect-square w-full max-w-[16rem] shrink-0 lg:mx-0 lg:max-w-about-art" data-scroll-reveal>
          <div class="absolute right-0 top-0 flex h-[14rem] w-[12rem] items-center justify-center overflow-hidden rounded-card border-retro bg-parchment font-body text-sm text-twilight-indigo lg:h-about-photo-height lg:w-about-photo-width">
            <BaseSkeleton v-if="isLoading" role="status" aria-label="Memuat foto formal" class="h-full w-full rounded-card" />
            <img v-else-if="profile.aboutPhoto && !aboutPhotoFailed" :src="profile.aboutPhoto" alt="Foto formal" class="h-full w-full object-cover" loading="lazy" @error="handleAboutPhotoError" />
            <span v-else>Foto formal belum tersedia</span>
          </div>
        </div>

        <div class="grid w-full min-w-0 flex-1 gap-6 lg:basis-96">
          <h2 class="font-display text-[clamp(2.5rem,7vw,4rem)] text-center font-bold text-space-indigo lg:text-left" data-scroll-reveal>
            <span aria-hidden="true">“</span>HELLO<span class="text-air-force-blue">.</span>
          </h2>
          <p class="font-body text-body-lg leading-relaxed text-twilight-indigo" data-scroll-reveal>
            {{ profile.aboutParagraphs[0] ?? "" }}
          </p>
          <p class="font-body text-body-lg leading-relaxed text-twilight-indigo" data-scroll-reveal>
            {{ profile.aboutParagraphs[1] ?? "" }}
          </p>
        </div>
      </div>

      <div class="grid gap-12 lg:grid-cols-2">
        <section class="grid content-start gap-6" aria-labelledby="education-heading">
          <h3 id="education-heading" class="font-display text-h3 font-semibold text-space-indigo" data-scroll-reveal>Pendidikan</h3>
          <ul v-if="timeline.education.length" class="grid list-none gap-0 p-0">
            <BaseTimelineItem
              v-for="(entry, index) in timeline.education"
              :key="`${entry.title}-${index}`"
              :title="entry.title"
              :organization="entry.organization"
              :period="entry.period"
              data-scroll-reveal
            />
          </ul>
          <ul v-else class="grid list-none gap-0 p-0">
            <BaseTimelineItem title="[Program Studi]" organization="[Universitas]" period="[Tahun mulai]–[Tahun lulus]" />
          </ul>
        </section>

        <section class="relative grid content-start gap-6" aria-labelledby="experience-heading">
          <h3 id="experience-heading" class="font-display text-h3 font-semibold text-space-indigo" data-scroll-reveal>Pengalaman</h3>
          <ul v-if="timeline.experience.length" class="grid list-none gap-0 p-0">
            <BaseTimelineItem
              v-for="(entry, index) in timeline.experience"
              :key="`${entry.title}-${index}`"
              :title="entry.title"
              :organization="entry.organization"
              :period="entry.period"
              data-scroll-reveal
            />
          </ul>
          <ul v-else class="grid list-none gap-0 p-0">
            <BaseTimelineItem title="[Posisi]" organization="[Organisasi]" period="[Periode]" data-scroll-reveal />
            <BaseTimelineItem title="[Posisi]" organization="[Organisasi]" period="[Periode]" data-scroll-reveal />
          </ul>
        </section>
      </div>
    </div>
  </SectionWrapper>
</template>
