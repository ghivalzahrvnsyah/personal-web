import { onMounted, ref } from "vue";
import { getProjects } from "@/features/projects/services/projectService";
import type { Project } from "@/features/projects/types/project.types";

export function useProjects() {
  const projects = ref<Project[]>([]);
  const isLoading = ref(true);

  async function refreshProjects() {
    isLoading.value = true;
    try {
      projects.value = await getProjects();
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => void refreshProjects());

  return { projects, isLoading, refreshProjects };
}
