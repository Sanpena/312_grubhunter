import { Logo } from "./logo";
import styles from "./index.module.css";

export const Header = () => {
    return (
        <header className={styles.root}>
            <div className="layout-grid">
                <Logo />
            </div>
        </header>
    );
};