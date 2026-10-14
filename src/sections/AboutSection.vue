<script setup lang="ts">
import { useProfile } from "@/features/profile/composables/useProfile";
import BaseTimelineItem from "@/components/BaseTimelineItem.vue";
import SectionWrapper from "@/layout/SectionWrapper.vue";

const { profile, timeline } = useProfile();
</script>

<template>
  <SectionWrapper id="about" background="bone" label="About" wide>
    <div class="grid gap-12">
      <div class="flex flex-wrap items-center gap-12">
        <div class="relative mx-auto aspect-square w-full max-w-[16rem] shrink-0 md:mx-0 md:max-w-about-art">
          <div class="absolute bottom-0 left-0 h-[12rem] w-[14rem] rounded-block border-retro bg-air-force-blue md:h-about-accent-height md:w-about-accent-width" aria-hidden="true" />
          <div class="absolute right-0 top-0 flex h-[14rem] w-[12rem] items-center justify-center overflow-hidden rounded-card border-retro bg-parchment font-body text-sm text-twilight-indigo md:h-about-photo-height md:w-about-photo-width">
            <img v-if="profile?.aboutPhoto" :src="profile.aboutPhoto" alt="Foto formal" class="h-full w-full object-cover" loading="lazy" />
            <span v-else>[Foto Formal]</span>
          </div>
          <svg aria-hidden="true" class="pointer-events-none absolute -right-8 top-8 hidden h-8 w-8 text-air-force-blue md:block" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 2 19 12l11 4-11 4-3 10-3-10-11-4 11-4 3-10Z" />
          </svg>
        </div>

        <div class="grid min-w-0 flex-1 gap-6 md:basis-96">
          <h2 class="font-display text-h2-lg font-bold text-space-indigo">
            <span aria-hidden="true">“</span>HELLO<span class="text-air-force-blue">.</span>
          </h2>
          <p class="font-body text-body-lg leading-relaxed text-twilight-indigo">
            {{ profile?.aboutParagraphs[0] ?? "[Paragraf singkat tentang latar belakang dan fokus profesional Anda.]" }}
          </p>
          <p class="font-body text-body-lg leading-relaxed text-twilight-indigo">
            {{ profile?.aboutParagraphs[1] ?? "[Paragraf singkat tentang cara kerja, minat, atau tujuan profesional Anda.]" }}
          </p>
        </div>
      </div>

      <div class="grid gap-12 lg:grid-cols-2">
        <section class="grid content-start gap-6" aria-labelledby="education-heading">
          <h3 id="education-heading" class="font-display text-h3 font-semibold text-space-indigo">Pendidikan</h3>
          <ul v-if="timeline" class="grid list-none gap-0 p-0">
            <BaseTimelineItem
              :title="timeline.education.title"
              :organization="timeline.education.organization"
              :period="timeline.education.period"
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
          <ul v-if="timeline" class="grid list-none gap-0 p-0">
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
