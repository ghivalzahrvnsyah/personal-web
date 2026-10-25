<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseSkeleton from "@/components/BaseSkeleton.vue";
import { useProjectModal } from "@/features/projects/composables/useProjectModal";
import { useProjects } from "@/features/projects/composables/useProjects";
import ProjectCard from "@/features/projects/components/ProjectCard.vue";
import SectionWrapper from "@/layout/SectionWrapper.vue";

const ProjectDetailModal = defineAsyncComponent(
  () => import("@/features/projects/components/ProjectDetailModal.vue"),
);

const { projects, isLoading } = useProjects();
const { selectedProject, isModalOpen, openModal, closeModal } = useProjectModal();
const visibleCount = ref(2);
const visibleProjects = computed(() => projects.value.slice(0, visibleCount.value));
const isExpanded = computed(() => visibleCount.value > 2);

function toggleProjects() {
  visibleCount.value = isExpanded.value ? 2 : projects.value.length;
}
</script>
 
<template>
  <SectionWrapper id="projects" background="bone" label="Projects">
    <div class="relative grid gap-8">
      <h2 class="font-display text-h2 font-bold text-space-indigo">
        <span aria-hidden="true">“</span>My projects
      </h2>

      <svg aria-hidden="true" class="pointer-events-none absolute right-16 top-0 hidden h-12 w-12 text-air-force-blue md:block" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M24 3 29 18 45 24 29 29 24 45 19 29 3 24 19 18 24 3Z" />
        <path d="M39 5v7m-3.5-3.5h7" />
      </svg>
      <svg aria-hidden="true" class="pointer-events-none absolute right-0 top-2 hidden h-12 w-12 text-space-indigo md:block" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 35c8 0 9-20 18-20 6 0 8 6 8 11" />
        <path d="m27 23 6 6 6-6" />
      </svg>

      <div id="project-list" class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div v-if="isLoading" role="status" aria-label="Memuat proyek" class="grid grid-cols-1 gap-8 lg:col-span-2 lg:grid-cols-2">
          <div v-for="card in 2" :key="card" class="overflow-hidden rounded-card border-retro bg-parchment shadow-retro">
            <BaseSkeleton class="aspect-video rounded-none" />
            <div class="grid gap-4 p-6">
              <BaseSkeleton class="h-8 w-3/4" />
              <div class="flex gap-2">
                <BaseSkeleton v-for="badge in 3" :key="badge" class="h-8 w-20 rounded-pill" />
              </div>
            </div>
          </div>
        </div>
        <p v-else-if="projects.length === 0" class="font-body text-twilight-indigo">Belum ada proyek untuk ditampilkan.</p>
        <ProjectCard
          v-else
          v-for="project in visibleProjects"
          :key="project.id"
          :project="project"
          @select="openModal"
        />
      </div>
  
      <div v-if="projects.length > 2" class="flex justify-center">
        <BaseButton
          variant="secondary"
          :aria-expanded="isExpanded"
          aria-controls="project-list"
          @click="toggleProjects"
        >
          {{ isExpanded ? "Show fewer projects" : "More projects" }}
        </BaseButton>
      </div>
    </div>

    <ProjectDetailModal
      :project="selectedProject"
      :is-open="isModalOpen"
      @close="closeModal"
    />
  </SectionWrapper>
</template>
