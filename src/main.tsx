import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import "react-intersection-observer";
import 'web-animations-js';
import 'smoothscroll-polyfill';

// Initialize the smooth scroll polyfill
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.__forceSmoothScrollPolyfill__ = true;
  // @ts-ignore
  import('smoothscroll-polyfill').then((SmoothScrollPolyfill) => {
    SmoothScrollPolyfill.polyfill();
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);