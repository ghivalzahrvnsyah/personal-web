<script setup lang="ts">
import { useSkills } from "@/features/skills/composables/useSkills";
import BaseSkeleton from "@/components/BaseSkeleton.vue";
import SkillGroup from "@/features/skills/components/SkillGroup.vue";
import SectionWrapper from "@/layout/SectionWrapper.vue";

const { skillGroups, isLoading } = useSkills();
</script>

<template>
  <SectionWrapper id="skills" background="parchment" label="Skills">
    <div class="grid gap-12">
      <div v-if="isLoading" role="status" aria-label="Memuat keahlian" class="grid gap-12 md:grid-cols-2">
        <div v-for="group in 2" :key="group" class="grid justify-items-center gap-6">
          <BaseSkeleton class="h-10 w-48" />
          <div class="flex flex-wrap justify-center gap-4">
            <BaseSkeleton v-for="badge in 4" :key="badge" class="h-12 w-28 rounded-pill" />
          </div>
        </div>
      </div>
      <SkillGroup v-else v-for="group in skillGroups" :key="group.name" :group="group" />
    </div>
  </SectionWrapper>
</template>
