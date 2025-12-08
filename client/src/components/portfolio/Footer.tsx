import { Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-border/50 bg-card/30 backdrop-blur-sm" data-testid="footer">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-neon-pink animate-pulse" />
            <span>using</span>
            <span className="text-neon-cyan">React</span>
            <span>&</span>
            <span className="text-neon-purple">Three.js</span>
          </div>

          <div className="text-center">
            <span className="text-muted-foreground text-sm">
              &copy; {currentYear} 
              <span className="mx-1 bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent font-semibold">
                Developer
              </span>
              All rights reserved.
            </span>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            className="border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10"
            data-testid="scroll-to-top"
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
