import { Star } from "lucide-react";
import type { Review } from "@/data/business";
import { cn } from "@/lib/utils";

/** Estrellas de calificación (no depende solo del color: usa relleno). */
function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`Calificación: ${rating} de 5 estrellas`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-primary text-primary" : "text-border",
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/** Tarjeta de reseña real de un cliente. */
export function ReviewCard({ review }: { review: Review }) {
  const initial = review.name.trim().charAt(0).toUpperCase();

  return (
    <figure className="relative flex h-full flex-col rounded-xl border border-border bg-surface p-6">
      {/* Comilla de acento */}
      <span
        aria-hidden="true"
        className="font-heading absolute right-5 top-2 text-6xl leading-none text-primary/15"
      >
        &rdquo;
      </span>

      <Stars rating={review.rating} />

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-fg/90">
        {review.text}
      </blockquote>

      <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-light text-sm font-bold text-primary"
        >
          {initial}
        </span>
        <div className="min-w-0">
          <figcaption className="truncate font-semibold text-fg">
            {review.name}
          </figcaption>
          {review.date && (
            <span className="text-xs text-muted">{review.date}</span>
          )}
        </div>
      </div>
    </figure>
  );
}
