import { useState, useCallback } from "react";


export function useToggle(initial: boolean = false) {
    // 🔹 Estado global (el que ya tenías)
    const [isOpen, setIsOpen] = useState(initial);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen(prev => !prev), []);

    // 🔹 Estado por id (nuevo)
    const [openIds, setOpenIds] = useState<Record<string | number, boolean>>({});

    const toggleById = useCallback((id: string | number) => {
        setOpenIds((prev) => ({
            ...prev,
            [id]: !prev[id], // cambia solo ese id
        }));
    }, []);

    const openById = useCallback((id: string | number) => {
        setOpenIds((prev) => ({
            ...prev,
            [id]: true,
        }));
    }, []);

    const closeById = useCallback((id: string | number) => {
        setOpenIds((prev) => ({
            ...prev,
            [id]: false,
        }));
    }, []);

    const isOpenById = useCallback(
        (id: string | number) => !!openIds[id],
        [openIds]
    );


    return {
        // 🔹 Originales
        isOpen,
        open,
        close,
        toggle,

        // 🔹 Nuevos por id
        openIds,
        openById,
        closeById,
        toggleById,
        isOpenById,
    };
}
