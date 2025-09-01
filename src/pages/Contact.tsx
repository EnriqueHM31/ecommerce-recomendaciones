import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaComments, FaPaperPlane, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Layout from '../components/Layout';
import { toast } from 'sonner';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';


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
        } else {
            toast.error('Error al enviar el mensaje');
        }
    };



    return (
        <Layout>
            <div className="min-h-screen bg-theme-secondary text-theme-primary">

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

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <label htmlFor="name" className="block text-theme-primary font-medium mb-2">
                                        Nombre Completo
                                    </label>
                                    <div className="relative">
                                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-primary text-lg" />
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={user?.fullName ?? ''}
                                            className={`w-full pl-12 pr-4 py-3 border-2 border-theme rounded-xl bg-theme-secondary  text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent focus:border-transparent transition-all duration-300 `}
                                            placeholder="Tu nombre completo"
                                            onChange={handleChange}
                                            disabled={camposBloqueados}
                                            autoComplete='on'
                                        />
                                    </div>
                                </motion.div>

                                {/* Email Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <label htmlFor="email" className="block text-theme-primary font-medium mb-2">
                                        Correo Electrónico
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-primary text-lg" />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={user?.emailAddresses?.[0]?.emailAddress ?? ''}
                                            className={`w-full pl-12 pr-4 py-3 border-2 border-theme rounded-xl bg-theme-secondary  text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent focus:border-transparent transition-all duration-300 `}
                                            placeholder="tu@email.com"
                                            onChange={handleChange}
                                            disabled={camposBloqueados}
                                            autoComplete='on'
                                        />
                                    </div>
                                </motion.div>

                                {/* Message Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    <label htmlFor="message" className="block text-theme-primary font-medium mb-2">
                                        Mensaje
                                    </label>
                                    <div className="relative">
                                        <FaComments className="absolute left-3 top-3 text-theme-primary text-lg" />
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            className="w-full pl-12 pr-4 py-3 border-2 border-theme rounded-xl bg-theme-secondary text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent focus:border-transparent transition-all duration-300 resize-none"
                                            placeholder="Escribe tu mensaje aquí..."
                                            onChange={handleChange}
                                            autoComplete='on'
                                        />
                                    </div>
                                </motion.div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                    className="w-full bg-theme-accent text-theme-secondary py-4 px-8 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-theme-accent-light transition-colors duration-300 shadow-theme hover:shadow-theme-dark"
                                >
                                    <FaPaperPlane />
                                    Enviar Mensaje
                                </motion.button>
                            </form>

                            {/* Contact Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.7 }}
                                className="mt-12 space-y-4"
                            >
                                <h3 className="text-xl font-semibold text-theme-primary mb-4">
                                    Información de Contacto
                                </h3>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-theme-secondary">
                                        <FaPhone className="text-theme-primary text-lg" />
                                        <span className="text-theme-primary">+1 (555) 123-4567</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-theme-secondary">
                                        <FaEnvelope className="text-theme-primary text-lg" />
                                        <span className="text-theme-primary">storetecbpl@gmail.com</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-theme-secondary">
                                        <FaMapMarkerAlt className="text-theme-primary text-lg" />
                                        <span className="text-theme-primary">123 Tech Calle, Digital Ciudad, DC 12345</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Technology Image - Right Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="flex justify-center items-center"
                        >
                            <div className="relative">
                                {/* Main Technology Circle */}
                                <motion.div
                                    animate={{
                                        y: [0, -20, 0],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="w-80 h-80 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-650 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden"
                                >
                                    {/* Floating Tech Elements */}
                                    <motion.div
                                        animate={{
                                            x: [0, 30, 0],
                                            y: [0, -30, 0],
                                            rotate: [0, 360]
                                        }}
                                        transition={{
                                            duration: 12,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        className="absolute top-8 left-8 w-16 h-16 bg-theme-primary rounded-full flex items-center justify-center text-2xl text-theme-primary shadow-lg"
                                    >
                                        💻
                                    </motion.div>

                                    <motion.div
                                        animate={{
                                            x: [0, -25, 0],
                                            y: [0, 25, 0],
                                            rotate: [0, -360]
                                        }}
                                        transition={{
                                            duration: 10,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        className="absolute top-16 right-12 w-12 h-12 bg-theme-accent rounded-full flex items-center justify-center text-xl text-theme-secondary shadow-lg"
                                    >
                                        📱
                                    </motion.div>

                                    <motion.div
                                        animate={{
                                            x: [0, 20, 0],
                                            y: [0, 20, 0],
                                            rotate: [0, 180, 360]
                                        }}
                                        transition={{
                                            duration: 15,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        className="absolute bottom-20 left-16 w-14 h-14 bg-theme-secondary rounded-full flex items-center justify-center text-xl text-theme-primary shadow-lg"
                                    >
                                        🎧
                                    </motion.div>

                                    <motion.div
                                        animate={{
                                            x: [0, -15, 0],
                                            y: [0, -15, 0],
                                            rotate: [0, -180, -360]
                                        }}
                                        transition={{
                                            duration: 18,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        className="absolute bottom-12 right-20 w-10 h-10 bg-theme-accent rounded-full flex items-center justify-center text-lg text-theme-secondary shadow-lg"
                                    >
                                        ⌚
                                    </motion.div>

                                    {/* Central Icon */}
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 10, -10, 0]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="text-6xl text-theme-secondary z-10"
                                    >
                                        🚀
                                    </motion.div>
                                </motion.div>

                                {/* Decorative Elements */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute -top-4 -right-4 w-24 h-24 bg-theme-accent rounded-full opacity-20"
                                />
                                <motion.div
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.3, 0.8, 0.3]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute -bottom-6 -left-6 w-32 h-32 bg-theme-primary rounded-full opacity-20"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
