"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const AuthButtons = () => {
    const { data: session } = useSession();

    return (
        <div>
            {session ? (
                <>
                    <p>Merhaba, {session.user?.name}!</p>
                    <button onClick={() => signOut()}>Çıkış Yap</button>
                </>
            ) : (
                <button onClick={() => signIn()}>Giriş Yap</button>
            )}
        </div>
    );
};

export default AuthButtons;
