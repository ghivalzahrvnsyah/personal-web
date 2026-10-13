<script setup lang="ts">
import { computed } from "vue";

interface Props {
  id: string;
  label: string;
  modelValue: string;
  type?: "text" | "email";
  name?: string;
  placeholder?: string;
  autocomplete?: string;
  invalid?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const errorId = computed(() => `${props.id}-error`);
</script>

<template>
  <div class="grid gap-2">
    <label :for="id" class="font-body text-ui font-bold text-space-indigo">{{ label }}</label>
    <input
      :id="id"
      :name="name"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :aria-invalid="invalid ? 'true' : undefined"
      :aria-describedby="invalid ? errorId : undefined"
      class="min-h-12 w-full rounded-control border-retro bg-parchment px-4 py-3 font-body text-base text-space-indigo placeholder:text-twilight-indigo focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-twilight-indigo"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <div :id="errorId" class="min-h-6 font-body text-sm text-brick" aria-live="polite">
      <slot name="error" />
    </div>
  </div>
</template>
