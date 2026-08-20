import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils/cn";
import type { ButtonVariant, ButtonSize } from "@/types";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-b from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 focus-visible:ring-primary-500 shadow-luxury hover:shadow-gold",
  secondary:
    "bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-500",
  accent:
    "bg-accent-500 text-white hover:bg-accent-600 focus-visible:ring-accent-500",
  ghost:
    "bg-transparent text-foreground hover:bg-accent focus-visible:ring-muted",
  outline:
    "border-2 border-primary-600 text-primary-600 bg-transparent hover:bg-primary-50 focus-visible:ring-primary-500",
  gold: "bg-gold-500 text-primary-900 hover:bg-gold-400 focus-visible:ring-gold-500 shadow-gold",
  dark:
    "bg-neutral-900 text-neutral-50 hover:bg-neutral-800 focus-visible:ring-neutral-500",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
  xl: "px-8 py-4 text-lg",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild, isLoading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || isLoading;
    const content = isLoading ? (
      <>
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.411A7.964 7.964 0 014 12H0c0 3.056 1.745 5.675 4.318 6.941L4 16.555z"
          />
        </svg>
        <span className="sr-only">Loading...</span>
        {children}
      </>
    ) : (
      children
    );

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "hover:transform hover:scale-[1.02] active:scale-[0.98]",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {content}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button };
