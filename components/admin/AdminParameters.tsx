import React, { useState, useEffect } from 'react';
import type { PaymentGateway } from '../../types';
import { StripeLogo, MercadoPagoLogo, PagSeguroLogo } from '../Icons';

type GatewayId = 'stripe' | 'mercado-pago' | 'pagseguro';

const initialGateways: Record<GatewayId, PaymentGateway> = {
    stripe: { id: 'stripe', name: 'Stripe', publicKey: '', secretKey: '' },
    'mercado-pago': { id: 'mercado-pago', name: 'Mercado Pago', publicKey: '', secretKey: '' },
    pagseguro: { id: 'pagseguro', name: 'PagSeguro', publicKey: '', secretKey: '' },
};

const GatewayCard: React.FC<{
    gateway: PaymentGateway,
    onSave: (gateway: PaymentGateway) => void,
    logo: React.ReactNode
}> = ({ gateway, onSave, logo }) => {
    const [publicKey, setPublicKey] = useState(gateway.publicKey);
    const [secretKey, setSecretKey] = useState(gateway.secretKey);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        setIsConnected(gateway.publicKey !== '' && gateway.secretKey !== '');
    }, [gateway]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...gateway, publicKey, secretKey });
    };

    return (
        <div className="bg-secondary dark:bg-secondary-dark rounded-xl border border-border dark:border-border-dark overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b border-border dark:border-border-dark">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-16 flex items-center justify-center">{logo}</div>
                    <h3 className="text-lg font-bold">{gateway.name}</h3>
                </div>
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${isConnected ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'}`}>
                    {isConnected ? 'Conectado' : 'Não Configurado'}
                </span>
            </div>
            <form onSubmit={handleSave} className="p-4 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark">Chave Pública</label>
                    <input 
                        type="text" 
                        value={publicKey}
                        onChange={(e) => setPublicKey(e.target.value)}
                        placeholder="pk_live_..."
                        className="mt-1 w-full bg-primary dark:bg-primary-dark border-border dark:border-border-dark rounded-md shadow-sm focus:ring-accent focus:border-accent" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark">Chave Secreta</label>
                    <input 
                        type="password" 
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                        placeholder="••••••••••••••••"
                        className="mt-1 w-full bg-primary dark:bg-primary-dark border-border dark:border-border-dark rounded-md shadow-sm focus:ring-accent focus:border-accent" 
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-highlight transition-colors">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
};

const AdminParameters: React.FC = () => {
    const [gateways, setGateways] = useState<Record<GatewayId, PaymentGateway>>(initialGateways);

    useEffect(() => {
        try {
            const savedGateways = localStorage.getItem('payment-gateways');
            if (savedGateways) {
                const parsed = JSON.parse(savedGateways);
                // Merge with initial config to ensure all gateways are present
                setGateways(prev => ({...prev, ...parsed}));
            }
        } catch (error) {
            console.error("Failed to parse payment gateways from localStorage", error);
        }
    }, []);

    const handleSaveGateway = (updatedGateway: PaymentGateway) => {
        const newGateways = { ...gateways, [updatedGateway.id]: updatedGateway };
        setGateways(newGateways);
        localStorage.setItem('payment-gateways', JSON.stringify(newGateways));
        alert(`${updatedGateway.name} API salva com sucesso!`);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">Parâmetros de Integração</h2>
            <div className="space-y-8">
                <GatewayCard 
                    gateway={gateways.stripe}
                    onSave={handleSaveGateway}
                    logo={<StripeLogo className="h-6" />}
                />
                <GatewayCard 
                    gateway={gateways['mercado-pago']}
                    onSave={handleSaveGateway}
                    logo={<MercadoPagoLogo className="h-10" />}
                />
                <GatewayCard 
                    gateway={gateways.pagseguro}
                    onSave={handleSaveGateway}
                    logo={<PagSeguroLogo className="h-6" />}
                />
            </div>
        </div>
    );
};

export default AdminParameters;