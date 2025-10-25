import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { Order, MenuItem, CartItem } from '../../types';
import { ChartBarIcon, ClipboardListIcon } from '../Icons';

interface AdminDashboardProps {
    orders: Order[];
    menu: MenuItem[];
}

type Period = 'day' | 'week' | 'month';

interface ChartDataPoint {
    label: string;
    count: number;
    orders: Order[];
}

const Tooltip: React.FC<{ orders: Order[], x: number, y: number, title: string }> = ({ orders, x, y, title }) => {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: y + 15, left: x + 15 });

    useEffect(() => {
        if (tooltipRef.current) {
            const { innerWidth, innerHeight } = window;
            const { clientWidth, clientHeight } = tooltipRef.current;
            let newLeft = x + 15;
            let newTop = y + 15;
            if (newLeft + clientWidth > innerWidth) {
                newLeft = x - clientWidth - 15;
            }
            if (newTop + clientHeight > innerHeight) {
                newTop = y - clientHeight - 15;
            }
            setPosition({ top: newTop, left: newLeft });
        }
    }, [x, y]);
    
    const aggregatedItems = useMemo(() => {
        const itemMap = new Map<number, { id: number; name: string; quantity: number; price: number }>();
        orders.forEach(order => {
            order.items.forEach(item => {
                if (itemMap.has(item.id)) {
                    const existing = itemMap.get(item.id)!;
                    existing.quantity += item.quantity;
                } else {
                    itemMap.set(item.id, {
                        id: item.id,
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    });
                }
            });
        });
        return Array.from(itemMap.values());
    }, [orders]);


    return (
        <div 
            ref={tooltipRef}
            style={{ top: position.top, left: position.left, position: 'fixed' }}
            className="z-50 w-64 bg-secondary dark:bg-gray-900 p-3 rounded-lg shadow-2xl border border-border dark:border-border-dark text-sm animate-fade-in-up"
        >
            <h4 className="font-bold mb-2 border-b border-border dark:border-border-dark pb-2 text-text-primary dark:text-text-primary-dark">{title}</h4>
            <ul className="max-h-48 overflow-y-auto space-y-2">
                {aggregatedItems.map(item => (
                    <li key={item.id} className="flex justify-between items-center text-text-secondary dark:text-text-secondary-dark">
                        <span className="truncate pr-2">{item.quantity}x {item.name}</span>
                        <span className="font-semibold text-highlight whitespace-nowrap">R${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};


const BarChart: React.FC<{ title: string, chartData: ChartDataPoint[], labelInterval?: number }> = ({ title, chartData, labelInterval = 1 }) => {
    const maxVal = Math.max(...chartData.map(d => d.count), 1);
    const [tooltip, setTooltip] = useState<{ visible: boolean; content: Order[]; x: number; y: number, title: string } | null>(null);

    const handleMouseEnter = (e: React.MouseEvent, dataPoint: ChartDataPoint) => {
        if (dataPoint.orders.length > 0) {
            setTooltip({
                visible: true,
                content: dataPoint.orders,
                x: e.clientX,
                y: e.clientY,
                title: `${title} - ${dataPoint.label}`
            });
        }
    };

    const handleMouseLeave = () => {
        setTooltip(null);
    };

    return (
        <>
            {tooltip?.visible && <Tooltip orders={tooltip.content} x={tooltip.x} y={tooltip.y} title={tooltip.title} />}
            <div className="bg-secondary dark:bg-secondary-dark p-6 rounded-xl border border-border dark:border-border-dark shadow-sm h-full flex flex-col">
                <h3 className="font-bold mb-4 text-text-primary dark:text-text-primary-dark">{title}</h3>
                <div className="flex-grow flex items-end justify-around gap-1 sm:gap-2 pt-6 text-center">
                    {chartData.map((dataPoint, index) => {
                        const barHeight = `${Math.max((dataPoint.count / maxVal) * 100, 2)}%`;

                        return (
                            <div
                                key={index}
                                className="w-full flex-1 flex flex-col items-center relative h-full justify-end"
                                onMouseLeave={handleMouseLeave}
                            >
                                {dataPoint.count > 0 && (
                                    <div
                                        className="absolute flex items-center justify-center h-6 w-6 rounded-full bg-white dark:bg-gray-800 border-2 border-accent text-xs font-bold text-accent cursor-pointer transition-transform hover:scale-125"
                                        style={{ bottom: `calc(${barHeight} + 0.5rem)` }}
                                        onMouseEnter={(e) => handleMouseEnter(e, dataPoint)}
                                    >
                                        {dataPoint.count}
                                    </div>
                                )}
                                <div
                                    className="w-full max-w-[40px] rounded-t-md bg-accent"
                                    style={{ height: barHeight }}
                                    onMouseEnter={(e) => handleMouseEnter(e, dataPoint)}
                                ></div>
                                <span className="text-xs text-text-secondary dark:text-text-secondary-dark mt-2 h-4">
                                    {(index % labelInterval === 0) ? dataPoint.label : ''}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};


const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, menu }) => {
    const [activeUsers, setActiveUsers] = useState(0);
    const [period, setPeriod] = useState<Period>('week');

    useEffect(() => {
        const updateUsers = () => setActiveUsers(Math.floor(Math.random() * (50 - 10 + 1)) + 10);
        updateUsers();
        const interval = setInterval(updateUsers, 5000);
        return () => clearInterval(interval);
    }, []);

    const filteredOrders = useMemo(() => {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        return orders.filter(order => {
            const orderDate = new Date(order.created_at);
            if (period === 'day') {
                return orderDate >= startOfToday;
            }
            if (period === 'week') {
                const oneWeekAgo = new Date(now);
                oneWeekAgo.setDate(now.getDate() - 7);
                return orderDate >= oneWeekAgo;
            }
            if (period === 'month') {
                const oneMonthAgo = new Date(now);
                oneMonthAgo.setDate(now.getDate() - 30);
                return orderDate >= oneMonthAgo;
            }
            return true;
        });
    }, [orders, period]);


    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = filteredOrders.length;

    const topItems = useMemo(() => {
        const itemCounts: { [key: string]: number } = {};
        filteredOrders.forEach(order => {
            order.items.forEach(item => {
                itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
            });
        });
        return Object.entries(itemCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
    }, [filteredOrders]);

    const maxSoldCount = topItems.length > 0 ? topItems[0][1] : 1;
    
    const peakHoursChartData = useMemo(() => {
        const hours: { count: number; orders: Order[] }[] = Array(24).fill(0).map(() => ({ count: 0, orders: [] }));
        filteredOrders.forEach(order => {
            const hour = new Date(order.created_at).getHours();
            hours[hour].count++;
            hours[hour].orders.push(order);
        });
        return hours.map((data, i) => ({
            label: `${i}h`,
            count: data.count,
            orders: data.orders
        }));
    }, [filteredOrders]);
    
    const dayOfWeekChartData = useMemo(() => {
        const dayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        const days: ChartDataPoint[] = dayLabels.map(label => ({ label, count: 0, orders: [] }));
        
        filteredOrders.forEach(order => {
            const dayIndex = new Date(order.created_at).getDay();
            days[dayIndex].count++;
            days[dayIndex].orders.push(order);
        });
        
        const today = new Date().getDay();
        return days.slice(today + 1).concat(days.slice(0, today + 1));
    }, [filteredOrders]);

    const getRankClasses = (rank: number) => {
        switch (rank) {
            case 1:
                return 'bg-yellow-400 text-white';
            case 2:
                return 'bg-gray-400 text-white';
            case 3:
                return 'bg-amber-500 text-white';
            default:
                return 'bg-border dark:bg-border-dark text-text-secondary dark:text-text-secondary-dark';
        }
    };


    const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
        <div className="bg-secondary dark:bg-secondary-dark p-6 rounded-xl border border-border dark:border-border-dark shadow-sm flex items-center space-x-4">
            <div className="bg-primary dark:bg-primary-dark p-3 rounded-full">
                {icon}
            </div>
            <div>
                <p className="text-sm text-text-secondary dark:text-text-secondary-dark font-medium">{title}</p>
                <p className="text-3xl font-bold text-text-primary dark:text-text-primary-dark">{value}</p>
            </div>
        </div>
    );
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">Dashboard</h2>
                <div className="flex space-x-1 bg-primary dark:bg-primary-dark p-1 rounded-lg">
                    {(['day', 'week', 'month'] as Period[]).map(p => (
                        <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${period === p ? 'bg-secondary dark:bg-secondary-dark shadow' : 'text-text-secondary dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                            {p === 'day' ? 'Hoje' : p === 'week' ? '7 Dias' : '30 Dias'}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                    title="Faturamento Total"
                    value={`R$${totalRevenue.toFixed(2).replace('.', ',')}`}
                    icon={<ChartBarIcon className="h-7 w-7 text-highlight" />}
                />
                 <StatCard 
                    title="Total de Pedidos"
                    value={totalOrders}
                    icon={<ClipboardListIcon className="h-7 w-7 text-accent" />}
                />
                 <StatCard 
                    title="Usuários Ativos (Simulado)"
                    value={activeUsers}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                 <div className="lg:col-span-2 h-96">
                    <BarChart title="Horários de Pico" chartData={peakHoursChartData} labelInterval={3} />
                </div>
                <div className="bg-secondary dark:bg-secondary-dark p-6 rounded-xl border border-border dark:border-border-dark shadow-sm">
                    <h3 className="font-bold mb-4 text-text-primary dark:text-text-primary-dark">Itens Mais Pedidos</h3>
                    <ul className="space-y-5">
                        {topItems.length > 0 ? topItems.map(([name, count], index) => {
                             const rank = index + 1;
                             const barWidth = `${Math.max((count / maxSoldCount) * 100, 1)}%`;

                            return (
                                <li key={name}>
                                    <div className="flex justify-between items-center mb-1.5 text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getRankClasses(rank)}`}>
                                                {rank}
                                            </div>
                                            <span className="font-semibold text-text-primary dark:text-text-primary-dark truncate">{name}</span>
                                        </div>
                                        <span className="font-semibold text-text-secondary dark:text-text-secondary-dark">{count} vendidos</span>
                                    </div>
                                    <div className="w-full bg-primary dark:bg-primary-dark rounded-full h-2">
                                        <div 
                                            className="bg-gradient-to-r from-accent to-highlight rounded-full h-2 transition-all duration-500 ease-out"
                                            style={{ width: barWidth }}
                                        ></div>
                                    </div>
                                </li>
                            );
                        }) : <p className="text-sm text-text-secondary dark:text-text-secondary-dark">Não há dados suficientes.</p>}
                    </ul>
                </div>
            </div>
             <div className="mt-6 h-96">
                <BarChart title="Pedidos por Dia da Semana" chartData={dayOfWeekChartData} />
            </div>
        </div>
    );
};

export default AdminDashboard;
