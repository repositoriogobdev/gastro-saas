
import React, { useState, useMemo } from 'react';
import type { Order } from '../../types';
import { ChevronLeftIcon, ChevronRightIcon } from '../Icons';
import { supabase } from '../../services/supabaseClient';
import OrderDetailsModal from './OrderDetailsModal';

interface AdminOrdersProps {
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const AdminOrders: React.FC<AdminOrdersProps> = ({ orders, setOrders }) => {
    const [filterStatus, setFilterStatus] = useState<'all' | Order['status']>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const filteredOrders = useMemo(() => {
        return orders
            .filter(order => filterStatus === 'all' || order.status === filterStatus)
            .filter(order => order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [orders, filterStatus, searchTerm]);

    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredOrders, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
        // Optimistic update
        const originalOrders = [...orders];
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );

        const { error } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', orderId);

        if (error) {
            console.error('Error updating status:', error);
            alert('Não foi possível atualizar o status do pedido.');
            // Revert on error
            setOrders(originalOrders);
        }
    };

    const getStatusClass = (status: Order['status']) => {
        switch (status) {
            case 'Pendente': return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300';
            case 'Em Preparo': return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300';
            case 'Entregue': return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300';
            default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">Pedidos Recebidos</h2>
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                    <input 
                        type="text"
                        placeholder="Buscar por cliente..."
                        value={searchTerm}
                        onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="px-4 py-2 bg-secondary dark:bg-secondary-dark border border-border dark:border-border-dark rounded-lg focus:ring-accent focus:border-accent"
                    />
                    <select
                        value={filterStatus}
                        onChange={e => { setFilterStatus(e.target.value as any); setCurrentPage(1); }}
                        className="px-4 py-2 bg-secondary dark:bg-secondary-dark border border-border dark:border-border-dark rounded-lg focus:ring-accent focus:border-accent"
                    >
                        <option value="all">Todos os Status</option>
                        <option value="Pendente">Pendente</option>
                        <option value="Em Preparo">Em Preparo</option>
                        <option value="Entregue">Entregue</option>
                    </select>
                </div>
            </div>
            <div className="bg-secondary dark:bg-secondary-dark rounded-xl border border-border dark:border-border-dark overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-primary dark:bg-primary-dark">
                            <tr>
                                <th className="p-4 font-semibold">Cliente</th>
                                <th className="p-4 font-semibold hidden lg:table-cell">Itens</th>
                                <th className="p-4 font-semibold">Total</th>
                                <th className="p-4 font-semibold hidden md:table-cell">Data</th>
                                <th className="p-4 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center p-8 text-text-secondary dark:text-text-secondary-dark">Nenhum pedido encontrado.</td>
                                </tr>
                            ) : (
                                paginatedOrders.map(order => (
                                    <tr 
                                        key={order.id} 
                                        onClick={() => setSelectedOrder(order)}
                                        className="border-t border-border dark:border-border-dark hover:bg-primary dark:hover:bg-primary-dark cursor-pointer transition-colors"
                                    >
                                        <td className="p-4">
                                            <div className="font-semibold">{order.customer.name}</div>
                                            <div className="text-sm text-text-secondary dark:text-text-secondary-dark">{order.customer.address}</div>
                                        </td>
                                        <td className="p-4 text-sm text-text-secondary dark:text-text-secondary-dark hidden lg:table-cell max-w-xs truncate">
                                            {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                                        </td>
                                        <td className="p-4 font-semibold text-highlight">R${order.total.toFixed(2).replace('.', ',')}</td>
                                        <td className="p-4 text-text-secondary dark:text-text-secondary-dark hidden md:table-cell">{new Date(order.created_at).toLocaleString('pt-BR')}</td>
                                        <td className="p-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                                                onClick={(e) => e.stopPropagation()}
                                                className={`w-full md:w-auto px-2 py-1 text-sm font-semibold rounded-full border-transparent focus:ring-accent focus:border-accent ${getStatusClass(order.status)}`}
                                            >
                                                <option value="Pendente">Pendente</option>
                                                <option value="Em Preparo">Em Preparo</option>
                                                <option value="Entregue">Entregue</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
             <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-text-secondary dark:text-text-secondary-dark">
                 <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <span>Itens por página:</span>
                    <select
                        value={itemsPerPage}
                        onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                        className="p-1 bg-secondary dark:bg-secondary-dark border border-border dark:border-border-dark rounded-md"
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                     <span className="ml-4">
                        Página {currentPage} de {totalPages} ({filteredOrders.length} pedidos)
                    </span>
                 </div>
                 <div className="flex items-center gap-2">
                     <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-md hover:bg-border dark:hover:bg-border-dark disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        <ChevronLeftIcon className="h-5 w-5" />
                     </button>
                     <span>Página {currentPage}</span>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-md hover:bg-border dark:hover:bg-border-dark disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        <ChevronRightIcon className="h-5 w-5" />
                     </button>
                 </div>
             </div>
             {selectedOrder && (
                <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
             )}
        </div>
    );
};

export default AdminOrders;
