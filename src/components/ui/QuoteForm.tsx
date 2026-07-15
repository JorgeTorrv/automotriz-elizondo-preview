"use client";

import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, PhoneCall, Send } from "lucide-react";
import { business } from "@/data/business";
import {
  buildQuoteMessage,
  hasWhatsApp,
  whatsappUrl,
  type QuoteFields,
} from "@/lib/utils";

type FieldName = keyof QuoteFields;
type Errors = Partial<Record<FieldName, string>>;

const initial: QuoteFields = {
  name: "",
  phone: "",
  vehicle: "",
  service: "",
  message: "",
};

/**
 * Formulario de cotización sin backend.
 * Si hay WhatsApp confirmado, arma un mensaje estructurado y abre WhatsApp.
 * Si no lo hay, se muestra un acceso directo para llamar o enviar correo
 * (no se simula ningún envío).
 */
export function QuoteForm() {
  const whatsappAvailable = hasWhatsApp();

  const [values, setValues] = useState<QuoteFields>(initial);
  const [errors, setErrors] = useState<Errors>({});

  // Sin WhatsApp confirmado: se sustituye el formulario por accesos directos.
  if (!whatsappAvailable) {
    return (
      <div className="rounded-xl border border-border bg-surface p-6">
        <p className="text-sm leading-relaxed text-muted">
          Para solicitar información sobre un servicio, comunícate directamente
          con el taller por teléfono o correo electrónico.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${business.phoneHref}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
            Llamar al taller
          </a>
          {business.email && (
            <a
              href={`mailto:${business.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-primary hover:text-primary"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Enviar correo
            </a>
          )}
        </div>
      </div>
    );
  }

  const setField = (name: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Escribe tu nombre.";
    const phoneDigits = values.phone.replace(/\D/g, "");
    if (!values.phone.trim()) next.phone = "Escribe un teléfono de contacto.";
    else if (phoneDigits.length < 10)
      next.phone = "Escribe un teléfono válido (al menos 10 dígitos).";
    if (!values.service.trim()) next.service = "Elige un servicio.";
    return next;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const url = whatsappUrl(buildQuoteMessage(values));
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-fg placeholder:text-muted/70 focus:border-primary focus:outline-none";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Field
        id="q-name"
        label="Nombre"
        required
        error={errors.name}
        value={values.name}
        onChange={(v) => setField("name", v)}
        className={inputClass}
        autoComplete="name"
      />
      <Field
        id="q-phone"
        label="Teléfono"
        required
        type="tel"
        error={errors.phone}
        value={values.phone}
        onChange={(v) => setField("phone", v)}
        className={inputClass}
        autoComplete="tel"
      />
      <Field
        id="q-vehicle"
        label="Vehículo o modelo"
        placeholder="Ej. Nissan Versa 2018"
        error={errors.vehicle}
        value={values.vehicle}
        onChange={(v) => setField("vehicle", v)}
        className={inputClass}
      />

      <div>
        <label htmlFor="q-service" className="mb-1.5 block text-sm font-medium text-fg">
          Servicio requerido <span className="text-primary">*</span>
        </label>
        <select
          id="q-service"
          value={values.service}
          onChange={(e) => setField("service", e.target.value)}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? "q-service-error" : undefined}
          className={inputClass}
        >
          <option value="">Selecciona un servicio…</option>
          {business.services.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Otro / no estoy seguro">Otro / no estoy seguro</option>
        </select>
        {errors.service && (
          <p id="q-service-error" role="alert" className="mt-1.5 text-sm text-primary">
            {errors.service}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="q-message" className="mb-1.5 block text-sm font-medium text-fg">
          Mensaje
        </label>
        <textarea
          id="q-message"
          rows={4}
          value={values.message}
          onChange={(e) => setField("message", e.target.value)}
          placeholder="Describe la falla o el servicio que necesitas."
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-primary-hover"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Enviar por WhatsApp
      </button>
      <p className="flex items-center gap-1.5 text-xs text-muted">
        <Send className="h-3.5 w-3.5" aria-hidden="true" />
        Se abrirá WhatsApp con tu información lista para enviar. No se guardan
        datos en este sitio.
      </p>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  className: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
}

function Field({
  id,
  label,
  value,
  onChange,
  className,
  required,
  type = "text",
  placeholder,
  error,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-fg">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={className}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-primary">
          {error}
        </p>
      )}
    </div>
  );
}
