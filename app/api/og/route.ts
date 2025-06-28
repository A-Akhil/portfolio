// Create a simple OG image route that redirects to a static image
// This avoids JSX compilation issues with the dynamic OG image generation

export const runtime = 'edge';
 
export async function GET() {
  return new Response(null, {
    status: 302,
    headers: {
      'Location': '/og-image.png', // Make sure to create this static image
    },
  });
}
