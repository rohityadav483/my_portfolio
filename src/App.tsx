import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapConfig } from '@/hooks/useGsapConfig';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import { useLenis } from '@/hooks/useLenis';
import Home from '@/pages/Home';
import ProjectsPage from '@/pages/ProjectsPage'; // was '@/pages/Projects'
import ProjectDetail from '@/pages/ProjectDetail';
import NotFound from '@/pages/NotFound';

// ...

/**
 * Root mount point for the animation hooks built in §7 (previously flagged
 * as "not mounted anywhere yet" in §8/§9/§10/§12's pending-work notes) —
 * ScrollTrigger.refresh() + scroll-to-top on every route change closes out
 * the §6 SPA-specific requirement (Astro did full page loads, so this never
 * mattered there).
 */
export default function App() {
  const { pathname } = useLocation();

  useGsapConfig();
  useScrollAnimations();
  useLenis();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Let the new route's DOM commit before re-measuring trigger positions.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:projectID" element={<ProjectDetail />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}