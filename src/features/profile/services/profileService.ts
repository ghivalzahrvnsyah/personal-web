import profileData from "@/data/profile.json";
import timelineData from "@/data/timeline.json";
import type { Profile, Timeline } from "@/features/profile/types/profile.types";

const profile = profileData as Profile;
const timeline = timelineData as Timeline;

export async function getProfile(): Promise<Profile> {
  return profile;
}

export async function getTimeline(): Promise<Timeline> {
  return timeline;
}
