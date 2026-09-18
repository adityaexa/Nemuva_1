import localFont from "next/font/local";

// Self-hosted (local) fonts — no runtime dependency on Google Fonts' CDN,
// which keeps builds fast/reliable and avoids an extra third-party request
// in production. Licensed under the SIL Open Font License (see the OFL-*.txt
// files alongside the font assets in src/fonts/).
export const displayFont = localFont({
  src: "../fonts/YoungSerif-Regular.ttf",
  variable: "--font-display-src",
  weight: "400",
  display: "swap",
});

export const sansFont = localFont({
  src: [
    { path: "../fonts/InstrumentSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/InstrumentSans-Italic.ttf", weight: "400", style: "italic" },
    { path: "../fonts/InstrumentSans-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-sans-src",
  display: "swap",
});

export const accentFont = localFont({
  src: "../fonts/Gloock-Regular.ttf",
  variable: "--font-accent-src",
  weight: "400",
  display: "swap",
});
