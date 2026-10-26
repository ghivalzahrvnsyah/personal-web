import profileData from "@/data/profile.json";
import timelineData from "@/data/timeline.json";
import type { Profile, ProfilePhoto, Timeline, TimelineEntry } from "@/features/profile/types/profile.types";
import { supabase } from "@/lib/supabaseClient";

const profile = profileData as Profile;
const timeline = timelineData as Timeline;

export function getProfileData(): Profile {
  return profile;
}

const monthNumbers: Record<string, number> = {
  januari: 1, january: 1, februari: 2, february: 2, maret: 3, march: 3,
  april: 4, mei: 5, may: 5, juni: 6, june: 6, juli: 7, july: 7,
  agustus: 8, august: 8, september: 9, oktober: 10, october: 10,
  november: 11, desember: 12, december: 12,
};

function getPeriodRank(period: string): number {
  const normalized = period.toLowerCase();
  if (/sekarang|saat ini|present|current|ongoing/.test(normalized)) return Number.POSITIVE_INFINITY;

  const dates = [...normalized.matchAll(/(januari|january|februari|february|maret|march|april|mei|may|juni|june|juli|july|agustus|august|september|oktober|october|november|desember|december)?\s*(19\d{2}|20\d{2})/g)];
  const latestDate = dates.at(-1);
  if (!latestDate) return Number.NEGATIVE_INFINITY;

  const year = Number(latestDate[2]);
  const month = latestDate[1] ? monthNumbers[latestDate[1]] ?? 0 : 0;
  return year * 12 + month;
}

function sortTimelineEntries(entries: TimelineEntry[]): TimelineEntry[] {
  return [...entries].sort((first, second) => {
    const firstRank = getPeriodRank(first.period);
    const secondRank = getPeriodRank(second.period);
    if (firstRank === secondRank) return 0;
    return firstRank > secondRank ? -1 : 1;
  });
}

async function resolvePhotoUrl(value: string | undefined, envName: string): Promise<string> {
  const photo = value?.trim();
  if (!photo) return "";

  if (/^(https?:|data:|blob:)/i.test(photo)) return photo;

  // A machine-local path from profile.json cannot be served to a site visitor.
  if (/^[a-z]:[\\/]/i.test(photo) || photo.startsWith("\\\\")) return "";

  const bucket = import.meta.env.VITE_SUPABASE_PROFILE_PHOTOS_BUCKET;
  if (!bucket) {
    console.error("Set VITE_SUPABASE_PROFILE_PHOTOS_BUCKET to the Storage bucket name.");
    return "";
  }

  const normalizedPhoto = photo.replace(/^\/+/, "");
  const objectPath = normalizedPhoto.startsWith(`${bucket}/`)
    ? normalizedPhoto.slice(bucket.length + 1)
    : normalizedPhoto;
  const storage = supabase.storage.from(bucket);

  return storage.getPublicUrl(objectPath).data.publicUrl;
}

async function resolveCvUrl(value: string | undefined): Promise<string> {
  const cvPath = value?.trim();
  if (!cvPath) return "";
  if (/^https?:/i.test(cvPath)) return cvPath;

  const bucket = import.meta.env.VITE_SUPABASE_PROFILE_PHOTOS_BUCKET;
  if (!bucket) {
    console.error("Set VITE_SUPABASE_PROFILE_PHOTOS_BUCKET to the Storage bucket name for the CV.");
    return "";
  }

  const normalizedPath = cvPath.replace(/^\/+/, "");
  const objectPath = normalizedPath.startsWith(`${bucket}/`)
    ? normalizedPath.slice(bucket.length + 1)
    : normalizedPath;
  return supabase.storage.from(bucket).getPublicUrl(objectPath, { download: true }).data.publicUrl;
}

export async function getProfilePhotos(): Promise<ProfilePhoto | null> {
  const { data, error } = await supabase
    .from("profile-photos")
    .select("id, avatar_url, profile_photo_url")
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching profile photos:", error.message);
    return null;
  }

  return data as ProfilePhoto | null;
}

export async function getProfile(): Promise<Profile> {
  const heroPhotoPath = import.meta.env.VITE_SUPABASE_HERO_PHOTO_PATH?.trim() ?? "";
  const aboutPhotoPath = import.meta.env.VITE_SUPABASE_ABOUT_PHOTO_PATH?.trim() ?? "";
  const photos = heroPhotoPath && aboutPhotoPath
    ? null
    : await getProfilePhotos();
  const [heroPhoto, aboutPhoto, cvUrl] = await Promise.all([
    resolvePhotoUrl(
      heroPhotoPath || photos?.avatar_url || profile.heroPhoto,
      "VITE_SUPABASE_HERO_PHOTO_PATH",
    ),
    resolvePhotoUrl(
      aboutPhotoPath || photos?.profile_photo_url || profile.aboutPhoto,
      "VITE_SUPABASE_ABOUT_PHOTO_PATH",
    ),
    resolveCvUrl(profile.cvUrl),
  ]);

  return { ...profile, heroPhoto, aboutPhoto, cvUrl };
}

export function getTimeline(): Timeline {
  return {
    education: sortTimelineEntries(timeline.education ?? []),
    experience: sortTimelineEntries(timeline.experience ?? []),
  };
}
