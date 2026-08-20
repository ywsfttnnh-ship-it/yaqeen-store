import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { Check, ChevronDown } from "lucide-react";

export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options: { value: string; label: string; labelAr?: string; disabled?: boolean }[];
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ value, onValueChange, placeholder = "اختر...", options, className, disabled, ariaLabel }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(value || "");
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      };
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open]);

    const selectedLabel = options.find((o) => o.value === selected)?.labelAr || "";

    return (
      <div ref={containerRef} className={cn("relative w-full", className)} dir="rtl">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={ariaLabel || placeholder}
          disabled={disabled}
          className={cn(
            "w-full cursor-pointer rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground",
            "flex items-center justify-between transition-all duration-200",
            "focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500",
            "hover:border-border hover:bg-accent/30",
            disabled && "cursor-not-allowed opacity-50",
            open && "border-primary-500 ring-1 ring-primary-500",
          )}
          onClick={() => !disabled && setOpen(!open)}
        >
          <span className={selected ? "text-foreground" : "text-muted-foreground/60"}>
            {selected ? selectedLabel : placeholder}
          </span>
          <ChevronDown
            className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", open && "rotate-180")}
          />
        </button>

        {open && (
          <div
            className={cn(
              "absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-border bg-popover",
              "shadow-luxury-lg py-1 ring-1 ring-border",
            )}
            role="listbox"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected === option.value}
                disabled={option.disabled}
                className={cn(
                  "w-full cursor-pointer px-4 py-2 text-sm text-start transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  selected === option.value && "bg-accent text-accent-foreground",
                  option.disabled && "cursor-not-allowed opacity-50",
                )}
                onClick={() => {
                  if (option.disabled) return;
                  setSelected(option.value);
                  onValueChange?.(option.value);
                  setOpen(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <span>{option.labelAr || option.label}</span>
                  {selected === option.value && <Check className="h-4 w-4" />}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
