import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Internship from '@/components/sections/Internship';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import { heroConfig, aboutConfig } from '@/constants/portfolio.config';

export default function Home() {
    return (
        <MainLayout>
            <Hero config={heroConfig} />
            <About config={aboutConfig} />
            <Skills />
            <Internship />
            <Projects />
            <Contact />
        </MainLayout>
    );
}