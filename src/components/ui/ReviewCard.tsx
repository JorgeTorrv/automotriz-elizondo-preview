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

/** Tarjeta de reseña real de Google. */
export function ReviewCard({ review }: { review: Review }) {
  const initial = review.name.trim().charAt(0).toUpperCase();

  return (
    <figure className="flex h-full flex-col rounded-xl border border-border bg-surface p-6">
      <div className="flex items-center gap-3">
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

      <Stars rating={review.rating} />
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        “{review.text}”
      </blockquote>

      <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-muted">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
        Reseña en Google
      </span>
    </figure>
  );
}
