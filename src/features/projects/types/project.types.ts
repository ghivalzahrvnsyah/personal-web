export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailAlt: string;
  images: ProjectImage[];
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
}

export interface ProjectImage {
  url: string;
  altText: string;
}
