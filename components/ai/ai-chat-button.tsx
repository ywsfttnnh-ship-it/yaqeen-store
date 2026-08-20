import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface AIChatButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const AIChatButton: React.FC<AIChatButtonProps> = ({ className, size = "md" }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-7 w-7",
  };

  return (
    <button
      type="button"
      onClick={() => {
        const event = new CustomEvent("openAIChat");
        window.dispatchEvent(event);
      }}
      className={cn(
        "group relative flex items-center justify-center rounded-full",
        "bg-gradient-to-r from-primary-600 to-primary-700 p-3",
        "text-white shadow-gold transition-all duration-300",
        "hover:from-primary-700 hover:to-primary-800 hover:scale-105",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
        className,
      )}
      aria-label="مساعد ذكي"
      title="مساعد ذكي"
    >
      <svg
        className={cn("transition-transform duration-300 group-hover:scale-110", sizeClasses[size])}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22L10.74 20.74C11.13 20.84 11.55 20.89 12 20.9C16.42 20.9 20 17.32 20 12C20 6.48 16.52 2 12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 7V11L15 13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16.5" cy="7.5" r="1" fill="currentColor" />
      </svg>
      <span className="absolute -top-1 -end-1 flex h-3 w-3 items-center justify-center rounded-full bg-gold-400 text-[8px] font-bold text-primary-900">
        AI
      </span>
    </button>
  );
};
