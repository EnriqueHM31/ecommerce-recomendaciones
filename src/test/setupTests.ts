import "@testing-library/jest-dom"; // matchers extendidos para React Testing Library
import { vi } from 'vitest';
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,           // o true si quieres simular modo dark
        media: query,
        onchange: null,
        addListener: vi.fn(),    // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }),
});
