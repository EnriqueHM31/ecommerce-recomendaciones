import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const AuthCheck = () => {
    const { user } = useUser(); // Clerk user

    useEffect(() => {
        const crearUsuarioSiNoExiste = async () => {
            if (!user) return;

            try {
                await fetch(`${import.meta.env.VITE_API}/api/usuario/auth`, {
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
                }).then(res => res.json()).then(data => {
                    const { creado, mesage } = data;
                    if (creado) {
                        toast.success(mesage);
                    }
                })


            } catch (error) {
                console.error("Error al crear usuario en BD:", error);
            }
        };

        crearUsuarioSiNoExiste();
    }, [user]);

    return null; // Solo un hook de efecto, no renderiza nada
};
