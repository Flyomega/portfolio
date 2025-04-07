import { motion } from 'framer-motion';
import { Mail, Linkedin, Globe } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { NavbarName } from './components/NavbarName';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function MainContent() {
  const { language, toggleLanguage, t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background text-white">
      <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b border-primary/10">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-primary font-bold text-xl"
            >
              Portfolio
            </motion.div>
            
            {/* Central position for name */}
            <NavbarName />
            
            <div className="flex items-center gap-4 md:gap-6">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
              >
                <Globe className="w-6 h-6" />
                <span>{language === 'en' ? 'EN' : 'FR'}</span>
              </button>
              <a href="https://github.com/flyomega" target="_blank" rel="noopener noreferrer">
                <SiGithub className="w-5 h-5 md:w-6 md:h-6 hover:text-primary transition-colors" />
              </a>
              <a href="https://linkedin.com/in/adrien-aribaut-gaudin-b7393b267/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 md:w-6 md:h-6 hover:text-primary transition-colors" />
              </a>
              <a href="mailto:adrien.aribaut-gaudin@orange.fr">
                <Mail className="w-5 h-5 md:w-6 md:h-6 hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      <footer className="bg-background-light py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} ARIBAUT-GAUDIN Adrien. {t('footer.rights')}</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}

export default App;