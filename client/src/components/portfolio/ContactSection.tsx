import { useState } from 'react';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ContactInfo {
  email: string;
  location: string;
  phone?: string;
  availability: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: typeof Github;
  color: string;
}

const contactInfo: ContactInfo = {
  email: 'ankitkumar857993@gmail.com',
  location: 'Jhajha, Bihar, India',
  phone: '7004984231',
  availability: 'Open to internships and entry-level opportunities',
};

const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/Ankitkr2801', icon: Github, color: '#181717' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/ankit-kumar-098a57323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', icon: Linkedin, color: '#0A66C2' },
];

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // todo: remove mock functionality - implement actual form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: 'Message Sent!',
      description: 'Thanks for reaching out. I\'ll get back to you soon!',
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-6" data-testid="contact-section">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-neon-cyan">&lt;</span>
            <span className="bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
              Get In Touch
            </span>
            <span className="text-neon-cyan">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let&apos;s create something amazing together!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm mb-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-neon-purple/10 transition-colors group"
                  data-testid="contact-email"
                >
                  <div className="p-3 rounded-full bg-neon-purple/20 border border-neon-purple/30 group-hover:border-neon-purple transition-colors">
                    <Mail className="w-5 h-5 text-neon-purple" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{contactInfo.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="p-3 rounded-full bg-neon-cyan/20 border border-neon-cyan/30">
                    <MapPin className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">{contactInfo.location}</p>
                  </div>
                </div>

                {contactInfo.phone && (
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-neon-green/10 transition-colors group"
                    data-testid="contact-phone"
                  >
                    <div className="p-3 rounded-full bg-neon-green/20 border border-neon-green/30 group-hover:border-neon-green transition-colors">
                      <Phone className="w-5 h-5 text-neon-green" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">{contactInfo.phone}</p>
                    </div>
                  </a>
                )}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-neon-purple/10 to-neon-cyan/10 border border-neon-purple/20">
                <p className="text-sm text-center text-neon-cyan font-medium">
                  {contactInfo.availability}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Connect With Me</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-4 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300"
                      style={{
                        boxShadow: 'none',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 20px ${social.color}50, 0 0 40px ${social.color}25`;
                        e.currentTarget.style.borderColor = social.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.borderColor = '';
                      }}
                      data-testid={`social-${social.platform.toLowerCase()}`}
                    >
                      <Icon className="w-6 h-6 transition-colors" style={{ color: social.color }} />
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {social.platform}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-foreground mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-muted/50 border-border focus:border-neon-purple"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="bg-muted/50 border-border focus:border-neon-purple"
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                  className="bg-muted/50 border-border focus:border-neon-purple"
                  data-testid="input-subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="bg-muted/50 border-border focus:border-neon-purple resize-none"
                  data-testid="input-message"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-neon-purple to-neon-pink border-0 text-white font-semibold"
                data-testid="button-submit"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">&#9696;</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
