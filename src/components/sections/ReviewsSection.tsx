import { MapPin, Star } from "lucide-react";
import { business } from "@/data/business";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { ContactButton } from "@/components/ui/ContactButton";
import { Reveal } from "@/components/ui/Reveal";

export function ReviewsSection() {
  return (
    <section id="resenas" className="bg-surface py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Testimonios"
              title="Opiniones de nuestros clientes"
            />
          </Reveal>

          {/* Resumen de calificación (dato público de Google, con atribución) */}
          <Reveal>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
              <span className="text-2xl font-bold text-fg">
                {business.rating.value.toFixed(1)}
              </span>
              <div>
                <span
                  className="flex items-center gap-0.5"
                  role="img"
                  aria-label={`${business.rating.value} de 5 estrellas`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < Math.round(business.rating.value)
                          ? "h-4 w-4 fill-primary text-primary"
                          : "h-4 w-4 text-border"
                      }
                      aria-hidden="true"
                    />
                  ))}
                </span>
                <span className="text-xs text-muted">
                  {business.rating.count} reseñas en Google
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {business.reviews.map((review, i) => (
            <Reveal key={review.name} delay={Math.min(i * 0.05, 0.25)}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <ContactButton
            href={business.googleMapsUrl}
            variant="secondary"
            size="lg"
            external
            icon={<MapPin className="h-5 w-5" aria-hidden="true" />}
          >
            Ver ubicación y reseñas en Google
          </ContactButton>
        </Reveal>
      </div>
    </section>
  );
}
