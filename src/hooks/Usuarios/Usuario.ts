import { useUser } from "@clerk/clerk-react";

export function useUsuario() {
    const { user } = useUser();

    return user;

}

