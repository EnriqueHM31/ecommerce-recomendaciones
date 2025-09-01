import Layout from '../components/Layout';
import SectionHero from '../sections/Home/Hero';
import SectionMarcas from '../sections/Home/Marcas';
import SectionProductosRecomendados from '../sections/Home/ProductosRecomendados';

export default function Home() {

    return (
        <Layout>
            <div className="min-h-screen ns bg-theme-secondary text-theme-primary">
                <SectionHero />

                <SectionProductosRecomendados />

                <SectionMarcas />s
            </div>
        </Layout>
    );
}