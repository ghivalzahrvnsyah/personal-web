import { nextTick, ref } from "vue";
import type { Project } from "@/features/projects/types/project.types";

export function useProjectModal() {
  const selectedProject = ref<Project | null>(null);
  const isModalOpen = ref(false);
  let triggerElement: HTMLElement | null = null;

  function openModal(project: Project, trigger?: HTMLElement) {
    triggerElement = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    selectedProject.value = project;
    isModalOpen.value = true;
  }

  async function closeModal() {
    isModalOpen.value = false;
    selectedProject.value = null;
    await nextTick();
    triggerElement?.focus();
    triggerElement = null;
  }

  return { selectedProject, isModalOpen, openModal, closeModal };
}
