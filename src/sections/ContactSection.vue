<script setup lang="ts">
import { useContactForm } from "@/features/contact/composables/useContactForm";
import ContactForm from "@/features/contact/components/ContactForm.vue";
import ContactSuccessPanel from "@/features/contact/components/ContactSuccessPanel.vue";
import SectionWrapper from "@/layout/SectionWrapper.vue";

const { form, errors, formError, isSubmitting, isSuccess, remainingCharacters, submitForm } = useContactForm();
</script>
 
<template>
  <SectionWrapper id="contact" background="parchment" narrow>
    <div class="grid gap-8">
      <header class="grid gap-4">
          <p class="font-body text-base font-bold uppercase tracking-eyebrow text-space-indigo" data-scroll-reveal>Contact</p>
        <h2 class="font-display text-h2 font-bold text-space-indigo" data-scroll-reveal>
          <span aria-hidden="true">“</span>Mari bekerja sama<span class="text-air-force-blue">.</span>
        </h2>
        <p class="font-body text-body-lg leading-relaxed text-twilight-indigo" data-scroll-reveal>
          Jika Anda tertarik untuk bekerja sama, memiliki pertanyaan, atau ingin menghubungi saya, silakan isi formulir di bawah ini. Saya akan berusaha merespons secepat mungkin.
        </p>
      </header>
        

      <ContactSuccessPanel v-if="isSuccess" data-scroll-reveal />
      <ContactForm 
        v-else
        v-model:name="form.name"
        v-model:email="form.email"
        v-model:message="form.message"
        :errors="errors"
        :form-error="formError"
        :is-submitting="isSubmitting"
        :remaining-characters="remainingCharacters"
        data-scroll-reveal
        @submit="submitForm"
      />
    </div>
  </SectionWrapper>
</template>