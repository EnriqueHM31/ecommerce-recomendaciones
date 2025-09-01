import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import FormContacto from '../components/Contacto/FormContacto';
import ImagenAnimada from '../components/Contacto/ImagenAnimada';
import Layout from '../components/Layout';
import DatosEmpresa from '../sections/Contacto/DatosEmpresa';


export default function Contact() {

    const { user } = useUser();

    const [comentario, setComentario] = useState({
        name: '',
        email: '',
        message: '',
    });

    useEffect(() => {
        if (user) {
            setComentario({
                name: user.fullName ?? '',
                email: user.emailAddresses?.[0]?.emailAddress ?? '',
                message: '',
            });
        }
    }, [user]);
    // Determinar si los campos se deben bloquear
    const camposBloqueados = Boolean(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const nombre = e.target.name;
        const valor = e.target.value;
        setComentario(prev => ({ ...prev, [nombre]: valor }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const { name, email, message } = comentario;


        if (!name || !email || !message) {
            toast.error('Por favor rellena todos los campos');
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_API}/api/enviar-mensaje`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: name, correo: email, mensaje: message }),
        });

        if (response.ok) {
            toast.success('Mensaje enviado correctamente');
            setComentario(prev => ({ ...prev, mensaje: '' })); // solo reset mensaje
            form.reset();
        } else {
            toast.error('Error al enviar el mensaje');
        }
    };

    const datos = { name: user?.fullName ?? '', email: user?.emailAddresses?.[0]?.emailAddress ?? '' };


    return (
        <Layout>
            <section className="min-h-screen bg-theme-secondary text-theme-primary">

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Contact Form - Left Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 className="text-3xl font-bold text-theme-primary mb-8">
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
