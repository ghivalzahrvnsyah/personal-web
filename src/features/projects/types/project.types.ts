export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailAlt: string;
  images: ProjectImage[];
  techStack: ProjectTech[];
  githubUrl: string;
  demoUrl: string;
}

export interface ProjectImage {
  url: string;
  altText: string;
}

export interface ProjectTech {
  label: string;
  icon: string;
  color: string;
}
