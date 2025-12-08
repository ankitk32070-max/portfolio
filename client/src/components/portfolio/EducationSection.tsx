import { useRef, useEffect, useState } from 'react';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  gpa?: string;
  achievements: string[];
  courses?: string[];
}

// todo: remove mock functionality
const educations: Education[] = [
  {
    id: '1',
    institution: 'Stanford University',
    degree: 'Master of Science',
    field: 'Computer Science',
    duration: '2017 - 2019',
    gpa: '3.9/4.0',
    achievements: [
      'Graduated with Honors',
      'Research Assistant in AI/ML Lab',
      'Published 2 papers in peer-reviewed journals',
    ],
    courses: ['Machine Learning', 'Distributed Systems', 'Advanced Algorithms'],
  },
  {
    id: '2',
    institution: 'University of California, Berkeley',
    degree: 'Bachelor of Science',
    field: 'Computer Science & Mathematics',
    duration: '2013 - 2017',
    gpa: '3.8/4.0',
    achievements: [
      'Dean\'s List all semesters',
      'President of Computer Science Club',
      'Won 3 hackathons',
    ],
    courses: ['Data Structures', 'Operating Systems', 'Database Systems'],
  },
];

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

// todo: remove mock functionality
const certifications: Certification[] = [
  { id: '1', name: 'AWS Solutions Architect Professional', issuer: 'Amazon Web Services', date: '2023', credentialId: 'AWS-SAP-123456' },
  { id: '2', name: 'Google Cloud Professional Developer', issuer: 'Google', date: '2022', credentialId: 'GCP-PD-789012' },
  { id: '3', name: 'Kubernetes Administrator (CKA)', issuer: 'CNCF', date: '2022', credentialId: 'CKA-345678' },
  { id: '4', name: 'MongoDB Developer Certification', issuer: 'MongoDB University', date: '2021' },
];

interface EducationCardProps {
  education: Education;
  index: number;
  isVisible: boolean;
}

function EducationCard({ education, index, isVisible }: EducationCardProps) {
  return (
    <div
      className="group p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-neon-cyan/50"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s ease-out ${index * 0.2}s`,
      }}
      data-testid={`education-card-${education.id}`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/30">
          <GraduationCap className="w-6 h-6 text-neon-cyan" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground group-hover:text-neon-cyan transition-colors">
            {education.institution}
          </h3>
          <p className="text-neon-purple font-medium">{education.degree}</p>
          <p className="text-muted-foreground">{education.field}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {education.duration}
        </span>
        {education.gpa && (
          <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
            GPA: {education.gpa}
          </Badge>
        )}
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
          <Award className="w-4 h-4 text-neon-orange" />
          Achievements
        </h4>
        <ul className="space-y-1">
          {education.achievements.map((achievement, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-neon-cyan">&#8226;</span>
              {achievement}
            </li>
          ))}
        </ul>
      </div>

      {education.courses && (
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-neon-pink" />
            Key Courses
          </h4>
          <div className="flex flex-wrap gap-2">
            {education.courses.map((course) => (
              <span
                key={course}
                className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function EducationSection() {
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
      id="education"
      ref={sectionRef}
      className="min-h-screen py-20 px-6"
      data-testid="education-section"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-neon-orange">&lt;</span>
            <span className="bg-gradient-to-r from-neon-orange to-neon-pink bg-clip-text text-transparent">
              Education & Certifications
            </span>
            <span className="text-neon-orange">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Academic background and professional certifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {educations.map((education, index) => (
            <EducationCard
              key={education.id}
              education={education}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Professional Certifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                className="p-4 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-neon-purple/50"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease-out ${(index + 2) * 0.15}s`,
                }}
                data-testid={`certification-${cert.id}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Award className="w-5 h-5 text-neon-orange shrink-0" />
                  <span className="text-xs text-muted-foreground">{cert.date}</span>
                </div>
                <h4 className="font-semibold text-sm text-foreground mb-1">{cert.name}</h4>
                <p className="text-xs text-neon-cyan">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
