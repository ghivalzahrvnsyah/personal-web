import { supabase } from "@/lib/supabaseClient";
import type { Project } from "@/features/projects/types/project.types";

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("project_id, title, descriptions, image_url, tech_tags, github_url, demo_url, alt_text");

  if (error) {
    console.error("Error fetching projects:", error.message);
    return [];
  }

  const projectIds = (data ?? []).map((row) => String(row.project_id));
  const { data: mockups, error: mockupsError } = projectIds.length
    ? await supabase
        .from("project_mockups")
        .select("project_id, image_url, alt_text, sort_order")
        .in("project_id", projectIds)
        .order("sort_order", { ascending: true })
    : { data: [], error: null };

  if (mockupsError) {
    console.warn("Could not fetch additional project mockups:", mockupsError.message);
  }

  return (data ?? []).map((row) => ({
    id: String(row.project_id),
    title: row.title,
    description: row.descriptions ?? "",
    thumbnail: row.image_url ?? "",
    thumbnailAlt: row.alt_text ?? `Gambar proyek ${row.title}`,
    images: [
      ...(row.image_url ? [{ url: row.image_url, altText: row.alt_text ?? `Gambar proyek ${row.title}` }] : []),
      ...(mockups ?? [])
        .filter((image) => String(image.project_id) === String(row.project_id))
        .map((image) => ({
          url: image.image_url,
          altText: image.alt_text ?? `Mockup ${row.title}`,
        })),
    ],
    techStack: parseTechTags(row.tech_tags),
    githubUrl: row.github_url ?? "",
    demoUrl: row.demo_url ?? "",
  }));
}

function parseTechTags(value: string | string[] | null): string[] {
  if (Array.isArray(value)) return value;
  if (!value) return [];

  const normalized = value.trim().replace(/^\{|\}$/g, "");
  if (!normalized) return [];

  return normalized
    .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
    .map((tag) => tag.trim().replace(/^"|"$/g, ""))
    .filter(Boolean);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.id === id);
}
