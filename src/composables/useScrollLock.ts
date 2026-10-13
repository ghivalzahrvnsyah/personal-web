import { onUnmounted, watch, type Ref } from "vue";

export function useScrollLock(isLocked: Ref<boolean>) {
  let previousOverflow = "";

  const syncScrollLock = (locked: boolean) => {
    if (typeof document === "undefined") return;

    if (locked) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflow;
    }
  };

  const stopWatch = watch(isLocked, syncScrollLock, { immediate: true });

  onUnmounted(() => {
    stopWatch();
    syncScrollLock(false);
  });
}
