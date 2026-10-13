import { onMounted, onUnmounted, ref } from "vue";

const DEFAULT_SECTION_IDS = ["home", "about", "skills", "projects", "contact"];

export function useActiveSection(sectionIds: string[] = DEFAULT_SECTION_IDS) {
  const activeSection = ref(sectionIds[0] ?? "");
  let observer: IntersectionObserver | undefined;

  onMounted(() => {
    if (!("IntersectionObserver" in window)) return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const currentSection = visibleSections[0]?.target;
        if (currentSection instanceof HTMLElement) activeSection.value = currentSection.id;
      },
      { rootMargin: "-72px 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer?.observe(section));
  });

  onUnmounted(() => observer?.disconnect());

  return { activeSection };
}
