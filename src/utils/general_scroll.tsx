// For smooth scrolling to element IDs (anchor links)
export function smoothScrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Get element position with offset for navbar
    const navbarHeight = 80; // Adjust based on your navbar height
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    
    // Using native browser scrollTo with smooth behavior
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
  
  // Handle anchor link clicks
  export function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>): void {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      const targetId = href.replace("#", "");
      smoothScrollToElement(targetId);
    }
  }
  
  // A simplified initialization that doesn't interfere with normal scrolling
  export function initializeSmoothScrolling() {
    if (typeof window !== 'undefined') {
      // Instead of capturing wheel events (which causes issues),
      // just enhance anchor links that aren't already handled by React components
      
      document.addEventListener('click', (e) => {
        const target = e.target as Element;
        if (target.tagName === 'A' && !target.hasAttribute('data-smooth-handled')) {
          const href = target.getAttribute('href');
          if (href?.startsWith('#')) {
            e.preventDefault();
            const targetId = href.replace("#", "");
            smoothScrollToElement(targetId);
          }
        }
      });
  
      return () => {
        // Cleanup function
      };
    }
    return () => {}; // Empty cleanup function if not in browser
  }