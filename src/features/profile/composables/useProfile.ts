import { onMounted, ref } from "vue";
import { getProfile, getProfileData, getTimeline } from "@/features/profile/services/profileService";
import type { Profile, Timeline } from "@/features/profile/types/profile.types";

const profile = ref<Profile>(getProfileData());
const timeline = ref<Timeline>(getTimeline());
const isLoading = ref(true);
let pendingLoad: Promise<void> | null = null;
let hasLoaded = false;

async function refreshProfile() {
  if (pendingLoad) return pendingLoad;

  isLoading.value = true;
  pendingLoad = (async () => {
    try {
      profile.value = await getProfile();
    } catch (error) {
      console.error("Error loading profile content:", error);
    } finally {
      isLoading.value = false;
      hasLoaded = true;
      pendingLoad = null;
    }
  })();

  return pendingLoad;
}

export function useProfile() {
  onMounted(() => {
    if (!hasLoaded && !pendingLoad) void refreshProfile();
  });

  return { profile, timeline, isLoading, refreshProfile };
}
