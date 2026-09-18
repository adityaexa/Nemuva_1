"use client";

import { useState } from "react";
import { FAQItem } from "@/types";
import { ChevronDown } from "@/components/shared/icons";
import { JsonLd } from "@/components/shared/JsonLd";
import { faqPageSchema } from "@/lib/schema";

export function FAQAccordion({ items, includeSchema = true }: { items: FAQItem[]; includeSchema?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--color-beige-dark)] rounded-2xl border border-[var(--color-beige-dark)] bg-white">
      {includeSchema && <JsonLd data={faqPageSchema(items)} />}
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[0.95rem] font-semibold text-[var(--color-brown-900)]"
              >
                {item.question}
                <ChevronDown
                  className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 text-sm leading-relaxed text-[var(--color-ink-soft)]"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
