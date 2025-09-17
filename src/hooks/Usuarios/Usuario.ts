import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import type { UserResource } from "@clerk/types";

export function useUsuario() {
    const { user: usuario, isLoaded } = useUser();
    const [user, setUser] = useState<UserResource | null>(null);

    useEffect(() => {
        if (isLoaded && usuario) {
            setUser(usuario);
        }
    }, [isLoaded, usuario]);

    return { user, isLoaded };
}
