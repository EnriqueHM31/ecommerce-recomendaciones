import { useNavigate } from "react-router-dom";

export function useNavegacion() {
    const navigate = useNavigate();

    const handleRegresarAnteriorExacto = () => {
        navigate(-1);
    }

    return {
        navigate,
        handleRegresarAnteriorExacto
    }
}