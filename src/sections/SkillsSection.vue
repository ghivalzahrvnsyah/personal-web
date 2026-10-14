<script setup lang="ts">
import { useSkills } from "@/features/skills/composables/useSkills";
import SkillGroup from "@/features/skills/components/SkillGroup.vue";
import SectionWrapper from "@/layout/SectionWrapper.vue";

const { skillGroups } = useSkills();
</script>

<template>
  <SectionWrapper id="skills" background="parchment" label="Skills">
    <div class="grid gap-12">
      <SkillGroup v-for="group in skillGroups" :key="group.name" :group="group" />
    </div>
  </SectionWrapper>
</template>
