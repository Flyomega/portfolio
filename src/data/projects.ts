export interface Project {
  id: string;
  name: string;
  description: {
    en: string;
    fr: string;
  };
  image?: string;
  github?: string;
  demo?: string;
  technologies: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "Skeleton Game",
    name: "Skeleton Game",
    description: {
      en: "A game to discover the human body while having fun !",
      fr: "Un jeu vous permettant de découvrir l'anatomie humaine en vous amusant !"
    },
    github: "https://github.com/flyomega/Skeleton_game",
    image: "src/data/images/screen_main_menu.png",
    technologies: ["Next.js", "JavaScript", "CSS", "Three.js"],
    demo: "https://skeleton-game.vercel.app",
    featured: true
  },
  {
    id: "Les cahiers étudiants",
    name: "Les cahiers étudiants",
    description: {
      en: "A website listing student philosophical magazines.",
      fr: "Un site web répertoriant des revues philosophiques étudiantes."
    },
    github: "https://github.com/flyomega/Les_cahiers_etudiants",
    image: "src/data/images/LOGOFINAL.jpg",
    technologies: ["Next.js", "JavaScript", "CSS", "React", "PostgreSQL", "Tailwind", "Docker"],
    demo: "https://les-cahiers-etudiants.com",
    featured: true
  }
  // Add more projects as needed
];
