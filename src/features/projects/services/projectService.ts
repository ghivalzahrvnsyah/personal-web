import { supabase } from "@/lib/supabaseClient";
import type { Project } from "@/features/projects/types/project.types";

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, descriptions, image_url, tags, github_url, demo_url")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error.message);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: String(row.id),
    title: row.title,
    description: row.descriptions ?? "",
    thumbnail: row.image_url ?? "",
    techStack: row.tags ?? [],
    githubUrl: row.github_url ?? "",
    demoUrl: row.demo_url ?? "",
  }));
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.id === id);
}
