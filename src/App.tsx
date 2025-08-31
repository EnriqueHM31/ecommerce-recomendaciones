import { useRoutes, BrowserRouter } from "react-router-dom";
import { routes } from "./routes/routes";

function Routes() {
  const routing = useRoutes(routes); // esto genera los <Routes> automáticamente
  return <>{routing}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}
