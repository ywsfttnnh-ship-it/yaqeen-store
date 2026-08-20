import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelAr?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, labelAr, ...props }, ref) => {
    return (
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
        const input = document.querySelector(`#checkbox-${props.id}`) as HTMLInputElement | null;
        if (input) input.click();
      }}>
        <input
          type="checkbox"
          className={cn(
            "h-4 w-4 cursor-pointer rounded border-2 border-primary-600 text-primary-600",
            "focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
            "transition-all duration-200",
            "checked:bg-primary-600 checked:border-primary-600",
            className,
          )}
          ref={ref}
          id={props.id ? `checkbox-${props.id}` : undefined}
          {...props}
        />
        {(label || labelAr) && (
          <label
            htmlFor={props.id ? `checkbox-${props.id}` : undefined}
            className="text-sm text-foreground cursor-pointer select-none"
          >
            {labelAr || label}
          </label>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
