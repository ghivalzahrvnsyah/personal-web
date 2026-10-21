<script setup lang="ts">
import Container from "@/layout/Container.vue";
import { useProfile } from "@/features/profile/composables/useProfile";

const { profile } = useProfile();
</script>
  
<template>
  <footer class="border-t-2 border-space-indigo bg-bone pb-8 pt-12">
    <Container>
      <div class="flex flex-wrap items-start justify-between gap-8">
        <div class="flex flex-wrap items-center gap-6">
          <div class="flex h-28 w-28 items-center justify-center rounded-chip border-retro bg-parchment font-body text-sm text-twilight-indigo">
            [QR Code]
          </div>
          <div class="grid gap-1 font-body text-base font-medium text-space-indigo">
            <h2 class="mb-2 font-display text-xl font-semibold">Let's Work Together:</h2>
          <a href="#contact" class="hover:text-twilight-indigo">[email@example.com]</a>
            <span>[+62 000 0000 0000]</span>
            <span>[@username]</span>
          </div>
        </div>

        <nav aria-label="Tautan sosial" class="flex items-center gap-4">
          <a href="#contact" aria-label="Email" class="flex h-12 w-12 items-center justify-center text-space-indigo transition-colors duration-retro hover:text-air-force-blue focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-twilight-indigo">
            <svg aria-hidden="true" class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
          </a>
          <a href="[LinkedIn URL]" aria-label="LinkedIn" class="flex h-12 w-12 items-center justify-center text-space-indigo transition-colors duration-retro hover:text-air-force-blue focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-twilight-indigo">
            <svg aria-hidden="true" class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v11M4 4v.01M10 20v-7a4 4 0 0 1 8 0v7M10 10v10" /></svg>
          </a>
          <a href="[GitHub URL]" aria-label="GitHub" class="flex h-12 w-12 items-center justify-center text-space-indigo transition-colors duration-retro hover:text-air-force-blue focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-twilight-indigo">
            <svg aria-hidden="true" class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.1-1.5 6.1-6.7A5.2 5.2 0 0 0 18.8 5a4.8 4.8 0 0 0-.1-3S17.5 1.7 15 3.4a13.4 13.4 0 0 0-7 0C5.5 1.7 4.3 2 4.3 2A4.8 4.8 0 0 0 4.2 5 5.2 5.2 0 0 0 2.8 8.7c0 5.2 3.1 6.4 6.1 6.7A3.4 3.4 0 0 0 8 18.1V22" /></svg>
          </a>
        </nav>
      </div>

      <div class="mt-8 border-t-2 border-space-indigo pt-6">
        <p class="font-body text-sm text-twilight-indigo">©{{ profile?.copyrightName }} 2026. All rights reserved.</p>
      </div>
    </Container>
  </footer>
</template>
