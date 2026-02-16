import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { useLanguage } from '../context/LanguageContext';
import { projects, Project } from '../data/projects';
import { SectionTitle } from './SectionTitle';

// Helper function to get status color
const getStatusColor = (status: Project['status']) => {
  switch (status) {
    case 'finished':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'in-progress':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'not held':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { language, t } = useLanguage();
  
  const [displayedProjects] = useState<Project[]>(
    projects.filter(project => project.featured)
  );

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle title={t('projects.title')} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background-light rounded-lg p-6 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                {project.image && (
                  <div className="mb-4 overflow-hidden rounded-md">
                    {project.demo ? (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`${project.name} demo`}
                      >
                        <img 
                          src={project.image} 
                          alt={project.name}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform cursor-pointer" 
                        />
                      </a>
                    ) : (
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform" 
                      />
                    )}
                  </div>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                    {t(`projects.status.${project.status}`)}
                  </span>
                </div>
                <p className="text-gray-400 mb-4 h-20">
                  {language === 'en' ? project.description.en : project.description.fr}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary transition-colors"
                      aria-label="GitHub repository"
                    >
                      <SiGithub className="w-5 h-5" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary transition-colors"
                      aria-label="Live demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}