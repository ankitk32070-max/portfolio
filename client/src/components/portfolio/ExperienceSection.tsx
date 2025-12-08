import { useRef, useEffect, useState } from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
}

// todo: remove mock functionality
const experiences: Experience[] = [
  {
    id: '1',
    company: 'Tech Innovators Inc.',
    role: 'Senior Full Stack Developer',
    duration: 'Jan 2023 - Present',
    location: 'San Francisco, CA (Remote)',
    description: 'Leading development of enterprise-scale applications and mentoring junior developers.',
    achievements: [
      'Architected microservices handling 1M+ daily requests',
      'Reduced deployment time by 60% with CI/CD improvements',
      'Led team of 5 developers on major product launch',
    ],
    technologies: ['React', 'Node.js', 'AWS', 'PostgreSQL', 'Docker'],
    companyUrl: '#',
  },
  {
    id: '2',
    company: 'StartupXYZ',
    role: 'Full Stack Developer',
    duration: 'Mar 2021 - Dec 2022',
    location: 'New York, NY',
    description: 'Built and scaled core product features from ground up in a fast-paced startup environment.',
    achievements: [
      'Developed real-time collaboration feature used by 50K+ users',
      'Implemented payment system processing $2M+ monthly',
      'Optimized database queries reducing load times by 40%',
    ],
    technologies: ['Vue.js', 'Python', 'MongoDB', 'Redis', 'Stripe'],
    companyUrl: '#',
  },
  {
    id: '3',
    company: 'Digital Agency Pro',
    role: 'Frontend Developer',
    duration: 'Jun 2019 - Feb 2021',
    location: 'Los Angeles, CA',
    description: 'Created responsive web applications and interactive experiences for diverse clients.',
    achievements: [
      'Delivered 20+ client projects with 98% satisfaction rate',
      'Pioneered adoption of modern frontend frameworks',
      'Built reusable component library used across projects',
    ],
    technologies: ['React', 'TypeScript', 'SCSS', 'Three.js', 'GSAP'],
    companyUrl: '#',
  },
  {
    id: '4',
    company: 'Freelance',
    role: 'Web Developer',
    duration: 'Jan 2018 - May 2019',
    location: 'Remote',
    description: 'Provided web development services to small businesses and startups.',
    achievements: [
      'Completed 30+ projects across various industries',
      'Built e-commerce sites generating $100K+ revenue',
      'Maintained 5-star rating on freelance platforms',
    ],
    technologies: ['JavaScript', 'PHP', 'WordPress', 'MySQL', 'CSS'],
  },
];

interface TimelineItemProps {
  experience: Experience;
  index: number;
  isVisible: boolean;
}

function TimelineItem({ experience, index, isVisible }: TimelineItemProps) {
  const isEven = index % 2 === 0;

  return (
    <div 
      className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} mb-12`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: `all 0.6s ease-out ${index * 0.2}s`,
      }}
      data-testid={`experience-item-${experience.id}`}
    >
      <div className="hidden md:block w-1/2" />

      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 z-10">
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan border-4 border-background animate-glow-pulse" />
      </div>

      <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
        <div className="group p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-neon-purple/50">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-neon-purple transition-colors">
                {experience.role}
              </h3>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <span className="font-medium text-neon-cyan">{experience.company}</span>
                {experience.companyUrl && (
                  <a 
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neon-purple transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
            <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 shrink-0">
              <Briefcase className="w-3 h-3 mr-1" />
              {experience.role.includes('Senior') ? 'Senior' : 'Mid-Level'}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {experience.duration}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {experience.location}
            </span>
          </div>

          <p className="text-muted-foreground text-sm mb-4">{experience.description}</p>

          <ul className="space-y-2 mb-4">
            {experience.achievements.map((achievement, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="text-neon-green mt-1">&#8226;</span>
                {achievement}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen py-20 px-6"
      data-testid="experience-section"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-neon-green">&lt;</span>
            <span className="bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
              Work Experience
            </span>
            <span className="text-neon-green">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the impact I&apos;ve made along the way
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-neon-purple via-neon-cyan to-neon-green" />
          
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.id}
              experience={experience}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
