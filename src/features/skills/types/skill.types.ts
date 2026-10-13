export interface Skill {
  label: string;
  icon: string;
}

export interface SkillGroup {
  name: string;
  skills: Skill[];
}
