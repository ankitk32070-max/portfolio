import ParticleBackground from '../portfolio/ParticleBackground';

export default function ParticleBackgroundExample() {
  return (
    <div className="relative w-full h-[400px] bg-background overflow-hidden rounded-lg">
      <ParticleBackground particleCount={200} />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Interactive 3D particle background</p>
      </div>
    </div>
  );
}
