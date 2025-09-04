// src/routes/routes.tsx
import { type RouteObject } from "react-router-dom";

// Importa tus páginas
import Home from "../pages/Home";
import Products from "../pages/Products";
import Contact from "../pages/Contact";
import ProductDetail from "../pages/ProductDetail";
import PaymentSuccess from "../pages/Success";
import PaymentCancel from "../pages/Cancel";
import NotFound from "../pages/404";
import Compras from "../pages/Compras";

export const routes: RouteObject[] = [
    { path: "/", element: <Home /> },
    { path: "/products", element: <Products /> },
    { path: "/products/:id", element: <ProductDetail /> },
    { path: "/contact", element: <Contact /> },
    { path: "/success", element: <PaymentSuccess /> },
    { path: "/cancel", element: <PaymentCancel /> },
    { path: "*", element: <NotFound /> },
    { path: "/compras", element: <Compras /> },
    /* { path: "/cart", element: <Cart /> },
     { path: "/checkout", element: <Checkout /> },
     { path: "/login", element: <Login /> },
     { path: "/register", element: <Register /> },
     { path: "/admin", element: <Dashboard /> },
     { path: "*", element: <NotFound /> },*/
];
