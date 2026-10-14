import profileData from "@/data/profile.json";
import timelineData from "@/data/timeline.json";
import type { Profile, ProfilePhoto, Timeline } from "@/features/profile/types/profile.types";
import { supabase } from "@/lib/supabaseClient";

const profile = profileData as Profile;
const timeline = timelineData as Timeline;

async function resolvePhotoUrl(value: string | undefined, envName: string): Promise<string> {
  const photo = value?.trim();
  if (!photo) {
    console.warn(`Set ${envName} to the image path inside the Supabase Storage bucket.`);
    return "";
  }

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

  const { data, error } = await storage.createSignedUrl(objectPath, 60 * 60 * 24);
  if (data?.signedUrl) return data.signedUrl;

  if (error) {
    console.warn("Could not create a signed profile photo URL; trying the public bucket URL:", error.message);
  }

  return storage.getPublicUrl(objectPath).data.publicUrl;
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
  const photos = await getProfilePhotos();
  const [heroPhoto, aboutPhoto] = await Promise.all([
    resolvePhotoUrl(
      photos?.avatar_url || import.meta.env.VITE_SUPABASE_HERO_PHOTO_PATH || profile.heroPhoto,
      "VITE_SUPABASE_HERO_PHOTO_PATH",
    ),
    resolvePhotoUrl(
      photos?.profile_photo_url || import.meta.env.VITE_SUPABASE_ABOUT_PHOTO_PATH || profile.aboutPhoto,
      "VITE_SUPABASE_ABOUT_PHOTO_PATH",
    ),
  ]);

  return { ...profile, heroPhoto, aboutPhoto };
}

export async function getTimeline(): Promise<Timeline> {
  return timeline;
}
