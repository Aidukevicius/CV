import HoneycombButton from '../HoneycombButton';
import { Github, Linkedin } from 'lucide-react';

export default function HoneycombButtonExample() {
  return (
    <div className="flex gap-4 items-center justify-center p-8">
      <HoneycombButton
        title="Project 1"
        description="E-commerce Platform"
        color="#3b82f6"
      />
      <HoneycombButton
        icon={<Github />}
        size="sm"
        color="#333"
      />
      <HoneycombButton
        icon={<Linkedin />}
        size="sm"
        color="#0077b5"
      />
    </div>
  );
}
