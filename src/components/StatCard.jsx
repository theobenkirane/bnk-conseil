export default function StatCard({
  value,
  label,
  image,
  variant = 1,
  className = '',
}) {
  // Define clip-paths for each variant
  const clipPaths = {
    1: 'polygon(64px 0%, 100% 0%, 100% 100%, 14px 100%, 0% calc(100% - 14px), 0% 64px)',
    2: 'polygon(0% 0%, calc(100% - 64px) 0%, 100% 64px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0% 100%)',
    3: 'polygon(14px 0%, 100% 0%, 100% calc(100% - 64px), calc(100% - 64px) 100%, 14px 100%, 0% calc(100% - 14px), 0% 14px)',
  };

  // Define text positions for each variant
  const textPositions = {
    1: 'left-6 right-6 bottom-6',
    2: 'left-6 bottom-20',
    3: 'left-6 right-28 bottom-6',
  };

  const clipPath = clipPaths[variant] || clipPaths[1];
  const textPosition = textPositions[variant] || textPositions[1];

  return (
    <div
      className={`w-full h-[280px] sm:h-[340px] relative ${className}`}
      style={{
        background: 'rgba(255,255,255,0.8)',
        padding: '1.5px',
        clipPath,
      }}
    >
      {/* Background image with mix-blend-mode */}
      <div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          mixBlendMode: 'plus-darker',
          clipPath,
        }}
      />

      {/* Text overlay */}
      <div className={`absolute ${textPosition} flex flex-col gap-2`}>
        <span
          className="font-firs text-[36px] sm:text-[52px] font-semibold leading-none"
          style={{
            background: 'linear-gradient(294deg, #185B7B 20%, #4BBDF0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {value}
        </span>
        <span className="text-[14px] text-[#154359] leading-snug max-w-[12em]">
          {label}
        </span>
      </div>
    </div>
  );
}
