import type { HTMLAttributes, PointerEvent as ReactPointerEvent } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

export function GlassCard({
  children,
  className = "",
  interactive = true,
  onPointerLeave,
  onPointerMove,
  ...props
}: GlassCardProps) {
  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (interactive) {
      const { currentTarget, clientX, clientY } = event;
      const rect = currentTarget.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;

      currentTarget.style.setProperty("--pointer-x", `${x}%`);
      currentTarget.style.setProperty("--pointer-y", `${y}%`);
    }

    onPointerMove?.(event);
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--pointer-x", "50%");
    event.currentTarget.style.setProperty("--pointer-y", "50%");
    onPointerLeave?.(event);
  };

  return (
    <div
      {...props}
      className={`glass-panel rounded-[28px] ${interactive ? "glass-panel--interactive" : ""} ${className}`}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      {children}
    </div>
  );
}
