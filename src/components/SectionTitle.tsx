import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionTitleProps {
  title: string;
  centered?: boolean;
}

export function SectionTitle({ title, centered = true }: SectionTitleProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`flex items-center gap-4 mb-8 md:mb-12 ${centered ? 'justify-center' : 'justify-start'}`}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: '3rem' } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="h-[2px] bg-primary"
      ></motion.div>
      
      <h2 className="text-3xl md:text-4xl font-bold whitespace-nowrap">{title}</h2>
      
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: '3rem' } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="h-[2px] bg-primary"
      ></motion.div>
    </motion.div>
  );
}