import { supabase } from "@/lib/supabaseClient";
import type { SkillGroup } from "@/features/skills/types/skill.types";

export async function getSkills(): Promise<SkillGroup[]> {
  const { data, error } = await supabase
    .from("skills")
    .select("name, icon, color, category, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching skills:", error.message);
    return [
      { name: "Language & Framework", skills: [] },
      { name: "Tools", skills: [] },
    ];
  }

  const groups: SkillGroup[] = [
    { name: "Language & Framework", skills: [] },
    { name: "Tools", skills: [] },
  ];

  for (const skill of data ?? []) {
    const group = groups.find((item) => item.name === skill.category);
    if (group) {
      group.skills.push({
        label: skill.name,
        icon: skill.icon ?? "generic",
        color: skill.color ?? "#273469",
        category: skill.category,
      });
    }
  }

  return groups;
}
