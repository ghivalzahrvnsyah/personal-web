<script setup lang="ts">
import { computed, ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { useFocusTrap } from "@/composables/useFocusTrap";
import { useScrollLock } from "@/composables/useScrollLock";
import ProjectDetailContent from "@/features/projects/components/ProjectDetailContent.vue";
import type { Project } from "@/features/projects/types/project.types";

interface Props {
  project: Project | null;
  isOpen: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const dialog = ref<HTMLElement | null>(null);
const isActive = computed(() => props.isOpen && props.project !== null);

useFocusTrap(dialog, isActive, true);
useScrollLock(isActive);

function close() {
  emit("close");
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen && project"
      class="modal modal-open fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-dialog-overlay p-6"
      @click.self="close"
      @keydown.esc="close"
    >
      <section
        ref="dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Detail proyek"
        tabindex="-1"
        class="relative max-h-full w-full max-w-modal overflow-y-auto rounded-card border-retro bg-parchment shadow-retro-lg focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-twilight-indigo"
      >
        <BaseButton
          variant="secondary"
          icon-only
          aria-label="Tutup detail proyek"
          class="absolute right-4 top-4 z-10"
          @click="close"
        >
          ×
        </BaseButton>
        <ProjectDetailContent :project="project" />
      </section>
    </div>
  </Teleport>
</template>
