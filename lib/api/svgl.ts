export interface SVGLLogo {
  id: number;
  title: string;
  route: string | { light: string; dark: string };
  wordmark?: string | { light: string; dark: string };
  category: string;
}

const BASE_URL = "https://api.svgl.app/";

/**
 * Search for logos on SVGL
 * @param query The title of the logo to search for
 * @returns A promise that resolves to an array of SVGLLogo objects
 */
export async function searchLogos(query: string): Promise<SVGLLogo[]> {
  try {
    const response = await fetch(`${BASE_URL}?search=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`SVGL API error: ${response.status} ${response.statusText || 'Unknown error'}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch logos from SVGL:", error);
    return [];
  }
}

/**
 * Get the SVG URL for a logo
 * @param logo The SVGLLogo object
 * @param theme 'light' or 'dark'
 * @returns The URL string for the SVG
 */
export function getLogoUrl(logo: SVGLLogo, theme: 'light' | 'dark' = 'dark'): string {
  if (typeof logo.route === 'string') {
    return logo.route;
  }
  return theme === 'light' ? logo.route.light : logo.route.dark;
}

/**
 * Get the raw SVG source for a logo
 * @param filename The filename from the logo route (e.g., 'discord.svg')
 * @param optimize Whether to use the optimized SVG
 * @returns A promise that resolves to the SVG source code
 */
export async function fetchSvgSource(filename: string, optimize: boolean = true): Promise<string> {
  const url = `${BASE_URL}/svg/${filename}${!optimize ? '?no-optimize' : ''}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`SVGL API error: ${response.status} ${response.statusText || 'Unknown error'}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Failed to fetch SVG source from SVGL:", error);
    return "";
  }
}
