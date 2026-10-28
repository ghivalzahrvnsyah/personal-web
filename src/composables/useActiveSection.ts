import { onMounted, onUnmounted, ref } from "vue";

const DEFAULT_SECTION_IDS = ["home", "about", "skills", "projects", "contact"];

export function useActiveSection(sectionIds: string[] = DEFAULT_SECTION_IDS) {
  const activeSection = ref(sectionIds[0] ?? "");
  let observer: IntersectionObserver | undefined;
  let sections: HTMLElement[] = [];
  const activeCandidates = new Set<string>();

  onMounted(() => {
    sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (!("IntersectionObserver" in window)) return;

    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeCandidates.add(entry.target.id);
        else activeCandidates.delete(entry.target.id);
      }

      const currentSection = sectionIds.find((id) => activeCandidates.has(id));
      if (currentSection) activeSection.value = currentSection;
    }, { threshold: 0 });

    sections.forEach((section) => observer?.observe(section));
  });

  onUnmounted(() => {
    observer?.disconnect();
    activeCandidates.clear();
  });

  return { activeSection };
}
