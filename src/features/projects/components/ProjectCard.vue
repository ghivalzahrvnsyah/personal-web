<script setup lang="ts">
import { ref, watch } from "vue";
import BaseCard from "@/components/BaseCard.vue";
import BaseChip from "@/components/BaseChip.vue";
import type { Project } from "@/features/projects/types/project.types";

interface Props {
  project: Project;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  select: [project: Project];
}>();

const imageFailed = ref(false);
watch(() => props.project.thumbnail, () => { imageFailed.value = false; });
</script>

<template>
  <BaseCard
    :aria-haspopup="'dialog'"
    :aria-label="`Lihat detail ${project.title}`"
    @click="emit('select', project)"
  >
    <div class="relative aspect-video border-b-2 border-space-indigo bg-bone">
      <img
        v-if="project.thumbnail && !imageFailed"
        :src="project.thumbnail"
        :alt="project.thumbnailAlt"
        class="h-full w-full object-cover"
        loading="lazy"
        @error="imageFailed = true"
      />
      <div v-else class="flex h-full items-center justify-center font-body text-sm text-twilight-indigo">
        [Thumbnail]
      </div>
    </div>

    <div class="grid gap-4 p-6">
      <h3 class="truncate font-display text-card-title font-semibold text-space-indigo">
        {{ project.title }}
      </h3>
      <p class="line-clamp-2 font-body text-ui leading-relaxed text-twilight-indigo">
        {{ project.description }}
      </p>
      <ul class="flex flex-wrap gap-2" :aria-label="`Teknologi ${project.title}`">
        <li v-for="technology in project.techStack.slice(0, 5)" :key="technology">
          <BaseChip :label="technology" variant="tag" />
        </li>
      </ul>
    </div>
  </BaseCard>
</template>
