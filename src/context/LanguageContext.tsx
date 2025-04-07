import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'hero.greeting': "Hi, I'm",
    'hero.name': 'ARIBAUT-GAUDIN Adrien',
    'hero.occupation': 'IT Student & Capgemini Intern',
    'hero.cta': 'Get in touch',
    'hero.ctaProjects': 'View my projects',
    'hero.available': 'Available for Work',
    'about.title': 'About Me',
    'about.paragraph1': "I'm a passionate IT student in my final year of studies, specializing in generative AI and backend development. With a strong foundation in modern web technologies and a keen eye for detail, I create elegant solutions to complex problems.",
    'about.paragraph2': "Currently completing my final internship, I'm eager to apply my skills and knowledge in a professional environment while continuing to learn and grow.",
    'skills.title': 'Technicals Skills',
    'contact.title': 'Get in Touch',
    'contact.description': "I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
    'contact.subtitle': 'Contact Me',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.success': 'Message sent successfully!',
    'contact.form.error': 'Error sending message.',
    'footer.rights': 'All rights reserved.',
    'projects.title': 'My Projects',
    'projects.viewAll': 'View all projects'
  },
  fr: {
    'hero.greeting': "Bonjour, je suis",
    'hero.name': 'ARIBAUT-GAUDIN Adrien',
    'hero.occupation': 'Étudiant en informatique & Stagiaire chez Capgemini',
    'hero.cta': 'Me contacter',
    'hero.ctaProjects': 'Voir mes projets',
    'hero.available': 'Disponible pour un emploi',
    'about.title': 'À propos de moi',
    'about.paragraph1': "Je suis un étudiant en informatique passionné, en dernière année d'études, spécialisé dans l'IA générative et le développement backend. Avec une solide formation dans les technologies web modernes et un sens aigu du détail, je crée des solutions élégantes à des problèmes complexes.",
    'about.paragraph2': "En train de terminer mon stage de fin d'études, je suis enthousiaste à l'idée d'appliquer mes compétences et connaissances dans un environnement professionnel tout en continuant à apprendre et à grandir.",
    'skills.title': 'Compétences Techniques',
    'contact.title': 'Me Contacter',
    'contact.description': "Je suis actuellement à la recherche de nouvelles opportunités. Que vous ayez une question ou que vous souhaitiez simplement me saluer, je ferai de mon mieux pour vous répondre !",
    'contact.subtitle': 'Contactez-moi',
    'contact.form.name': 'Nom',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Envoyer le message',
    'contact.form.success': 'Message envoyé avec succès !',
    'contact.form.error': 'Erreur lors de l\'envoi du message.',
    'footer.rights': 'Tous droits réservés.',
    'projects.title': 'Mes Projets',
    'projects.viewAll': 'Voir tous les projets',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
