import { motion } from 'framer-motion';
import FormContacto from '../components/Contacto/FormContacto';
import ImagenAnimada from '../components/Contacto/ImagenAnimada';
import Layout from '../components/Landing/Layout';
import { useMensaje } from '../hooks/Contacto/mensaje';
import DatosEmpresa from '../components/Contacto/DatosEmpresa';


export default function Contact() {

    const { handleChange, handleSubmit, camposBloqueados, datosMensaje: datos } = useMensaje();

    return (
        <Layout>
            <section className="min-h-screen bg-theme-secondary text-theme-primary">

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Contact Form - Left Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 className="text-xl md:text-3xl font-bold text-theme-primary mb-8">
                                Envíanos un Mensaje
                            </h2>

                            <FormContacto
                                handleSubmit={handleSubmit}
                                datos={datos}
                                camposBloqueados={camposBloqueados} handleChange={handleChange} />

                            {/* Contact Info */}
                            <DatosEmpresa />
                        </motion.div>

                        {/* Technology Image - Right Side */}
                        <ImagenAnimada />
                    </div>
                </div>
            </section>
        </Layout>
    );
}
