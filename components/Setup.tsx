
import React, { useState } from 'react';
import { HamburgerIcon } from './Icons';

const Setup: React.FC = () => {
    const [url, setUrl] = useState('');
    const [anonKey, setAnonKey] = useState('');
    const [error, setError] = useState('');

    const handleSave = () => {
        if (!url || !anonKey) {
            setError('Ambos os campos são obrigatórios.');
            return;
        }
        if (!url.startsWith('https') || !url.includes('supabase.co')) {
            setError('A URL do Supabase parece inválida. Deve começar com https:// e terminar com supabase.co.');
            return;
        }

        setError('');
        localStorage.setItem('supabaseUrl', url);
        localStorage.setItem('supabaseAnonKey', anonKey);
        window.location.reload();
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-primary dark:bg-primary-dark">
            <div className="w-full max-w-lg p-8 space-y-6 bg-secondary dark:bg-secondary-dark rounded-xl shadow-2xl border border-border dark:border-border-dark">
                <div className="text-center">
                    <h1 className="text-3xl font-logo tracking-wider flex items-center justify-center gap-3">
                        <HamburgerIcon className="h-9 w-9" />
                        <span className="text-text-primary dark:text-text-primary-dark">gastrô<span className="text-accent">.</span></span>
                    </h1>
                    <h2 className="mt-4 text-xl font-bold text-text-primary dark:text-text-primary-dark">Configuração Inicial do Banco de Dados</h2>
                    <p className="mt-2 text-text-secondary dark:text-text-secondary-dark">
                        Para começar, por favor, insira as credenciais do seu projeto Supabase.
                    </p>
                </div>
                
                <div className="mt-4 p-4 bg-primary dark:bg-primary-dark border border-border dark:border-border-dark rounded-lg text-sm text-text-secondary dark:text-text-secondary-dark">
                    <p className="font-semibold">Onde encontrar suas credenciais:</p>
                    <ol className="list-decimal list-inside mt-1 space-y-1">
                        <li>Acesse seu painel do Supabase: <a href="https://app.supabase.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">app.supabase.com</a></li>
                        <li>Vá em <span className="font-mono bg-border dark:bg-border-dark px-1 py-0.5 rounded">Project Settings &gt; API</span>.</li>
                        <li>Copie a <span className="font-bold">Project URL</span> e a chave <span className="font-bold">anon (public)</span>.</li>
                    </ol>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="supabase-url" className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
                            Project URL
                        </label>
                        <input
                            id="supabase-url"
                            type="text"
                            required
                            className="mt-1 appearance-none relative block w-full px-3 py-2 border border-border dark:border-border-dark bg-primary dark:bg-primary-dark placeholder-text-secondary dark:placeholder-text-secondary-dark text-text-primary dark:text-text-primary-dark rounded-md focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                            placeholder="https://exemplo.supabase.co"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="supabase-key" className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
                            Project API Key (anon public)
                        </label>
                        <input
                            id="supabase-key"
                            type="text"
                            required
                            className="mt-1 appearance-none relative block w-full px-3 py-2 border border-border dark:border-border-dark bg-primary dark:bg-primary-dark placeholder-text-secondary dark:placeholder-text-secondary-dark text-text-primary dark:text-text-primary-dark rounded-md focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                            placeholder="eyJhbGciOiJIUzI1NiIsIn..."
                            value={anonKey}
                            onChange={(e) => setAnonKey(e.target.value)}
                        />
                    </div>
                </div>

                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                <div>
                    <button
                        onClick={handleSave}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-highlight"
                    >
                        Salvar e Continuar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Setup;
