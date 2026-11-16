import { onMounted, onUnmounted, ref } from "vue";

const DEFAULT_SECTION_IDS = ["home", "about", "skills", "projects", "contact"];

export function useActiveSection(sectionIds: string[] = DEFAULT_SECTION_IDS) {
  const activeSection = ref(sectionIds[0] ?? "");
  let sections: HTMLElement[] = [];
  let animationFrame = 0;

  function updateActiveSection() {
    if (animationFrame) return;

    animationFrame = window.requestAnimationFrame(() => {
      animationFrame = 0;
      if (!sections.length) return;

      const scrollPosition = window.scrollY;
      const isSmallScreen = window.matchMedia("(max-width: 639px)").matches;
      const focusRatio = isSmallScreen ? 0.8 : 0.4;
      const focusLine = scrollPosition + window.innerHeight * focusRatio;
      const isAtPageBottom = scrollPosition + window.innerHeight >= document.documentElement.scrollHeight - 2;

      if (isAtPageBottom) {
        activeSection.value = sections[sections.length - 1]?.id ?? activeSection.value;
        return;
      }

      let currentSection = sections[0];
      for (const section of sections) {
        const sectionTop = section.getBoundingClientRect().top + scrollPosition;
        if (sectionTop > focusLine) break;
        currentSection = section;
      }

      if (currentSection) activeSection.value = currentSection.id;
    });
  }

  onMounted(() => {
    sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", updateActiveSection);
    window.removeEventListener("resize", updateActiveSection);
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
  });

  return { activeSection };
}
