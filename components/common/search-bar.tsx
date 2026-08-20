import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface SearchBarProps {
  initialValue?: string;
  onSearch?: (query: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  placeholderAr?: string;
  enableSuggestions?: boolean;
  className?: string;
  compact?: boolean;
}

const popularSearches = [
  "أرضية SPC",
  "بديل حجر",
  "سوفت ستون",
  "أرضيات مقاومة ماء",
  "دهانات داخلية",
];

export const SearchBar: React.FC<SearchBarProps> = ({
  initialValue = "",
  onSearch,
  onFocus,
  placeholderAr = "ابحث عن منتجات...",
  enableSuggestions = true,
  className,
  compact = false,
}) => {
  const [query, setQuery] = React.useState(initialValue);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
    setShowSuggestions(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0 && enableSuggestions) {
      setSuggestions(popularSearches.filter((s) => s.includes(value)));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className={cn("relative w-full", className)} dir="rtl">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleChange}
          onFocus={() => {
            setShowSuggestions(true);
            onFocus?.();
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholderAr}
          className={cn(
            "w-full rounded-full border border-border bg-background/50",
            "px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60",
            "focus:outline-none focus:ring-1 focus:ring-primary-500",
            "transition-all duration-200",
            compact ? "py-2" : "py-2.5",
          )}
          aria-label="بحث عن منتجات"
        />
        <button type="submit" className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 21L17.64 17.64M5 11C5 7.69 7.69 5 11 5C14.31 5 17 7.69 17 11C17 14.31 14.31 17 11 17C7.69 17 5 14.31 5 11Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>

      {enableSuggestions && showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-popover shadow-luxury-lg">
          <ul className="py-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                className="w-full px-4 py-2 text-sm text-start hover:bg-accent"
                onClick={() => {
                  setQuery(s);
                  onSearch?.(s);
                  setShowSuggestions(false);
                }}
              >
                {s}
              </button>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
