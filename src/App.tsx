import { useLocation, useRoutes } from "react-router-dom";
import { Toaster } from "sonner";
import { routes } from "./routes/routes";
import { useThemeStore } from "./store/themeStore";
import { useEffect } from "react";
import { initGA, logPageView } from "./hooks/Dashboard/analitica";


function Routes() {
  const routing = useRoutes(routes);
  return <>{routing}</>;
}

export default function App() {
  const { theme } = useThemeStore();
  const location = useLocation();

  useEffect(() => {
    initGA(); // Se inicializa GA4 una sola vez
  }, []);

  useEffect(() => {
    logPageView(location.pathname); // 👈 registra cada cambio de ruta
  }, [location]);


  const toastOptions = {
    style: {
      backgroundColor: theme === "dark" ? "#334155" : "#023d65",
      color: theme === "dark" ? "#f0f0f0" : "#f0f0f0",
      border: theme === "dark" ? "1px solid #ddd" : "1px solid #023d65",
    },
    success: {
      icon: "✅",
    },
    error: {
      icon: "❌",
    },
    duration: 3000,
  };

  return (
    <>
      <Routes />
      <Toaster
        position="bottom-right"
        toastOptions={toastOptions}
        richColors
        visibleToasts={3}
        swipeDirections={["right", "left"]}
      />
    </>
  );
}
