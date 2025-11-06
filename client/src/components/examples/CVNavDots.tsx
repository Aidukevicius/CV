import CVNavDots from '../CVNavDots';

export default function CVNavDotsExample() {
  return (
    <div className="p-8">
      <CVNavDots sections={["About", "Experience", "Education", "Skills", "Projects"]} />
      <div className="h-[200vh] flex items-center justify-center">
        <p className="text-muted-foreground">Scroll to see nav dots in action</p>
      </div>
    </div>
  );
}
