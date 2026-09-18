import Script from "next/script";
import { siteConfig } from "@/config/siteConfig";

// Loads GA4 / GTM only when an ID is actually configured via environment
// variables (see .env.example). Nothing is loaded — and no fake ID is ever
// hardcoded — until NEXT_PUBLIC_GA4_ID / NEXT_PUBLIC_GTM_ID are set.
export function AnalyticsScripts() {
  const { ga4MeasurementId, gtmContainerId } = siteConfig.analyticsIds;

  return (
    <>
      {gtmContainerId ? (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmContainerId}');`}
        </Script>
      ) : null}

      {ga4MeasurementId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4MeasurementId}');`}
          </Script>
        </>
      ) : null}
    </>
  );
}
