import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, Download, ZoomIn } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionTitle } from './SectionTitle';

export function Curriculum() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <section id="curriculum" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <SectionTitle title={t('curriculum.title')} />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto"
        >
          {/* Document card with paper-stack effect */}
          <motion.div
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.02, y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="cursor-pointer relative group"
          >
            {/* Paper-stack shadow layers */}
            <div className="absolute inset-0 bg-background-light rounded-2xl translate-x-3 translate-y-3 opacity-40" />
            <div className="absolute inset-0 bg-background-light rounded-2xl translate-x-1.5 translate-y-1.5 opacity-70" />

            {/* Card body */}
            <div className="relative bg-background-light rounded-2xl overflow-hidden border border-primary/10 shadow-2xl shadow-primary/5">
              {/* Top accent bar */}
              <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />

              {/* PDF preview — non-interactive */}
              <div className="relative h-[420px] overflow-hidden pointer-events-none select-none">
                <iframe
                  src="/curriculum.pdf#toolbar=0&navpanes=0&scrollbar=0"
                  className="w-full h-full"
                  title="Curriculum Vitae"
                  tabIndex={-1}
                />
                {/* Fade-out at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="bg-background/90 backdrop-blur-sm rounded-2xl px-7 py-3.5 flex items-center gap-3 border border-primary/25 shadow-lg">
                  <ZoomIn size={19} className="text-primary" />
                  <span className="text-white font-semibold text-sm tracking-wide">
                    {t('curriculum.expand')}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Download button */}
          <motion.a
            href="/curriculum.pdf"
            download
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="mt-5 flex items-center justify-center gap-2 w-full py-3 border border-primary/30 rounded-xl text-primary hover:bg-primary/10 transition-colors text-sm font-medium"
          >
            <Download size={15} />
            {t('curriculum.download')}
          </motion.a>
        </motion.div>
      </div>

      {/* Expanded modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-background-light rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-primary/10"
            >
              {/* Modal accent bar */}
              <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-70 shrink-0" />

              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-primary/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-1 bg-primary rounded-full" />
                  <span className="text-white font-semibold">{t('curriculum.title')}</span>
                </div>
                <div className="flex items-center gap-4">
                  <motion.a
                    href="/curriculum.pdf"
                    download
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-1.5 text-primary hover:text-white transition-colors text-sm font-medium"
                  >
                    <Download size={15} />
                    {t('curriculum.download')}
                  </motion.a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/50 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>

              {/* Full PDF */}
              <iframe
                src="/curriculum.pdf"
                className="flex-1 w-full"
                title="Curriculum Vitae"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
