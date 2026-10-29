import { SignInForm } from "@/components/SignInForm";
import { Footer } from "@/components/ui/Footer";
import { Logo } from "@/components/ui/Logo";

export const LoginPage = () => {
    return (
        <div className="user-page">
            <header className="page-header user-page__head">
                <Logo />
                <h1 className="page-title user-page__title">Вход</h1>
            </header>
            <SignInForm />
            <Footer />
        </div>
    );
};