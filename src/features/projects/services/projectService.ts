import projectsData from "@/data/projects.json";
import type { Project } from "@/features/projects/types/project.types";

const projects = projectsData as Project[];

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return projects.find((project) => project.slug === slug);
}
