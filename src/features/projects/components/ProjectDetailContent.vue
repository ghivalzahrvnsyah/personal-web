<script setup lang="ts">
import { computed, ref, watch } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseSkillBadge from "@/components/BaseSkillBadge.vue";
import type { Project } from "@/features/projects/types/project.types";

interface Props {
  project: Project;
}

const props = defineProps<Props>();
const failedImages = ref<string[]>([]);
watch(() => props.project.id, () => { failedImages.value = []; });

const caseStudySections = computed(() => [
  { title: "Problem", text: props.project.problem, icon: "problem" },
  { title: "Goal", text: props.project.goal, icon: "goal" },
  { title: "Solution", text: props.project.solution, icon: "solution" },
  { title: "Outcome", text: props.project.outcome, icon: "outcome" },
].filter((section) => section.text.trim()));

function markImageFailed(url: string) {
  if (!failedImages.value.includes(url)) failedImages.value.push(url);
}
</script>

<template>
  <article>
    <div class="grid gap-4 border-b-2 border-space-indigo bg-bone p-4">
      <img
        v-for="image in project.images"
        v-show="!failedImages.includes(image.url)"
        :key="image.url"
        :src="image.url"
        :alt="image.altText"
        class="aspect-video w-full border-retro object-cover"
        loading="lazy"
        @error="markImageFailed(image.url)"
      />
      <div v-if="!project.images.length || failedImages.length === project.images.length" class="flex aspect-video items-center justify-center font-body text-sm text-secondary-text">
        [Gambar proyek]
      </div>
    </div>

    <div class="grid gap-6 p-8">
      <h2 class="font-display text-h2-modal font-bold text-space-indigo">{{ project.title }}</h2>
      <p class="font-body text-base leading-relaxed text-secondary-text">{{ project.description }}</p>

      <section v-if="caseStudySections.length" class="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-label="Detail studi kasus">
        <article
          v-for="section in caseStudySections"
          :key="section.title"
          class="grid content-start gap-3 rounded-2xl bg-bone p-5"
        >
          <svg v-if="section.icon === 'problem'" aria-hidden="true" class="h-9 w-9 text-air-force-blue" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="24" height="22" rx="3"/><path d="M11 12h10M11 17h10M11 22h5"/></svg>
          <svg v-else-if="section.icon === 'goal'" aria-hidden="true" class="h-9 w-9 text-air-force-blue" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="15" cy="17" r="10"/><circle cx="15" cy="17" r="5"/><path d="m15 17 11-11M21 6h5v5"/></svg>
          <svg v-else-if="section.icon === 'solution'" aria-hidden="true" class="h-9 w-9 text-air-force-blue" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4h10M13 4v9L6 25a2 2 0 0 0 2 3h16a2 2 0 0 0 2-3l-7-12V4M10 21h12"/></svg>
          <svg v-else aria-hidden="true" class="h-9 w-9 text-air-force-blue" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m16 3 3.5 8 8.5 1-6.5 5.5 2 8.5-7.5-4.5-7.5 4.5 2-8.5L4 12l8.5-1L16 3Z"/><path d="m21 4 1-2m4 6 3-1"/></svg>
          <h3 class="font-display text-lg font-semibold text-air-force-blue">{{ section.title }}</h3>
          <p class="font-body text-sm leading-relaxed text-secondary-text">{{ section.text }}</p>
        </article>
      </section>

      <ul class="flex flex-wrap gap-2" :aria-label="`Teknologi ${project.title}`">
        <li v-for="technology in project.techStack" :key="technology.label">
          <BaseSkillBadge :label="technology.label" :icon="technology.icon" :color="technology.color" />
        </li>
      </ul>
      <div class="grid justify-items-start gap-4">
        <BaseButton
          v-if="project.demoUrl"
          variant="secondary"
          :href="project.demoUrl"
          target="_blank"
          rel="noopener"
        >
          Demo
        </BaseButton>
        <BaseButton
          v-if="project.githubUrl"
          variant="secondary"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener"
        >
          Repository
        </BaseButton>
        <p v-if="!project.demoUrl" class="font-body text-sm text-secondary-text">Demo: -</p>
        <p v-if="!project.githubUrl" class="font-body text-sm text-secondary-text">Repository: -</p>
      </div>
    </div>
  </article>
</template>
