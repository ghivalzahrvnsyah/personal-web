export interface ProfilePhoto {
  id: number;
  avatar_url: string | null;
  profile_photo_url: string | null;
}

export interface Profile {
  firstName: string;
  lastName: string;
  year: string;
  tagline: string;
  cvUrl: string;
  heroPhoto: string;
  aboutPhoto: string;
  aboutParagraphs: string[];
  copyrightName: string;
}

export interface TimelineEntry {
  title: string;
  organization: string;
  period: string;
}

export interface Timeline {
  education: TimelineEntry[];
  experience: TimelineEntry[];
}
