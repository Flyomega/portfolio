import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { handleSmoothScroll } from '../utils/general_scroll';

export function Hero() {
  const { t } = useLanguage();
  const greeting = t('hero.greeting');
  const fullName = t('hero.name');
  const nameArray = fullName.split(' ');
  const firstName = nameArray[0];
  const lastName = nameArray.length > 1 ? nameArray.slice(1).join(' ') : '';

  // Animation for greeting text (fade in)
  const greetingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  const firstNameContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06, // Slightly faster staggering for smoother appearance
        delayChildren: 0.7,
      },
    },
  };
  
  const lastNameContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06, // Keep consistent with firstName
        delayChildren: 0.7 + (firstName.length * 0.06) + 0.3,
      },
    },
  };


  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 330,
        damping: 24,
        mass: 0.9,
        duration: 0.15
      }
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-primary/10 animate-gradient-x" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block p-1 px-3 rounded-full bg-primary/10 text-primary mb-6">
            {t('hero.available')}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 overflow-hidden">
            <motion.span
              initial="hidden"
              animate="visible"
              variants={greetingVariants}
              className="block mb-2" // Make greeting appear on its own line
            >
              {greeting}
            </motion.span>
            
            {/* First name on new line */}
            <motion.span
              initial="hidden"
              animate="visible"
              variants={firstNameContainerVariants}
              className="text-primary block" // Make first name appear on a new line
            >
              {firstName.split("").map((char, index) => (
                <motion.span
                  key={`firstname-${char}-${index}`}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
            
            {/* Last name */}
            {lastName && (
              <motion.span
                initial="hidden"
                animate="visible"
                variants={lastNameContainerVariants}
                className="text-primary inline-block ml-3" // Add margin between first and last name
              >
                {lastName.split("").map((char, index) => (
                  <motion.span
                    key={`lastname-${char}-${index}`}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            )}
          </h1>
          <h1
            className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-6 md:mb-8"
          >
            {t('hero.occupation')}
          </h1>
          <div
            className="flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#contact"
              onClick={handleSmoothScroll}
              className="group relative px-8 py-3 bg-primary hover:bg-primary-dark rounded-full font-medium transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/20"
            >
              {t('hero.cta')}
              <div className="absolute inset-0 rounded-full bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
            <a
              onClick={handleSmoothScroll}
              href="#projects"
              className="group px-8 py-3 border border-primary/20 hover:border-primary rounded-full font-medium transition-all duration-300 transform hover:translate-y-[-2px]"
            >
              {t('hero.ctaProjects')}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-primary"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}