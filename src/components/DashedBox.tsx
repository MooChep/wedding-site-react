function DashedBox({ 
  children, 
  dashLength = 20, 
  gapLength = 15, 
  color,
  padding = 48,
  strokeWidth = 6,
  borderRadius = 40
}: Readonly<{ 
  children: React.ReactNode;
  dashLength?: number;
  gapLength?: number;
  color?: string;
  padding?: number;
  strokeWidth?: number;
  borderRadius?: number;
}>) {
  const strokeOffset = strokeWidth / 2;
  const cornerRadius = borderRadius - (strokeWidth / 2);
  
  return (
    <div className="relative h-full" style={{ padding: `${padding}px`, borderRadius: `${borderRadius}px`, backgroundColor: `#fafafa` }}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ borderRadius: `${borderRadius}px` }}
      >
        <rect
          x={strokeOffset}
          y={strokeOffset}
          width={`calc(100% - ${strokeWidth}px)`}
          height={`calc(100% - ${strokeWidth}px)`}
          rx={cornerRadius}
          ry={cornerRadius}
          fill="none"
          stroke={`${color}`}
          strokeWidth={strokeWidth}
          strokeDasharray={`${dashLength} ${gapLength}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default DashedBox;