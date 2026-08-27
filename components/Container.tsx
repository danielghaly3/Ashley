import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  /** `wide` is for full-bleed-ish image compositions, `narrow` for prose. */
  size?: "narrow" | "default" | "wide";
  className?: string;
};

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-[110rem]",
} as const;

export default function Container({
  children,
  size = "default",
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-6 sm:px-8 lg:px-12 ${sizes[size]} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
