import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../../button";
import styles from "./index.module.css";

export const AuthElement = () => {
    const { data: session, status } = useSession();

    return (
        <div className={styles.root}>
            {status === "authenticated" && (
                <span className={styles.greeting}>Hello, {session.user?.name}</span>
            )}
            <nav className={styles.nav}>
                {status === "authenticated" ? (
                    <>
                        <Button variant="outline">
                            <Link href={`/wishlist/${session.user?.fdlst_private_userId}`}>
                                Your Wish List
                            </Link>
                        </Button>
                        <Button variant="blue" clickHandler={() => signOut()}>
                            Sign Out
                        </Button>
                    </>
                ) : (
                    <Button variant="blue" clickHandler={() => signIn()}>
                        Sign In
                    </Button>
                )}
            </nav>
        </div>
    );
};