import skillsData from "@/data/skills.json";
import type { SkillGroup } from "@/features/skills/types/skill.types";

const skillGroups = skillsData as SkillGroup[];

export async function getSkills(): Promise<SkillGroup[]> {
  return skillGroups;
}
