import { useState, useRef } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category: string;
}

// todo: remove mock functionality
const projects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Analytics Dashboard',
    description: 'Real-time data visualization with machine learning insights',
    longDescription: 'A comprehensive analytics platform that leverages machine learning to provide actionable insights from complex datasets.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    technologies: ['React', 'TypeScript', 'Python', 'TensorFlow', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    category: 'Full Stack',
  },
  {
    id: '2',
    title: 'E-Commerce Platform',
    description: 'Scalable online marketplace with payment integration',
    longDescription: 'A full-featured e-commerce solution with inventory management, payment processing, and real-time order tracking.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
    technologies: ['Next.js', 'Stripe', 'MongoDB', 'Redis', 'AWS'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    category: 'E-Commerce',
  },
  {
    id: '3',
    title: 'Social Media App',
    description: 'Real-time messaging and content sharing platform',
    longDescription: 'A modern social platform featuring real-time chat, story sharing, and content discovery algorithms.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop',
    technologies: ['React Native', 'Firebase', 'Node.js', 'GraphQL'],
    liveUrl: '#',
    githubUrl: '#',
    category: 'Mobile',
  },
  {
    id: '4',
    title: 'DevOps Automation Suite',
    description: 'CI/CD pipeline management and infrastructure monitoring',
    longDescription: 'Enterprise-grade DevOps tooling for automated deployments, monitoring, and infrastructure management.',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=500&fit=crop',
    technologies: ['Docker', 'Kubernetes', 'Terraform', 'Go', 'Prometheus'],
    githubUrl: '#',
    category: 'DevOps',
  },
  {
    id: '5',
    title: '3D Product Configurator',
    description: 'Interactive WebGL product customization experience',
    longDescription: 'An immersive 3D product configurator allowing customers to customize and visualize products in real-time.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
    technologies: ['Three.js', 'React', 'WebGL', 'Blender'],
    liveUrl: '#',
    githubUrl: '#',
    category: 'Creative',
  },
  {
    id: '6',
    title: 'Blockchain Voting System',
    description: 'Secure and transparent decentralized voting platform',
    longDescription: 'A blockchain-based voting system ensuring transparency, security, and immutability of electoral processes.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop',
    technologies: ['Solidity', 'Ethereum', 'React', 'Web3.js'],
    githubUrl: '#',
    category: 'Blockchain',
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('');
  };

  return (
    <div
      ref={cardRef}
      className={`relative group ${project.featured ? 'md:col-span-2' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid={`project-card-${project.id}`}
    >
      <div
        className="relative h-full min-h-[320px] rounded-lg overflow-hidden transition-all duration-300 ease-out"
        style={{ transform }}
      >
        <div 
          className={`absolute inset-0 transition-transform duration-500 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}
        >
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <Badge className="mb-3 bg-neon-purple/20 text-neon-purple border-neon-purple/30">
              {project.category}
            </Badge>
            <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-full bg-card/80 text-muted-foreground border border-border/50"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-xs px-2 py-1 rounded-full bg-card/80 text-muted-foreground border border-border/50">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                size="sm"
                onClick={() => setIsFlipped(true)}
                className="bg-gradient-to-r from-neon-purple to-neon-pink border-0 text-white"
                data-testid={`project-details-${project.id}`}
              >
                Details
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-card/80 text-muted-foreground hover:text-neon-cyan transition-colors"
                  data-testid={`project-live-${project.id}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-card/80 text-muted-foreground hover:text-neon-purple transition-colors"
                  data-testid={`project-github-${project.id}`}
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {isFlipped && (
          <div className="absolute inset-0 p-6 bg-card border border-border rounded-lg">
            <div className="flex flex-col h-full">
              <Badge className="self-start mb-3 bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30">
                {project.category}
              </Badge>
              <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 flex-grow">{project.longDescription}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsFlipped(false)}
                  className="border-border"
                  data-testid={`project-back-${project.id}`}
                >
                  Back
                </Button>
                {project.liveUrl && (
                  <Button size="sm" asChild className="bg-neon-cyan text-background border-0">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Live Demo
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button size="sm" variant="outline" asChild className="border-neon-purple/50 text-neon-purple">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen py-20 px-6" data-testid="projects-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-neon-pink">&lt;</span>
            <span className="bg-gradient-to-r from-neon-pink to-neon-orange bg-clip-text text-transparent">
              Featured Projects
            </span>
            <span className="text-neon-pink">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for building
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
