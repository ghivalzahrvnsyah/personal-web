import { onMounted, ref } from "vue";
import { getProjects } from "@/features/projects/services/projectService";
import type { Project } from "@/features/projects/types/project.types";

export function useProjects() {
  const projects = ref<Project[]>([]);

  onMounted(async () => {
    projects.value = await getProjects();
  });

  return { projects };
}
