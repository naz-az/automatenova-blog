import { ADSENSE_PUBLISHER_ID } from "@/lib/constants";

interface AdSensePlaceholderProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

export default function AdSensePlaceholder({
  slot = "XXXXXXXXXX",
  format = "auto",
  className = "",
}: AdSensePlaceholderProps) {
  return (
    <div
      className={`my-8 bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center min-h-[250px] ${className}`}
      data-ad-client={ADSENSE_PUBLISHER_ID}
      data-ad-slot={slot}
      data-ad-format={format}
    >
      {/*
        Replace this placeholder with actual AdSense code:

        <ins className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_PUBLISHER_ID}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />

        And add the AdSense script to your layout.tsx:
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
          crossOrigin="anonymous"
        />
      */}
      <p className="text-gray-400 text-sm">Advertisement</p>
    </div>
  );
}
