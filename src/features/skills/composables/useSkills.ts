import { onMounted, ref } from "vue";
import { getSkills } from "@/features/skills/services/skillService";
import type { SkillGroup } from "@/features/skills/types/skill.types";

export function useSkills() {
  const skillGroups = ref<SkillGroup[]>([]);

  onMounted(async () => {
    skillGroups.value = await getSkills();
  });
 
  return { skillGroups }; 
}
 