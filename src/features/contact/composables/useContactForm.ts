import { computed, onUnmounted, reactive, ref } from "vue";
import { sendMessage } from "@/features/contact/services/contactService";
import type { ContactErrors, ContactPayload } from "@/features/contact/types/contact.types";

const MAX_MESSAGE_LENGTH = 1000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useContactForm() {
  const form = reactive<ContactPayload>({ name: "", email: "", message: "" });
  const errors = reactive<ContactErrors>({});
  const formError = ref("");
  const isSubmitting = ref(false);
  const isSuccess = ref(false);
  const remainingCharacters = computed(() => MAX_MESSAGE_LENGTH - form.message.length);
  let successTimer: number | undefined;
  let errorTimer: number | undefined;

  function validate(): boolean {
    errors.name = form.name.trim() ? undefined : "Nama wajib diisi.";

    if (!form.email.trim()) {
      errors.email = "Email wajib diisi.";
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      errors.email = "Format email tidak valid, contoh: nama@domain.com.";
    } else {
      errors.email = undefined;
    }

    errors.message = form.message.trim() ? undefined : "Pesan wajib diisi.";
    return !errors.name && !errors.email && !errors.message;
  }

  async function submitForm() {
    formError.value = "";
    if (isSubmitting.value || !validate()) return;

    isSubmitting.value = true;
    try {
      const result = await sendMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });

      if (!result.success) throw new Error("Contact message could not be sent.");

      form.name = "";
      form.email = "";
      form.message = "";
      isSuccess.value = true;
      successTimer = window.setTimeout(() => { isSuccess.value = false; }, 3000);
    } catch {
      formError.value = "Pesan belum dapat dikirim. Silakan coba lagi.";
      errorTimer = window.setTimeout(() => { formError.value = ""; }, 5000);
    } finally {
      isSubmitting.value = false;
    }
  }

  onUnmounted(() => {
    if (successTimer !== undefined) window.clearTimeout(successTimer);
    if (errorTimer !== undefined) window.clearTimeout(errorTimer);
  });

  return { form, errors, formError, isSubmitting, isSuccess, remainingCharacters, submitForm };
}
