import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50'
            : 'bg-transparent'
        }`}
        data-testid="navigation"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <a 
              href="#home" 
              className="text-xl font-bold bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink bg-clip-text text-transparent"
              data-testid="logo"
            >
              &lt;DEV/&gt;
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.href.slice(1)
                      ? 'text-neon-cyan'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid={`nav-link-${item.href.slice(1)}`}
                >
                  {item.label}
                  {activeSection === item.href.slice(1) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="hidden md:block">
              <Button
                onClick={() => handleNavClick('#contact')}
                className="bg-gradient-to-r from-neon-purple to-neon-pink border-0 text-white font-semibold"
                data-testid="nav-cta"
              >
                Let&apos;s Talk
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          data-testid="mobile-menu"
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-2xl font-bold text-foreground hover:text-neon-cyan transition-colors"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`mobile-nav-link-${item.href.slice(1)}`}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => handleNavClick('#contact')}
              className="mt-4 bg-gradient-to-r from-neon-purple to-neon-pink border-0 text-white font-semibold"
              data-testid="mobile-nav-cta"
            >
              Let&apos;s Talk
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
