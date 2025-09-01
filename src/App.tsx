import { useRoutes, BrowserRouter } from "react-router-dom";
import { routes } from "./routes/routes";
import { Toaster } from "sonner";
import { useThemeStore } from "./store/themeStore";
import { useEffect } from "react";
import { useCartStore } from "./store/cartStore";

function Routes() {
  const routing = useRoutes(routes);
  return <>{routing}</>;
}

export default function App() {
  const { theme } = useThemeStore();
  const { fetchProductos } = useCartStore();


  useEffect(() => {
    fetchProductos();
  }, []);

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
    <BrowserRouter>
      <Routes />
      <Toaster
        position="bottom-right"
        toastOptions={toastOptions}
        richColors
        visibleToasts={3}
        swipeDirections={["right", "left"]}
      />
    </BrowserRouter>
  );
}
