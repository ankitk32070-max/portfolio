import { useState, useRef, useEffect } from 'react';
import { 
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiNodedotjs, 
  SiPython, SiPostgresql, SiMongodb, SiDocker, SiGit, SiAmazon, SiFigma,
  SiJavascript, SiVuedotjs, SiGraphql, SiRedis
} from 'react-icons/si';

interface Skill {
  name: string;
  icon: typeof SiReact;
  level: number;
  color: string;
  category: 'frontend' | 'backend' | 'tools';
}

const skills: Skill[] = [
  { name: 'React', icon: SiReact, level: 95, color: '#61DAFB', category: 'frontend' },
  { name: 'TypeScript', icon: SiTypescript, level: 90, color: '#3178C6', category: 'frontend' },
  { name: 'Next.js', icon: SiNextdotjs, level: 88, color: '#FFFFFF', category: 'frontend' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, level: 92, color: '#06B6D4', category: 'frontend' },
  { name: 'JavaScript', icon: SiJavascript, level: 95, color: '#F7DF1E', category: 'frontend' },
  { name: 'Vue.js', icon: SiVuedotjs, level: 75, color: '#4FC08D', category: 'frontend' },
  { name: 'Node.js', icon: SiNodedotjs, level: 88, color: '#339933', category: 'backend' },
  { name: 'Python', icon: SiPython, level: 82, color: '#3776AB', category: 'backend' },
  { name: 'PostgreSQL', icon: SiPostgresql, level: 85, color: '#4169E1', category: 'backend' },
  { name: 'MongoDB', icon: SiMongodb, level: 80, color: '#47A248', category: 'backend' },
  { name: 'GraphQL', icon: SiGraphql, level: 78, color: '#E10098', category: 'backend' },
  { name: 'Redis', icon: SiRedis, level: 72, color: '#DC382D', category: 'backend' },
  { name: 'Docker', icon: SiDocker, level: 75, color: '#2496ED', category: 'tools' },
  { name: 'Git', icon: SiGit, level: 90, color: '#F05032', category: 'tools' },
  { name: 'AWS', icon: SiAmazon, level: 70, color: '#FF9900', category: 'tools' },
  { name: 'Figma', icon: SiFigma, level: 85, color: '#F24E1E', category: 'tools' },
];

const categories = [
  { id: 'all', label: 'All Skills' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'tools', label: 'Tools' },
];

interface SkillCardProps {
  skill: Skill;
  isVisible: boolean;
  index: number;
}

function SkillCard({ skill, isVisible, index }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = skill.icon;

  return (
    <div
      className="group relative p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-transparent"
      style={{
        animationDelay: `${index * 0.05}s`,
        boxShadow: isHovered ? `0 0 30px ${skill.color}40, 0 0 60px ${skill.color}20` : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`skill-card-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div 
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ 
          background: `linear-gradient(135deg, ${skill.color}10, transparent)`,
          border: `1px solid ${skill.color}50`,
          borderRadius: 'inherit',
        }}
      />
      
      <div className="relative z-10">
        <div 
          className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg transition-all duration-300"
          style={{ 
            backgroundColor: isHovered ? `${skill.color}20` : 'transparent',
          }}
        >
          <Icon 
            className="w-8 h-8 transition-all duration-300"
            style={{ color: isHovered ? skill.color : 'currentColor' }}
          />
        </div>
        
        <h3 className="text-lg font-semibold mb-2 text-foreground">{skill.name}</h3>
        
        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
            style={{
              width: isVisible ? `${skill.level}%` : '0%',
              backgroundColor: skill.color,
              boxShadow: isHovered ? `0 0 10px ${skill.color}` : 'none',
            }}
          />
        </div>
        <span className="text-xs text-muted-foreground mt-1 block text-right">{skill.level}%</span>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen py-20 px-6"
      data-testid="skills-section"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-neon-cyan">&lt;</span>
            <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Skills & Technologies
            </span>
            <span className="text-neon-cyan">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of the technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-neon-purple to-neon-cyan text-white'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-neon-purple/50'
              }`}
              data-testid={`category-${category.id}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              isVisible={isVisible}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
