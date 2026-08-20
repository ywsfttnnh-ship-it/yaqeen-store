import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  reviewCount?: number;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const StarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
  </svg>
);

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ className, rating, reviewCount, showCount = true, size = "md", ...props }, ref) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-1", className)}
        role="img"
        aria-label={`${rating} of 5 stars`}
        {...props}
      >
        {Array.from({ length: fullStars }).map((_, i) => (
          <StarIcon key={`full-${i}`} className={cn("text-gold-400", sizeClasses[size])} />
        ))}
        {hasHalfStar && (
          <svg
            key="half"
            className={cn("text-gold-400", sizeClasses[size])}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            <path d="M12 2v15.27L5.82 21l1.64-7.03L2 9.24l7.19-.61z" fill="#d4d4d4" />
          </svg>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarIcon key={`empty-${i}`} className={cn("text-neutral-300", sizeClasses[size])} />
        ))}
        {showCount && reviewCount !== undefined && (
          <span className="text-sm text-muted-foreground ms-2" aria-hidden="true">
            ({reviewCount})
          </span>
        )}
      </div>
    );
  },
);

Rating.displayName = "Rating";

export { Rating };