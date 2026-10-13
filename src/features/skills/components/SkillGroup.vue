<script setup lang="ts">
import BaseChip from "@/components/BaseChip.vue";
import SkillIcon from "@/features/skills/components/SkillIcon.vue";
import type { SkillGroup as SkillGroupData } from "@/features/skills/types/skill.types";

interface Props {
  group: SkillGroupData;
}

defineProps<Props>();
</script>

<template>
  <article>
    <h3 class="border-b-2 border-space-indigo pb-2 font-display text-h3 font-semibold text-space-indigo">
      {{ group.name }}
    </h3>
    <ul class="mt-6 flex flex-wrap gap-4">
      <li v-for="skill in group.skills" :key="skill.label">
        <BaseChip :label="skill.label" variant="skill">
          <template #icon>
            <SkillIcon :icon="skill.icon" />
          </template>
        </BaseChip>
      </li>
    </ul>
  </article>
</template>
