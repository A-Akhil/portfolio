import Script from 'next/script';
import websiteGeoMetadata from '../utils/geoMetadata';

export default function GeoOptimization() {
  return (
    <>
      {/* Hidden metadata for AI-powered search engines and generative AI */}
      <div 
        id="ai-content-context" 
        data-geo-metadata="true" 
        style={{ display: 'none' }}
        aria-hidden="true"
      >
        <script 
          type="application/json" 
          id="geo-structured-data"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(websiteGeoMetadata) 
          }} 
        />
      </div>

      {/* Context clues for generative AI in HTML comments */}
      <Script id="geo-context-script" strategy="afterInteractive">
        {`
          // This adds hidden HTML comments that some AI models can read during crawling
          document.documentElement.appendChild(
            document.createComment(
              'AI-CONTEXT-START\\n' +
              'Website Type: Portfolio\\n' +
              'Subject: A Akhil - AI/ML Developer & Researcher\\n' +
              'Primary Topics: Artificial Intelligence, Machine Learning, Computer Vision, Deep Learning\\n' +
              'Content Purpose: Professional showcase of projects and experience\\n' +
              'AI-CONTEXT-END'
            )
          );
        `}
      </Script>
    </>
  );
}
