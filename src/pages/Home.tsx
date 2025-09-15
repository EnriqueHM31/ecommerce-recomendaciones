import Layout from '../components/Landing/Layout';
import SectionHero from '../components/Home/Hero';
import SectionMarcas from '../components/Home/Marcas';
import SectionProductosRecomendados from '../components/Home/ProductosRecomendados';

export default function Home() {

    return (
        <Layout>
            <div className="min-h-screen ns bg-theme-secondary text-theme-primary">
                <SectionHero />

                <SectionProductosRecomendados />

                <SectionMarcas />
            </div>
        </Layout>
    );
}