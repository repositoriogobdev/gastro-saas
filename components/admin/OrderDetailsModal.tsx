

import React, { useMemo } from 'react';
import type { Order } from '../../types';
import { XIcon, UserIcon, LocationMarkerIcon, RouteIcon, ClipboardListIcon, CreditCardIcon, PixIcon, SmilingCartIcon } from '../Icons';

interface OrderDetailsModalProps {
    order: Order;
    onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose }) => {
    // Simulate distance calculation
    const simulatedDistance = useMemo(() => (Math.random() * 14 + 1).toFixed(1), [order.id]);

    const InfoSection: React.FC<{ title: string, icon: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
        <div>
            <div className="flex items-center gap-3 mb-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary dark:bg-primary-dark flex items-center justify-center text-accent">
                    {icon}
                </div>
                <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">{title}</h3>
            </div>
            <div className="pl-11 text-text-secondary dark:text-text-secondary-dark space-y-1">
                {children}
            </div>
        </div>
    );

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-secondary dark:bg-secondary-dark rounded-xl shadow-2xl w-full max-w-2xl relative animate-fade-in-up border border-border dark:border-border-dark"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 border-b border-border dark:border-border-dark flex justify-between items-center">
                    <h2 className="text-xl font-bold text-text-primary dark:text-text-primary-dark">Detalhes do Pedido #{order.id.substring(0, 8)}</h2>
                    <button 
                        onClick={onClose} 
                        className="p-1 text-text-secondary dark:text-text-secondary-dark hover:text-accent dark:hover:text-accent transition-colors z-10"
                    >
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <InfoSection title="Cliente" icon={<UserIcon className="h-5 w-5"/>}>
                                <p className="font-medium text-text-primary dark:text-text-primary-dark">{order.customer.name}</p>
                            </InfoSection>

                             <InfoSection title="Entrega" icon={<LocationMarkerIcon className="h-5 w-5"/>}>
                                <p>{order.customer.address}</p>
                                <div className="flex items-center gap-2 pt-1">
                                    <RouteIcon className="h-5 w-5 text-highlight"/>
                                    <p><span className="font-semibold">{simulatedDistance} km</span> (distância simulada)</p>
                                </div>
                            </InfoSection>
                             <InfoSection title="Pagamento" icon={order.customer.paymentMethod === 'PIX' ? <PixIcon className="h-5 w-5"/> : <CreditCardIcon className="h-5 w-5"/>}>
                                <p>{order.customer.paymentMethod || 'Não informado'}</p>
                                <p className="text-xl font-bold text-highlight">Total: R${order.total.toFixed(2).replace('.', ',')}</p>
                            </InfoSection>
                        </div>
                        <div className="rounded-lg p-2 min-h-[200px] flex items-center justify-center">
                             <SmilingCartIcon className="h-40 w-40 animate-gentle-bob text-text-primary dark:text-text-primary-dark" />
                        </div>
                    </div>

                    <InfoSection title="Itens do Pedido" icon={<ClipboardListIcon className="h-5 w-5"/>}>
                        <ul className="space-y-2 pt-2">
                            {order.items.map(item => (
                                <li key={item.id} className="flex justify-between items-center bg-primary dark:bg-primary-dark p-2 rounded-md">
                                    <div className="flex items-center gap-3">
                                        <img src={item.image_url} alt={item.name} className="w-10 h-10 rounded-md object-cover"/>
                                        <div>
                                            <p className="font-semibold text-text-primary dark:text-text-primary-dark">{item.quantity}x {item.name}</p>
                                            <p className="text-xs text-text-secondary dark:text-text-secondary-dark">R${item.price.toFixed(2).replace('.', ',')} / un.</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-highlight">R${(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                                </li>
                            ))}
                        </ul>
                    </InfoSection>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;