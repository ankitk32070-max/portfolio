import ParticleBackground from '@/components/portfolio/ParticleBackground';
import Navigation from '@/components/portfolio/Navigation';
import HeroSection from '@/components/portfolio/HeroSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import EducationSection from '@/components/portfolio/EducationSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';

// todo: remove mock functionality - replace with actual user data
const portfolioData = {
  name: 'Alex Chen',
  title: 'Creative Developer',
  tagline: 'I build immersive digital experiences that push the boundaries of web technology. Specializing in 3D web, interactive animations, and cutting-edge frontend development.',
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    email: 'hello@alexchen.dev',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ParticleBackground particleCount={400} />
      <Navigation />
      
      <main>
        <HeroSection
          name={portfolioData.name}
          title={portfolioData.title}
          tagline={portfolioData.tagline}
          socialLinks={portfolioData.socialLinks}
        />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}
