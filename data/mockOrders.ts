import type { Order, CartItem, MenuItem } from '../types';
import { menuData } from './menuData';

// Helper to generate a random date within the last 30 days
const randomDate = (start: Date, end: Date): Date => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Group menu items by tenant
const menuByTenant = menuData.reduce((acc, item) => {
    if (!acc[item.tenant_id]) {
        acc[item.tenant_id] = [];
    }
    acc[item.tenant_id].push(item);
    return acc;
}, {} as Record<string, MenuItem[]>);

const tenantIds = Object.keys(menuByTenant);

// Helper to pick random items from a specific tenant's menu
const pickRandomItems = (tenantMenu: MenuItem[]): CartItem[] => {
    const items: CartItem[] = [];
    const numItems = Math.floor(Math.random() * 4) + 1; // 1 to 4 items per order
    const shuffledMenu = [...tenantMenu].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < Math.min(numItems, shuffledMenu.length); i++) {
        const menuItem = shuffledMenu[i];
        if (menuItem) {
            items.push({
                ...menuItem,
                quantity: Math.floor(Math.random() * 2) + 1, // 1 or 2 quantity
            });
        }
    }
    return items;
};

export const generateMockOrders = (count: number = 50): Order[] => {
    const orders: Order[] = [];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    for (let i = 0; i < count; i++) {
        const randomTenantId = tenantIds[Math.floor(Math.random() * tenantIds.length)];
        const tenantMenu = menuByTenant[randomTenantId];
        
        const items = pickRandomItems(tenantMenu);
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const paymentMethod = Math.random() > 0.5 ? 'Cartão' : 'PIX';
        
        orders.push({
            id: `mock-${i + 1}-${Date.now()}`,
            customer: {
                name: `Cliente ${i + 1}`,
                address: `Endereço Fictício ${i + 1}`,
                paymentMethod: paymentMethod,
            },
            items,
            total,
            created_at: randomDate(startDate, endDate).toISOString(),
            status: ['Pendente', 'Em Preparo', 'Entregue'][Math.floor(Math.random() * 3)] as Order['status'],
            tenant_id: randomTenantId,
        });
    }
    
    return orders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); // Newest first
};