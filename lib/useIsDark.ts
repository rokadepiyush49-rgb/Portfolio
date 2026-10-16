'use client';

import { useEffect, useState } from 'react';

/**
 * Follows the `dark` class the theme toggle flips on <html>, for components
 * that draw their own colours (WebGL canvases) and can't use `dark:` variants.
 * Dark is the default, so that's also the server-render guess.
 */
export function useIsDark() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDark(root.classList.contains('dark'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return dark;
}
