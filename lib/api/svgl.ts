export interface SVGLLogo {
  id: number;
  title: string;
  route: string | { light: string; dark: string };
  wordmark?: string | { light: string; dark: string };
  category: string;
}

const BASE_URL = "https://api.svgl.app/";

// Simple in-memory cache to avoid redundant calls and 429s
const logoCache = new Map<string, SVGLLogo[]>();
const svgCache = new Map<string, string>();

/**
 * Search for logos on SVGL
 * @param query The title of the logo to search for
 * @returns A promise that resolves to an array of SVGLLogo objects
 */
export async function searchLogos(query: string): Promise<SVGLLogo[]> {
  if (logoCache.has(query)) return logoCache.get(query)!;

  try {
    const response = await fetch(`${BASE_URL}?search=${encodeURIComponent(query)}`);
    
    // Gracefully handle rate limiting (429)
    if (response.status === 429) {
      console.warn("SVGL API rate limited (429). Returning empty results.");
      return [];
    }

    if (!response.ok) {
      throw new Error(`SVGL API error: ${response.status} ${response.statusText || 'Unknown error'}`);
    }
    
    const data = await response.json();
    logoCache.set(query, data);
    return data;
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
  const cacheKey = `${filename}-${optimize}`;
  if (svgCache.has(cacheKey)) return svgCache.get(cacheKey)!;

  const url = `${BASE_URL}/svg/${filename}${!optimize ? '?no-optimize' : ''}`;
  try {
    const response = await fetch(url);
    
    if (response.status === 429) {
      console.warn("SVGL API rate limited (429). Returning empty SVG source.");
      return "";
    }

    if (!response.ok) {
      throw new Error(`SVGL API error: ${response.status} ${response.statusText || 'Unknown error'}`);
    }
    
    const text = await response.text();
    svgCache.set(cacheKey, text);
    return text;
  } catch (error) {
    console.error("Failed to fetch SVG source from SVGL:", error);
    return "";
  }
}
