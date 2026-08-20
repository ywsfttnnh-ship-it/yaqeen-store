import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children?: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
  full: "max-w-[95vw] max-h-[95vh]",
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  titleAr,
  descriptionAr,
  size = "md",
  children,
  footer,
  showCloseButton = true,
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4"
      dir="rtl"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        aria-hidden="true"
      />
      <div
        className={cn(
          "relative z-[101] w-full animate-scale-in bg-background rounded-2xl border border-border",
          "shadow-luxury-xl focus:outline-none",
          size !== "full" && "my-8 max-h-[calc(100vh-4rem)] overflow-y-auto",
          sizeClasses[size],
        )}
      >
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between z-10">
          <div>
            {titleAr && <h2 id="modal-title" className="text-xl font-bold text-foreground">{titleAr}</h2>}
            {descriptionAr && <p className="text-sm text-muted-foreground mt-1">{descriptionAr}</p>}
          </div>
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-200"
              aria-label="إغلاق"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="border-t border-border p-6 bg-accent/10">{footer}</div>}
      </div>
    </div>
  );
};
