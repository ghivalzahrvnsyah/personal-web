import { onMounted, ref } from "vue";
import { getProfile, getTimeline } from "@/features/profile/services/profileService";
import type { Profile, Timeline } from "@/features/profile/types/profile.types";

export function useProfile() {
  const profile = ref<Profile | null>(null);
  const timeline = ref<Timeline | null>(null);

  onMounted(async () => {
    [profile.value, timeline.value] = await Promise.all([getProfile(), getTimeline()]);
  });

  return { profile, timeline };
}
