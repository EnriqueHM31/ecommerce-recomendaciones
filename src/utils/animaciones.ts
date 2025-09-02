import type { Variants } from 'framer-motion';
export const containerAnimacion = (delay: number = 0.5): Variants => {
    return {
        hidden: {},
        show: {
            transition: {
                staggerChildren: delay
            }
        }
    };
};

export const itemAnimacion = (delay: number = 0): Variants => ({
    hidden: { opacity: 0, y: 50 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay, ease: "easeOut" }
    }
});
