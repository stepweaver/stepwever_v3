'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const NavigationTransitionContext = createContext(null);

/**
 * Captures in-app navigation intent on pointerdown so transitions can start before the route commits.
 */
function NavigationIntentCapture({ beginNavigation }) {
  useEffect(() => {
    const onPointerDown = (event) => {
      if (event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const a = target.closest('a');
      if (!a || !a.href) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (a.target === '_blank') return;
      if (a.hasAttribute('download')) return;

      let url;
      try {
        url = new URL(a.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      const pathKey = `${url.pathname}${url.search || ''}`;
      const currentKey = `${window.location.pathname}${window.location.search || ''}`;
      if (pathKey === currentKey) return;

      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        url.hash
      ) {
        return;
      }

      beginNavigation(pathKey);
    };

    document.addEventListener('pointerdown', onPointerDown, true);
    return () => document.removeEventListener('pointerdown', onPointerDown, true);
  }, [beginNavigation]);

  return null;
}

export function NavigationTransitionProvider({ children }) {
  const [intent, setIntent] = useState(null);

  const beginNavigation = useCallback((pathKey) => {
    setIntent({ pathKey, startedAt: Date.now() });
  }, []);

  const clearIntent = useCallback(() => {
    setIntent(null);
  }, []);

  const value = useMemo(
    () => ({ intent, beginNavigation, clearIntent }),
    [intent, beginNavigation, clearIntent]
  );

  return (
    <NavigationTransitionContext.Provider value={value}>
      <NavigationIntentCapture beginNavigation={beginNavigation} />
      {children}
    </NavigationTransitionContext.Provider>
  );
}

export function useNavigationTransition() {
  return useContext(NavigationTransitionContext);
}
