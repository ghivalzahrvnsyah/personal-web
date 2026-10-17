<script setup lang="ts">
import { ref, watch } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseSkillBadge from "@/components/BaseSkillBadge.vue";
import type { Project } from "@/features/projects/types/project.types";

interface Props {
  project: Project;
}

const props = defineProps<Props>();
const failedImages = ref<string[]>([]);
watch(() => props.project.id, () => { failedImages.value = []; });

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
      <div v-if="!project.images.length || failedImages.length === project.images.length" class="flex aspect-video items-center justify-center font-body text-sm text-twilight-indigo">
        [Gambar proyek]
      </div>
    </div>

    <div class="grid gap-6 p-8">
      <h2 class="font-display text-h2-modal font-bold text-space-indigo">{{ project.title }}</h2>
      <p class="font-body text-base leading-relaxed text-twilight-indigo">{{ project.description }}</p>
      <ul class="flex flex-wrap gap-2" :aria-label="`Teknologi ${project.title}`">
        <li v-for="technology in project.techStack" :key="technology.label">
          <BaseSkillBadge :label="technology.label" :icon="technology.icon" :color="technology.color" />
        </li>
      </ul>
      <div>
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
        <p v-if="!project.demoUrl" class="font-body text-sm text-twilight-indigo">Demo: -</p>
        <p v-if="!project.githubUrl" class="font-body text-sm text-twilight-indigo">Repository: -</p>
      </div>
    </div>
  </article>
</template>
