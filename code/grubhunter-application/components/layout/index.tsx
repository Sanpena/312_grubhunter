import { Header } from "../header";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
        <Header />
            <main className="layout-grid">
                {children}
            </main>
        </>
    );
};