import { useEffect, useState } from "react";
import { toast } from "sonner";
import { enviarMensaje } from "../../services/mensajes";
import { useUser } from "@clerk/clerk-react";

export function useMensaje() {
    const [comentario, setComentario] = useState({
        name: '',
        email: '',
        message: '',
    });

    const { user } = useUser();


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
        const toastId = toast.loading('Enviando mensaje...');
        const form = e.target as HTMLFormElement;
        const { name, email, message } = comentario;


        if (!name || !email || !message) {
            toast.error('Por favor rellena todos los campos', { id: toastId });
            return;
        }

        const { success, message: mensajePeticion } = await enviarMensaje(name, email, message);

        if (success) {
            toast.success(mensajePeticion, { id: toastId });
            setComentario(prev => ({ ...prev, mensaje: '' })); // solo reset mensaje
            form.reset();
        } else {
            toast.error(message, { id: toastId });
        }
    };

    const datosMensaje = { name: user?.fullName ?? '', email: user?.emailAddresses?.[0]?.emailAddress ?? '' };


    return {
        comentario,
        handleChange,
        handleSubmit,
        camposBloqueados,
        datosMensaje
    }
}