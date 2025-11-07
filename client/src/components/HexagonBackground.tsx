
export default function HexagonBackground() {
  const createHexagonPath = (size: number) => {
    const points: [number, number][] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      points.push([
        50 + size * Math.cos(angle),
        50 + size * Math.sin(angle)
      ]);
    }
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ') + ' Z';
  };

  const hexPositions = [
    { x: 0, y: 0 },
    { x: 87, y: -50 },
    { x: 87, y: 50 },
    { x: 0, y: 100 },
    { x: -87, y: 50 },
    { x: -87, y: -50 },
    { x: 174, y: 0 },
    { x: 174, y: -100 },
    { x: 87, y: -150 },
    { x: -87, y: -150 },
    { x: -174, y: -100 },
    { x: -174, y: 0 },
    { x: -174, y: 100 },
    { x: -87, y: 150 },
    { x: 87, y: 150 },
    { x: 174, y: 100 },
  ];

  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none" 
      style={{ overflow: 'visible', opacity: 0.15 }}
    >
      <g transform="translate(200, 200)">
        {hexPositions.map((pos, idx) => (
          <path
            key={idx}
            d={createHexagonPath(50)}
            transform={`translate(${pos.x}, ${pos.y})`}
            fill="none"
            stroke="hsl(120 20% 25%)"
            strokeWidth="1"
          />
        ))}
      </g>
    </svg>
  );
}
