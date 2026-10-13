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
  education: TimelineEntry;
  experience: TimelineEntry[];
}
