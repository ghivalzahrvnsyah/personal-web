export interface Skill {
  label: string;
  icon: string;
  color: string;
  category: string;
}

export interface SkillGroup {
  name: string;
  skills: Skill[];
}
