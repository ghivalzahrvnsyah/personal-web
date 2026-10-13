<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseTextarea from "@/components/BaseTextarea.vue";
import type { ContactErrors } from "@/features/contact/types/contact.types";

interface Props {
  name: string;
  email: string;
  message: string;
  errors: ContactErrors;
  formError: string;
  isSubmitting: boolean;
  remainingCharacters: number;
}

defineProps<Props>();

const emit = defineEmits<{
  "update:name": [value: string];
  "update:email": [value: string];
  "update:message": [value: string];
  submit: [];
}>();
</script>

<template>
  <form class="grid gap-6" novalidate @submit.prevent="emit('submit')">
    <p v-if="formError" role="alert" class="font-body text-sm text-brick">{{ formError }}</p>

    <BaseInput
      id="contact-name"
      label="Nama"
      name="name"
      autocomplete="name"
      placeholder="Nama Anda"
      :model-value="name"
      :invalid="Boolean(errors.name)"
      @update:model-value="emit('update:name', $event)"
    >
      <template #error>{{ errors.name }}</template>
    </BaseInput>

    <BaseInput
      id="contact-email"
      label="Email"
      name="email"
      type="email"
      autocomplete="email"
      placeholder="email@example.com"
      :model-value="email"
      :invalid="Boolean(errors.email)"
      @update:model-value="emit('update:email', $event)"
    >
      <template #error>{{ errors.email }}</template>
    </BaseInput>

    <BaseTextarea
      id="contact-message"
      label="Pesan"
      name="message"
      placeholder="Tulis pesan Anda di sini..."
      :model-value="message"
      :maxlength="1000"
      :remaining="remainingCharacters"
      :invalid="Boolean(errors.message)"
      @update:model-value="emit('update:message', $event)"
    >
      <template #error>{{ errors.message }}</template>
    </BaseTextarea>

    <BaseButton variant="cta" type="submit" :disabled="isSubmitting" class="md:justify-self-start">
      {{ isSubmitting ? "Mengirim..." : "Kirim Pesan" }}
    </BaseButton>
  </form>
</template>
