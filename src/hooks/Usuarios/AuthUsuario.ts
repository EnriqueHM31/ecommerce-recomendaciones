import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const AuthCheck = () => {
    const { user } = useUser();

    useEffect(() => {
        const crearUsuarioSiNoExiste = async () => {
            if (!user) return; // todavía no cargó el user de Clerk

            try {
                const res = await fetch(`${import.meta.env.VITE_API}/api/usuario/auth`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        usuario_id: user.id,
                        nombre: user.firstName,
                        correo: user.emailAddresses[0].emailAddress,
                        avatar: user.imageUrl
                    })
                });

                const data = await res.json();
                const { creado, message } = data;

                if (creado) {
                    toast.success(message || "Usuario creado");
                }
            } catch (error) {
                console.error("Error al crear usuario en BD:", error);
            }
        };

        crearUsuarioSiNoExiste();
    }, [user]); // 👈 importante: depende de user

    return null;
};
