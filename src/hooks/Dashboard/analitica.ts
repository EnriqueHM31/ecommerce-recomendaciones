import ReactGA from "react-ga4";

export const initGA = () => {
    ReactGA.initialize(import.meta.env.VITE_ANALITICA); // 👈 tu Measurement ID de GA4
};

export const logPageView = (path?: string) => {
    ReactGA.send({
        hitType: "pageview",
        page: path || window.location.pathname,
    });
};
