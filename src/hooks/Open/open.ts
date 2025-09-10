import { useState, useCallback } from "react";


export function useToggle(initial: boolean = false) {
    // 🔹 Estado global (el que ya tenías)
    const [isOpen, setIsOpen] = useState(initial);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen(prev => !prev), []);

    // 🔹 Estado por id (nuevo)
    const [openId, setOpenId] = useState<string | number | null>(null);

    const openById = useCallback((id: string | number) => setOpenId(id), []);
    const closeById = useCallback(() => setOpenId(null), []);
    const toggleById = useCallback(
        (id: string | number) => setOpenId(prev => (prev === id ? null : id)),
        []
    );
    const isOpenById = useCallback(
        (id: string | number) => openId === id,
        [openId]
    );

    return {
        // 🔹 Originales
        isOpen,
        open,
        close,
        toggle,

        // 🔹 Nuevos por id
        openId,
        openById,
        closeById,
        toggleById,
        isOpenById,
    };
}
