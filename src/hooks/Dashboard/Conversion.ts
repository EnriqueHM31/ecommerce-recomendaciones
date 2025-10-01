import { useState, useEffect } from "react";
import ReactGA from "react-ga4";


interface UseConversionData {
    visitas: number;
}

export const useConversion = (): UseConversionData => {
    const [visitas, setVisitas] = useState<number>(0);

    // Inicializar GA4 (solo una vez)
    useEffect(() => {
        ReactGA.initialize(import.meta.env.VITE_ANALITICA); // Reemplaza con tu ID de GA4
    }, []);

    // Registrar la visita al montar el hook
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });

        // Contador local de visitas (simulación)
        setVisitas(prev => prev + 1);
    }, []);

    // Traer pedidos desde tu API



    return {
        visitas,
    };
};
