import React, { ReactNode } from "react";
import styles from "./index.module.css";

interface ButtonProps {
    disabled?: boolean;
    children: ReactNode;
    variant?: "blue" | "outline";
    clickHandler?: () => void;
}

export const Button = ({ disabled, children, variant, clickHandler }: ButtonProps) => {
    const renderContent = (children: ReactNode) => {
        if (disabled) {
            return <span>{children}</span>;
        }
        return <span onClick={clickHandler}>{children}</span>;
    };

    return (
        <div
        className={`${styles.root} ${variant ? styles[variant] : ""} ${disabled ? styles.disabled : ""}`}
        >
        {renderContent(children)}
        </div>
    );
};