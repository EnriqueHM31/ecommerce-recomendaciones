import { Buffer } from "buffer";

declare global {
    interface Window {
        global: globalThis;
        Buffer: typeof Buffer;
    }
}
