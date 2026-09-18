import { Testimonial } from "@/types";

// NOTE: These are clearly-marked PLACEHOLDER testimonials only, used so the
// review section is not empty before Nemuva has real customer feedback.
// Replace `isPlaceholder: true` entries with genuine, consented customer
// reviews as they come in. Do not present placeholder content as real
// customer feedback in production.
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Placeholder Customer",
    location: "Placeholder City",
    quote: "Customer feedback will appear here as Nemuva grows.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "t2",
    name: "Placeholder Customer",
    location: "Placeholder City",
    quote: "Real reviews from Nemuva customers will be added to this section soon.",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "t3",
    name: "Placeholder Business Buyer",
    location: "Placeholder Business",
    quote: "Feedback from Nemuva's bulk and business customers will be featured here.",
    rating: 5,
    isPlaceholder: true,
  },
];
