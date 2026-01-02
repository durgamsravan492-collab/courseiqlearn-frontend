declare module 'react-dom/client' {
  import type { ReactElement } from 'react';

  export function createRoot(container: Element | DocumentFragment): {
    render(element: ReactElement | string | number | null): void;
    unmount(): void;
  };

  export function hydrateRoot(
    container: Element | DocumentFragment,
    element: ReactElement
  ): { render(): void };
}
