'use client'
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Check for window object in effect to avoid issues during server-side rendering (SSR).
    if (typeof window !== 'undefined') {
      const mediaQueryList = window.matchMedia(query);
      
      // Function to update the state based on the media query match
      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      // Set initial state
      setMatches(mediaQueryList.matches);

      // Add event listener for changes
      mediaQueryList.addEventListener('change', listener);

      // Clean up the event listener when the component unmounts or the query changes
      return () => {
        mediaQueryList.removeEventListener('change', listener);
      };
    }
  }, [query]); // Re-run effect if the query changes

  return matches;
}