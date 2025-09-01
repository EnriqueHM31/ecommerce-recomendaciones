export async function enviarMensaje(nombre: string, correo: string, mensaje: string) {

    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/enviar-mensaje`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: nombre, correo: correo, mensaje: mensaje }),
        });
        if (!response.ok) {
            throw new Error('Error al enviar el mensaje');
        }
        return { success: true, message: 'Mensaje enviado correctamente' };
    }
    catch (error) {
        console.error('Error al enviar el mensaje:', error);
        return { success: false, message: error as string };
    }

}