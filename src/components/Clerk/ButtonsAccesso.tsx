import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useUsuario } from '../../hooks/Usuarios/Usuario';
export default function ButtonsAccesso() {
    const { user } = useUsuario();
    return (
        <>
            {/* Auth */}
            <SignedOut >
                <SignInButton mode="modal">
                    <button
                        id="sign-in-button"
                        data-testid="sign-in-button"
                        className="border-2 border-theme-secondary text-theme-secondary py-2 px-4 rounded-full cursor-pointer transition-all duration-300 font-medium hover:bg-theme-secondary hover:text-theme-primary flex items-center gap-2"
                    >
                        Iniciar Sesión
                    </button>
                </SignInButton>
            </ SignedOut >

            {user && (
                <div
                    id="user-profile-wrapper"
                    data-testid="user-profile-wrapper"
                    className="size-10 flex items-center justify-center rounded-full border-2 border-white"
                >
                    <SignedIn>
                        <UserButton

                            data-testid="user-button"
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: 'size-10 rounded-full',
                                    userButtonBox:
                                        'rounded-full transition-all duration-300 hover:bg-theme-secondary hover:text-theme-primary cursor-pointer',
                                },
                            }}
                        />
                    </SignedIn>
                </div>
            )
            }

        </>
    )
}