import { onMounted, onUnmounted, type Ref } from "vue";

export function useScrollReveal(container: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | undefined;
  let mutationObserver: MutationObserver | undefined;
  let targets: HTMLElement[] = [];
  const observedTargets = new Set<HTMLElement>();
  const revealIndex = new Map<HTMLElement, number>();

  onMounted(() => {
    const root = container.value;
    if (!root || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    targets = Array.from(root.querySelectorAll<HTMLElement>("[data-scroll-reveal]"));
    if (!targets.length) return;

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          (entry.target as HTMLElement).dataset.visible = "true";
          observer?.unobserve(entry.target);
        }
      },
      { rootMargin: "-10% 0px 16% 0px", threshold: 0 },
    );

    const observeTargets = () => {
      for (const target of root.querySelectorAll<HTMLElement>("[data-scroll-reveal]")) {
        if (observedTargets.has(target)) continue;
        observedTargets.add(target);
        targets.push(target);

      const group = target.closest<HTMLElement>("[data-scroll-reveal-group]");
      if (!group) continue;
      const index = revealIndex.get(group) ?? 0;
      target.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 110}ms`);
      revealIndex.set(group, index + 1);
      target.dataset.visible = "false";
      observer.observe(target);
      }
    };

    observeTargets();
    mutationObserver = new MutationObserver(observeTargets);
    mutationObserver.observe(root, { childList: true, subtree: true });
    root.dataset.scrollReady = "true";
  });

  onUnmounted(() => {
    observer?.disconnect();
    mutationObserver?.disconnect();
    if (container.value) delete container.value.dataset.scrollReady;
    for (const target of targets) {
      delete target.dataset.visible;
      target.style.removeProperty("--reveal-delay");
    }
  });
}
