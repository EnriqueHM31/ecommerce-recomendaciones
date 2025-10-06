import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import CategoriasAdmin from '../components/Dashboard/CategoriasAdmin';
import DashboardLayout from '../components/Dashboard/Layout';
import DashboardOverview from '../components/Dashboard/Overview';
import PedidosAdmin from '../components/Dashboard/PedidosAdmin';
import ProductosAdmin from '../components/Dashboard/ProductosAdmin';
import VentasAdmin from '../components/Dashboard/VentasAdmin';
import { useCartStore } from '../store/cartStore';
import { useComprasStore } from '../store/comprasStore';
import { useCategoriasStore } from '../store/categoriasStore';
import Loading from '@/components/Compras/Loading';

type DashboardSection = 'overview' | 'productos' | 'categorias' | 'pedidos' | 'ventas';

const Dashboard = () => {
    const { user, isLoaded } = useUser();

    // ✅ leemos desde localStorage al inicio
    const [activeSection, setActiveSection] = useState<DashboardSection>(
        () => (localStorage.getItem("activeSection") as DashboardSection) || 'overview'
    );

    const { fetchTodosPedidos } = useComprasStore();
    const { fetchProductos, fetchProductosTop } = useCartStore();
    const { fetchCategorias } = useCategoriasStore();

    useEffect(() => {
        fetchTodosPedidos();
        fetchProductos();
        fetchProductosTop();
        fetchCategorias();
    }, [user]);

    // ✅ guardamos cada vez que cambie activeSection
    useEffect(() => {
        localStorage.setItem("activeSection", activeSection);
    }, [activeSection]);

    // Mostrar loading mientras se carga Clerk
    if (!isLoaded) {
        return (
            <Loading text='Cargando el dashboard...' />
        );
    }

    // Redirigir si no está autenticado
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Verificar si es administrador (puedes ajustar esta lógica según tus necesidades)
    const isAdmin = user.publicMetadata?.role === 'admin';

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-theme-secondary flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🚫</div>
                    <h1 className="text-2xl font-bold text-theme-primary mb-2">Acceso Denegado</h1>
                    <p className="text-theme-primary">No tienes permisos para acceder al dashboard administrativo.</p>
                </div>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return <DashboardOverview />;
            case 'productos':
                return <ProductosAdmin />;
            case 'categorias':
                return <CategoriasAdmin />;
            case 'pedidos':
                return <PedidosAdmin />;
            case 'ventas':
                return <VentasAdmin />;
            default:
                return <DashboardOverview />;
        }
    };

    return (
        <DashboardLayout
            activeSection={activeSection}
            onSectionChange={(section) => setActiveSection(section as DashboardSection)}
            user={user!}
        >
            <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
            >
                {renderContent()}
            </motion.div>
        </DashboardLayout>
    );
};

export default Dashboard;
