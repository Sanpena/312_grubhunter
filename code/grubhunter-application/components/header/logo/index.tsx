import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/assets/logo.svg";
import styles from "./index.module.css";

export const Logo = () => {
    return (
        <Link href="/">
            <div className={styles.root}>
                <Image src={logo} alt="GrubHunter Logo" fill priority />
            </div>
        </Link>
    );
};