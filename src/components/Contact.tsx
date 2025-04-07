import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Linkedin, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { useLanguage } from '../context/LanguageContext';
import { SectionTitle } from './SectionTitle';
import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

export function Contact() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{name?: string; email?: string; message?: string}>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error when user starts typing
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [id]: undefined
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: {name?: string; email?: string; message?: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormStatus('loading');
    
    // EmailJS configuration with added private key for security
    const serviceId = import.meta.env.VITE_CONTACT_SERVICE_ID;
    const templateId = import.meta.env.VITE_CONTACT_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_CONTACT_PUBLIC_KEY;
    
    // Create template parameters - make sure these match your EmailJS template variables
    const templateParams = {
      from_name: formData.name,
      email: formData.email,
      message: formData.message,
      reply_to: formData.email,
    };
    
    try {
      await emailjs.send(
        serviceId, 
        templateId, 
        templateParams,
        publicKey
      );
      
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
      
      // Reset error status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-light to-background" />
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <SectionTitle title={t('contact.title')} centered={true} />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-4">{t('contact.subtitle')}</h3>
              <p className="text-gray-400 text-lg mb-8">
                {t('contact.description')}
              </p>
              
              <div className="space-y-4">
                <a
                  href="mailto:your.email@example.com"
                  className="group flex items-center gap-4 p-4 bg-background-light rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-400">adrien.aribaut-gaudin@orange.fr</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary transform group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="https://github.com/flyomega"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 bg-background-light rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <SiGithub className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">GitHub</h4>
                    <p className="text-gray-400">github.com/flyomega</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary transform group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="https://linkedin.com/in/adrien-aribaut-gaudin-b7393b267/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 bg-background-light rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Linkedin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">LinkedIn</h4>
                    <p className="text-gray-400">linkedin.com/in/adrien-aribaut-gaudin</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-background-light p-8 rounded-2xl shadow-xl shadow-primary/5"
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">{t("contact.form.name")}</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-background rounded-lg border ${
                      errors.name ? 'border-red-500' : 'border-gray-700'
                    } px-4 py-2 focus:outline-none focus:border-primary transition-colors`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">{t("contact.form.email")}</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-background rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-700'
                    } px-4 py-2 focus:outline-none focus:border-primary transition-colors`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">{t("contact.form.message")}</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full bg-background rounded-lg border ${
                      errors.message ? 'border-red-500' : 'border-gray-700'
                    } px-4 py-2 focus:outline-none focus:border-primary transition-colors`}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>
                
                {formStatus === 'success' && (
                  <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{t('contact.form.success')}</span>
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span>{t('contact.form.error')}</span>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className={`w-full ${
                    formStatus === 'loading' ? 'bg-primary/70' : 'bg-primary hover:bg-primary-dark'
                  } text-white py-2 rounded-lg transition-colors flex justify-center items-center`}
                >
                  {formStatus === 'loading' ? (
                    <>
                      <span className="animate-pulse">Sending...</span>
                    </>
                  ) : (
                    t("contact.form.submit")
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}