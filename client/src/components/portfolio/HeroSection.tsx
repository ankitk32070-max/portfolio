import { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  name?: string;
  title?: string;
  tagline?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const roles = ['Final-year BCA Student', 'Aspiring Software Developer', 'Python & C Programmer', 'Quick Learner'];

export default function HeroSection({
  name = 'Ankit Kumar',
  title = 'Final-year BCA Student',
  tagline = 'Final-year BCA student with a solid foundation in Python, C, and SQL. Seeking internships or entry-level roles in software development; eager to learn and contribute.',
  socialLinks = {
    github: 'https://github.com/Ankitkr2801',
    linkedin: 'https://www.linkedin.com/in/ankit-kumar-098a57323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    twitter: '',
    email: 'ankitkumar857993@gmail.com',
  },
}: HeroSectionProps) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    
    if (isTyping) {
      if (displayedText.length < currentRole.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentRoleIndex]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <img
          src="/images/profile.jpg"
          alt={`${name} profile`}
          className="mx-auto w-36 h-36 rounded-full object-cover mb-6 border-4 border-neon-purple/20"
        />
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-purple/30 bg-neon-purple/10 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-sm text-neon-purple font-medium">Available for opportunities</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4" data-testid="hero-name">
          <span className="text-foreground">Hi, I&apos;m </span>
          <span className="bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink bg-clip-text text-transparent">
            {name}
          </span>
        </h1>

        <div className="h-12 sm:h-16 mb-6 flex items-center justify-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground" data-testid="hero-role">
            <span className="text-neon-cyan">&lt;</span>
            <span className="mx-2">{displayedText}</span>
            <span className="border-r-2 border-neon-cyan animate-blink">&nbsp;</span>
            <span className="text-neon-cyan">/&gt;</span>
          </h2>
        </div>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8" data-testid="hero-tagline">
          {tagline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Button
            size="lg"
            onClick={() => scrollToSection('projects')}
            className="bg-gradient-to-r from-neon-purple to-neon-pink border-0 text-white font-semibold group"
            data-testid="hero-cta-primary"
          >
            View My Work
            <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection('contact')}
            className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
            data-testid="hero-cta-secondary"
          >
            Get in Touch
          </Button>
        </div>

        <div className="flex items-center justify-center gap-4">
          {socialLinks.github && (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm text-muted-foreground hover:text-neon-purple hover:border-neon-purple/50 transition-all"
              data-testid="social-github"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/50 transition-all"
              data-testid="social-linkedin"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {socialLinks.twitter && (
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm text-muted-foreground hover:text-neon-pink hover:border-neon-pink/50 transition-all"
              data-testid="social-twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {socialLinks.email && (
            <a
              href={`mailto:${socialLinks.email}`}
              className="p-3 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm text-muted-foreground hover:text-neon-green hover:border-neon-green/50 transition-all"
              data-testid="social-email"
            >
              <Mail className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      <button
        onClick={() => scrollToSection('skills')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-neon-cyan transition-colors animate-bounce"
        data-testid="scroll-indicator"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
