import { onMounted, onUnmounted, ref } from "vue";

const DEFAULT_SECTION_IDS = ["home", "about", "skills", "projects", "contact"];

export function useActiveSection(sectionIds: string[] = DEFAULT_SECTION_IDS) {
  const activeSection = ref(sectionIds[0] ?? "");
  let animationFrame = 0;

  function updateActiveSection() {
    animationFrame = 0;
    const marker = Math.min(window.innerHeight * 0.32, window.innerHeight - 1);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
      .filter((section) => section.getBoundingClientRect().top <= marker);
    const currentSection = sections[sections.length - 1];

    if (currentSection) activeSection.value = currentSection.id;
  }

  function scheduleUpdate() {
    if (animationFrame) return;
    animationFrame = window.requestAnimationFrame(updateActiveSection);
  }

  onMounted(() => {
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    scheduleUpdate();
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", scheduleUpdate);
    window.removeEventListener("resize", scheduleUpdate);
    window.removeEventListener("hashchange", scheduleUpdate);
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
  });

  return { activeSection };
}
