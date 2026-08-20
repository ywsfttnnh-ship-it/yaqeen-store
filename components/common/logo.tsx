import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { config } from "@/lib/config";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  priority?: boolean;
  textClassName?: string;
}

const sizeConfig = {
  sm: { width: 40, height: 40, textSize: "text-xl" },
  md: { width: 64, height: 64, textSize: "text-2xl" },
  lg: { width: 96, height: 96, textSize: "text-3xl" },
};

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  showText = true,
  className,
  priority = false,
  textClassName,
}) => {
  const { width, height, textSize } = sizeConfig[size];
  const logoSrc = "/assets/products/لوقو المتجر/img-025.png";

  return (
    <Link href="/" className="inline-flex items-center gap-3 group" aria-label={config.app.name.en}>
      <div className="relative">
        <Image
          src={logoSrc}
          alt={config.app.name.en}
          width={width}
          height={height}
          priority={priority}
          className={cn("object-contain transition-transform duration-300 group-hover:scale-105", className)}
        />
      </div>
      {showText && (
        <span
          className={cn(
            "font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-500 to-gold-700",
            textSize,
            textClassName,
          )}
        >
          {config.app.name.ar}
        </span>
      )}
    </Link>
  );
};

export const LogoText: React.FC<{ className?: string }> = ({ className }) => (
  <span className={cn("font-display font-bold text-primary-800", className)}>
    {config.app.name.ar}
  </span>
);
