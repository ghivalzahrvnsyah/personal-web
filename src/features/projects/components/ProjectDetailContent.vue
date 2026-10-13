<script setup lang="ts">
import { ref, watch } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseChip from "@/components/BaseChip.vue";
import type { Project } from "@/features/projects/types/project.types";

interface Props {
  project: Project;
}

const props = defineProps<Props>();
const imageFailed = ref(false);
watch(() => props.project.thumbnail, () => { imageFailed.value = false; });
</script>

<template>
  <article>
    <div class="aspect-video border-b-2 border-space-indigo bg-bone">
      <img
        v-if="project.thumbnail && !imageFailed"
        :src="project.thumbnail"
        :alt="`Gambar ${project.title}`"
        class="h-full w-full object-cover"
        @error="imageFailed = true"
      />
      <div v-else class="flex h-full items-center justify-center font-body text-sm text-twilight-indigo">
        [Gambar proyek]
      </div>
    </div>

    <div class="grid gap-6 p-8">
      <p class="font-body text-ui font-medium text-twilight-indigo">{{ project.year }} · {{ project.role }}</p>
      <h2 class="font-display text-h2-modal font-bold text-space-indigo">{{ project.title }}</h2>
      <div class="grid gap-4 font-body text-base leading-relaxed text-twilight-indigo">
        <p>{{ project.problem }}</p>
        <p>{{ project.solution }}</p>
      </div>
      <ul class="flex flex-wrap gap-2" :aria-label="`Teknologi ${project.title}`">
        <li v-for="technology in project.techStack.slice(0, 5)" :key="technology">
          <BaseChip :label="technology" variant="tag" />
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
          Lihat proyek
        </BaseButton>
        <p v-else class="font-body text-sm text-twilight-indigo">[Tautan proyek belum tersedia]</p>
      </div>
    </div>
  </article>
</template>
