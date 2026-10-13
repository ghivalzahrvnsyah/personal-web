import { nextTick, onUnmounted, watch, type Ref } from "vue";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(
  container: Ref<HTMLElement | null>,
  isActive: Ref<boolean>,
  focusContainer = false,
) {
  const onKeydown = (event: KeyboardEvent) => {
    if (event.key !== "Tab" || !container.value) return;

    const focusable = Array.from(container.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      (element) => !element.hasAttribute("hidden") && element.getAttribute("aria-hidden") !== "true",
    );

    if (focusable.length === 0) {
      event.preventDefault();
      container.value.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && (document.activeElement === first || document.activeElement === container.value)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const stopWatch = watch(
    [container, isActive],
    async ([element, active], _previous, onCleanup) => {
      if (!element || !active) return;
      await nextTick();
      if (!isActive.value || container.value !== element) return;
      element.addEventListener("keydown", onKeydown);
      onCleanup(() => element.removeEventListener("keydown", onKeydown));
      const firstFocusable = element.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      (focusContainer ? element : firstFocusable ?? element).focus();
    },
    { flush: "post" },
  );

  onUnmounted(() => {
    stopWatch();
    container.value?.removeEventListener("keydown", onKeydown);
  });
}
