import { onMounted, ref } from "vue";
import { getSkills } from "@/features/skills/services/skillService";
import type { SkillGroup } from "@/features/skills/types/skill.types";

export function useSkills() {
  const skillGroups = ref<SkillGroup[]>([]);
  const isLoading = ref(true);

  async function refreshSkills() {
    isLoading.value = true;
    try {
      skillGroups.value = await getSkills(true);
    } catch (error) {
      console.error("Error loading skills:", error);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => void refreshSkills());
 
  return { skillGroups, isLoading, refreshSkills };
}
