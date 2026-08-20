import * as React from "react";
import { cn } from "@/lib/utils/cn";
import type { InputVariant } from "@/types";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const variantStyles: Record<InputVariant, string> = {
  default: "border border-border bg-background hover:border-border focus-within:border-primary-500",
  filled: "border-0 bg-neutral-100/50 hover:bg-neutral-200/50 focus-within:bg-background focus-within:border-primary-500 border border-transparent",
  outline: "border-2 border-border bg-background focus-within:border-primary-500",
  ghost: "border-0 border-b-2 border-border bg-transparent hover:border-muted focus-within:border-primary-500",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "default", label, error, icon, type = "text", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
        )}
        <div className="relative">
          {icon && <div className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>}
          <input
            type={type}
            className={cn(
              "w-full rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60",
              "transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-primary-500",
              icon && "ps-10",
              error && "border-accent-500 focus:ring-accent-500",
              variantStyles[variant],
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-xs text-accent-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
