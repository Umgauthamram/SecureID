import { useEffect } from 'react';

export const useIntersectionObserver = (refs) => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    refs.forEach(ref => {
      if (ref.current) {
        const elements = ref.current.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observer.observe(el));
      }
    });

    return () => observer.disconnect();
  }, [refs]);
};