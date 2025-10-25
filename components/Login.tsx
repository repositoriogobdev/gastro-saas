
import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { HamburgerIcon } from './Icons';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!supabase) {
            setError('Erro de Configuração: Credenciais do Supabase não encontradas. Verifique o arquivo services/supabaseClient.ts.');
            setLoading(false);
            return;
        }
        
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError('Email ou senha inválidos.');
        }
        // onAuthStateChange in App.tsx will handle the successful login
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-primary dark:bg-primary-dark">
            <div className="w-full max-w-md p-8 space-y-8 bg-secondary dark:bg-secondary-dark rounded-xl shadow-2xl border border-border dark:border-border-dark">
                <div className="text-center">
                     <h1 className="text-3xl md:text-4xl font-logo tracking-wider flex items-center justify-center gap-3">
                        <HamburgerIcon className="h-9 w-9 md:h-10 md:w-10"/>
                        <span className="text-text-primary dark:text-text-primary-dark">gastrô<span className="text-accent">.</span></span>
                    </h1>
                    <p className="mt-2 text-text-secondary dark:text-text-secondary-dark">Acesse o painel de administração</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border dark:border-border-dark bg-primary dark:bg-primary-dark placeholder-text-secondary dark:placeholder-text-secondary-dark text-text-primary dark:text-text-primary-dark rounded-t-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                                placeholder="Endereço de email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Senha</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border dark:border-border-dark bg-primary dark:bg-primary-dark placeholder-text-secondary dark:placeholder-text-secondary-dark text-text-primary dark:text-text-primary-dark rounded-b-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-highlight disabled:bg-border dark:disabled:bg-border-dark"
                        >
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;