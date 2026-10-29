import { useGetUserQuery, useLoginMutation } from "@/api/authApi";
import { AppRoute } from "@/consts";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const SignInForm = () => {
    const navigate = useNavigate();

    const [login, { isLoading, isError }] = useLoginMutation();
    const { data: user } = useGetUserQuery();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            navigate(AppRoute.Root, { replace: true });
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || password.length < 6) return;

        try {
            await login({ email, password }).unwrap();
        } catch (err) {
            console.error('Ошибка авторизации:', err);
        }
    };

    return (
        <div className="sign-in user-page__content">
            <form className="sign-in__form" onSubmit={handleSubmit}>
                {isError && (
                    <div className="sign-in__message" style={{ color: '#ff6b6b', marginBottom: '15px', fontSize: '14px', textAlign: 'center' }}>
                        <p>Не удалось войти. Пожалуйста, проверьте введённые данные.</p>
                    </div>
                )}

                <div className="sign-in__fields">
                    <div className="sign-in__field">
                        <input
                            className="sign-in__input"
                            type="email"
                            placeholder="Почта"
                            name="user-email"
                            id="user-email"
                            required
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <label className="sign-in__label visually-hidden" htmlFor="user-email">Почта</label>
                    </div>
                    <div className="sign-in__field">
                        <input
                            className="sign-in__input"
                            type="password"
                            placeholder="Пароль"
                            name="user-password"
                            id="user-password"
                            required
                            minLength={6}
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                        <label className="sign-in__label visually-hidden" htmlFor="user-password">Пароль</label>
                    </div>
                </div>
                <div className="sign-in__submit">
                    <button
                        className="sign-in__btn"
                        type="submit"
                        disabled={isLoading}                    >
                        {isLoading ? 'Проверка...' : 'Войти'}
                    </button>
                </div>
            </form>
        </div>
    );
};