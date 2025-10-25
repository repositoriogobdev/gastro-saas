

import React, { useState, useEffect, useRef } from 'react';
import type { Order, MenuItem } from '../../types';
import { supabase } from '../../services/supabaseClient';
import { HamburgerIcon, ExternalLinkIcon, ChartBarIcon, ClipboardListIcon, CollectionIcon, BellIcon, SunIcon, MoonIcon, AdjustmentsIcon, LinkIcon, LogoutIcon } from '../Icons';
import AdminDashboard from './AdminDashboard';
import AdminMenu from './AdminMenu';
import AdminOrders from './AdminOrders';
import AdminSettings from './AdminSettings';
import AdminParameters from './AdminParameters';

type AdminView = 'dashboard' | 'menu' | 'orders' | 'settings' | 'parameters';

interface AdminLayoutProps {
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
    menu: MenuItem[];
    setMenu: React.Dispatch<React.SetStateAction<MenuItem[]>>;
    onSwitchToFrontend: () => void;
    theme: 'light' | 'dark';
    setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
    hasNewNotification: boolean;
    setHasNewNotification: React.Dispatch<React.SetStateAction<boolean>>;
    tenantId: string | null;
    userRole: 'Admin' | 'Funcionário' | null;
}

const NotificationPopup: React.FC<{ orders: Order[], onClose: () => void }> = ({ orders, onClose }) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div ref={popupRef} className="absolute top-14 right-8 w-80 bg-secondary dark:bg-secondary-dark rounded-lg shadow-2xl border border-border dark:border-border-dark z-50">
            <div className="p-3 border-b border-border dark:border-border-dark">
                <h4 className="font-semibold text-text-primary dark:text-text-primary-dark">Notificações</h4>
            </div>
            <div className="max-h-80 overflow-y-auto">
                {orders.length === 0 ? (
                    <p className="text-center text-text-secondary dark:text-text-secondary-dark py-6">Nenhuma notificação nova.</p>
                ) : (
                    orders.slice(0, 5).map(order => (
                        <div key={order.id} className="p-3 border-b border-border dark:border-border-dark hover:bg-primary dark:hover:bg-primary-dark">
                            <p className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">Novo pedido recebido!</p>
                            <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                                Cliente: {order.customer.name} - {new Date(order.created_at).toLocaleTimeString('pt-BR')}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};


const AdminLayout: React.FC<AdminLayoutProps> = ({ 
    orders, setOrders, menu, setMenu, onSwitchToFrontend, 
    theme, setTheme, hasNewNotification, setHasNewNotification, tenantId, userRole
}) => {
    const [view, setView] = useState<AdminView>('dashboard');
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    useEffect(() => {
        // Redirect non-admin users from restricted pages
        if (userRole === 'Funcionário' && (view === 'settings' || view === 'parameters')) {
            setView('dashboard');
        }
    }, [view, userRole]);


    const handleNotificationClick = () => {
        setIsNotificationsOpen(prev => !prev);
        if (hasNewNotification) {
            setHasNewNotification(false);
        }
    };
    
    const handleLogout = async () => {
        if (supabase) {
            await supabase.auth.signOut();
        }
    };

    const NavItem: React.FC<{
        viewName: AdminView,
        icon: React.ReactNode,
        label: string
    }> = ({ viewName, icon, label }) => (
        <button
            onClick={() => setView(viewName)}
            className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                view === viewName ? 'bg-accent text-white' : 'text-text-secondary dark:text-text-secondary-dark hover:bg-border dark:hover:bg-border-dark hover:text-text-primary dark:hover:text-text-primary-dark'
            }`}
        >
            {icon}
            <span className="ml-3">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-primary dark:bg-primary-dark text-text-primary dark:text-text-primary-dark flex">
            <aside className="w-64 bg-secondary dark:bg-secondary-dark border-r border-border dark:border-border-dark flex-col p-4 hidden md:flex">
                <div>
                    <div className="flex items-center gap-2 px-2 mb-8">
                        <HamburgerIcon className="h-8 w-8"/>
                        <span className="text-2xl font-logo tracking-wider text-text-primary dark:text-text-primary-dark">gastrô<span className="text-accent">.</span></span>
                    </div>
                    <nav className="flex flex-col space-y-2">
                        <NavItem viewName="dashboard" icon={<ChartBarIcon className="h-6 w-6"/>} label="Dashboard" />
                        <NavItem viewName="menu" icon={<CollectionIcon className="h-6 w-6"/>} label="Cardápio" />
                        <NavItem viewName="orders" icon={<ClipboardListIcon className="h-6 w-6"/>} label="Pedidos" />
                        {userRole === 'Admin' && (
                            <>
                                <NavItem viewName="settings" icon={<AdjustmentsIcon className="h-6 w-6"/>} label="Configurações" />
                                <NavItem viewName="parameters" icon={<LinkIcon className="h-6 w-6"/>} label="Parâmetros" />
                            </>
                        )}
                    </nav>
                </div>
                <div className="mt-auto">
                    <div className="text-center text-xs text-text-secondary dark:text-text-secondary-dark my-4 px-2">
                        Feito com <span className="text-accent">💟</span> por gastrô tecnologia.
                    </div>
                    <hr className="mb-4 border-border dark:border-border-dark" />
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors duration-200 text-text-secondary dark:text-text-secondary-dark hover:bg-border dark:hover:bg-border-dark hover:text-text-primary dark:hover:text-text-primary-dark"
                    >
                        <LogoutIcon className="h-6 w-6" />
                        <span className="ml-3">Sair</span>
                    </button>
                </div>
            </aside>
            <div className="flex-1 flex flex-col">
                <header className="bg-secondary dark:bg-secondary-dark border-b border-border dark:border-border-dark">
                    <div className="h-16 flex items-center justify-between px-8">
                        <h1 className="text-xl font-semibold text-text-primary dark:text-text-primary-dark capitalize">{view}</h1>
                        <div className="flex items-center gap-4">
                            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="text-text-secondary dark:text-text-secondary-dark hover:text-accent p-2 rounded-full transition-colors">
                                {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
                            </button>
                            <div className="relative">
                                <button onClick={handleNotificationClick} className="text-text-secondary dark:text-text-secondary-dark hover:text-accent p-2 transition-colors">
                                    <BellIcon className="h-6 w-6" />
                                    {hasNewNotification && <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-secondary dark:ring-secondary-dark" />}
                                </button>
                                {isNotificationsOpen && <NotificationPopup orders={orders} onClose={() => setIsNotificationsOpen(false)} />}
                            </div>
                            <button
                                onClick={onSwitchToFrontend}
                                className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-highlight transition-colors"
                            >
                                <span>Ver Loja</span>
                                <ExternalLinkIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {(() => {
                        switch(view) {
                            case 'dashboard':
                                return <AdminDashboard orders={orders} menu={menu} />;
                            case 'menu':
                                return <AdminMenu menu={menu} setMenu={setMenu} tenantId={tenantId} />;
                            case 'orders':
                                return <AdminOrders orders={orders} setOrders={setOrders} />;
                            case 'settings':
                                return userRole === 'Admin' ? <AdminSettings tenantId={tenantId} /> : <AdminDashboard orders={orders} menu={menu} />;
                            case 'parameters':
                                return userRole === 'Admin' ? <AdminParameters /> : <AdminDashboard orders={orders} menu={menu} />;
                            default:
                                return <AdminDashboard orders={orders} menu={menu} />;
                        }
                    })()}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;