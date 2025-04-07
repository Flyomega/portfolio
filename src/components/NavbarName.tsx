import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useEffect, useState } from 'react';

export function NavbarName() {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  
  const nameText = t('hero.name');
  
  // Start showing navbar name when scrollY > 325
  const navbarTextOpacity = useTransform(scrollY, [325, 700], [0, 1]);
  
  // Monitor scroll position to trigger the animation
  useEffect(() => {
    const updateVisibility = () => {
      if (window.scrollY > 325 && !isVisible) {
        setIsVisible(true);
      } else if (window.scrollY <= 325 && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', updateVisibility);
    return () => window.removeEventListener('scroll', updateVisibility);
  }, [isVisible]);
  
  // Create variants for text animation
  const sentenceVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  // Split the name into first and last name
  const nameParts = nameText.split(' ');
  const lastName = nameParts[0] || '';
  const firstName = nameParts.slice(1).join(' ') || '';
  
  // Combine them in the desired order: last name + space + first name
  const displayName = `${lastName} ${firstName}`;

  return (
    <motion.div
      style={{ opacity: navbarTextOpacity }}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={sentenceVariants}
      className="text-primary font-bold text-lg md:text-xl flex justify-center mx-auto absolute left-1/2 transform -translate-x-1/2"
    >
      {displayName.split("").map((char, index) => (
        <motion.span
          key={`nav-${char}-${index}`}
          variants={letterVariants}
          className={`inline-block ${char === ' ' ? 'w-[0.3em]' : ''}`}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}