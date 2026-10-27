<script setup lang="ts">
import { ref } from "vue";
import { useScrollReveal } from "@/composables/useScrollReveal";
import BackToTopButton from "@/layout/BackToTopButton.vue";
import Footer from "@/layout/Footer.vue";
import Navbar from "@/layout/Navbar.vue";
import AboutSection from "@/sections/AboutSection.vue";
import ContactSection from "@/sections/ContactSection.vue";
import HeroSection from "@/sections/HeroSection.vue";
import ProjectsSection from "@/sections/ProjectsSection.vue";
import SkillsSection from "@/sections/SkillsSection.vue";

const pageContent = ref<HTMLElement | null>(null);
useScrollReveal(pageContent);
</script>
   
<template>
  <Navbar />
  <main id="main-content" ref="pageContent">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ContactSection />
  </main>
  <Footer />
  <BackToTopButton /> 
</template> 
 
