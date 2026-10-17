<script setup lang="ts">
import BaseSkillBadge from "@/components/BaseSkillBadge.vue";
import type { SkillGroup as SkillGroupData } from "@/features/skills/types/skill.types";

interface Props {
  group: SkillGroupData;
}

defineProps<Props>();
</script>

<template>
  <article>
    <h3 class="text-center font-display text-h3 font-semibold text-space-indigo">
      {{ group.name }}
    </h3>
    <ul class="mt-6 flex flex-wrap justify-center gap-4">
      <li v-for="skill in group.skills" :key="skill.label">
        <BaseSkillBadge :label="skill.label" :icon="skill.icon" :color="skill.color" />
      </li>
    </ul>
  </article>
</template>
