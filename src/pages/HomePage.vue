<script setup lang="ts">
import BackToTopButton from "@/layout/BackToTopButton.vue";
import Footer from "@/layout/Footer.vue";
import Navbar from "@/layout/Navbar.vue";
import AboutSection from "@/sections/AboutSection.vue";
import ContactSection from "@/sections/ContactSection.vue";
import HeroSection from "@/sections/HeroSection.vue";
import ProjectsSection from "@/sections/ProjectsSection.vue";
import SkillsSection from "@/sections/SkillsSection.vue";
</script>

<template>
  <Navbar />
  <main id="main-content">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ContactSection />
  </main>
  <Footer />
  <BackToTopButton /> 
</template>
