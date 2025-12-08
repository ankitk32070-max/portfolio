import HeroSection from '../portfolio/HeroSection';

export default function HeroSectionExample() {
  return (
    <div className="w-full min-h-[600px] bg-background">
      <HeroSection
        name="Alex Chen"
        title="Creative Developer"
        tagline="I build immersive digital experiences that push the boundaries of web technology."
        socialLinks={{
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          email: 'hello@developer.com',
        }}
      />
    </div>
  );
}
