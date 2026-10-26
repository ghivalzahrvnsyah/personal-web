import { supabase } from "@/lib/supabaseClient";
import type { SkillGroup } from "@/features/skills/types/skill.types";

export interface SkillRecord {
  name: string;
  icon: string | null;
  color: string | null;
  category: string;
  sort_order: number;
}

let cachedActiveSkills: SkillRecord[] | null = null;
let activeSkillsRequest: Promise<SkillRecord[]> | null = null;

export function getActiveSkills(refresh = false): Promise<SkillRecord[]> {
  if (refresh) cachedActiveSkills = null;
  if (cachedActiveSkills) return Promise.resolve(cachedActiveSkills);
  if (activeSkillsRequest) return activeSkillsRequest;

  activeSkillsRequest = supabase
    .from("skills")
    .select("name, icon, color, category, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .then(({ data, error }) => {
      if (error) throw error;
      cachedActiveSkills = (data ?? []) as SkillRecord[];
      return cachedActiveSkills;
    })
    .catch((error: unknown) => {
      console.error("Error fetching skills:", error instanceof Error ? error.message : error);
      return [];
    })
    .finally(() => {
      activeSkillsRequest = null;
    });

  return activeSkillsRequest;
}

export async function getSkills(refresh = false): Promise<SkillGroup[]> {
  const skills = await getActiveSkills(refresh);

  const groups: SkillGroup[] = [
    { name: "Language & Framework", skills: [] },
    { name: "Tools", skills: [] },
  ];

  for (const skill of skills) {
    const group = groups.find((item) => item.name === skill.category);
    if (group) {
      group.skills.push({
        label: skill.name,
        icon: skill.icon ?? "generic",
        color: skill.color ?? "#DCE8F5",
        category: skill.category,
      });
    }
  }

  return groups;
}
