<script setup lang="ts">
import { computed } from "vue";

interface Props {
  id: string;
  label: string;
  modelValue: string;
  maxlength?: number;
  remaining?: number;
  rows?: number;
  name?: string;
  placeholder?: string;
  invalid?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  maxlength: 1000,
  rows: 5,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const remaining = computed(() => props.remaining ?? Math.max(0, props.maxlength - props.modelValue.length));
const errorId = computed(() => `${props.id}-error`);
</script>

<template>
  <div class="grid gap-2">
    <label :for="id" class="font-body text-ui font-bold text-space-indigo">{{ label }}</label>
    <textarea
      :id="id"
      :name="name"
      :rows="rows"
      :maxlength="maxlength"
      :value="modelValue"
      :placeholder="placeholder"
      :aria-invalid="invalid ? 'true' : undefined"
      :aria-describedby="invalid ? errorId : undefined"
      class="w-full resize-y rounded-control border-retro bg-parchment px-4 py-3 font-body text-base text-space-indigo placeholder:text-twilight-indigo focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-twilight-indigo"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <div class="flex min-h-6 items-center justify-between gap-4 font-body text-sm">
      <div :id="errorId" class="min-h-6 text-brick" aria-live="polite">
        <slot name="error" />
      </div>
      <p class="shrink-0 text-twilight-indigo" aria-live="polite">{{ remaining }} karakter tersisa</p>
    </div>
  </div>
</template>
