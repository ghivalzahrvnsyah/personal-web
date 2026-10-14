<script setup lang="ts">
import SkillIcon from "@/features/skills/components/SkillIcon.vue";
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
        <span
          class="inline-flex min-h-12 max-w-full items-center gap-2 rounded-control border-retro px-4 py-2 font-display text-sm font-semibold text-white shadow-retro sm:text-base"
          :style="{ backgroundColor: skill.color }"
        >
          <SkillIcon :icon="skill.icon" :name="skill.label" />
          <span>{{ skill.label }}</span>
        </span>
      </li>
    </ul>
  </article>
</template>
