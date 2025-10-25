

import React, { useState, useMemo, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { categories } from './data/menuData';
import type { Category, MenuItem as MenuItemType, Order, CartItem } from './types';
import Header from './components/Header';
import CategoryTabs from './components/CategoryTabs';
import MenuItemCard from './components/MenuItemCard';
import Cart from './components/Cart';
import useCart from './hooks/useCart';
import AIAssistant from './components/AIAssistant';
import AdminLayout from './components/admin/AdminLayout';
import Login from './components/Login';
import { supabase } from './services/supabaseClient';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'Admin' | 'Funcionário' | null>(null);
  
  const [view, setView] = useState<'frontend' | 'admin'>('frontend');
  const [menu, setMenu] = useState<MenuItemType[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const [isCartOpen, setCartOpen] = useState(false);
  const cart = useCart();

  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );
  const [hasNewNotification, setHasNewNotification] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  // Auth listener
  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        setTenantId(null);
        setUserRole(null);
        setView('frontend'); // Reset to frontend on logout
      }
      setIsLoading(false);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  // Fetch user data (tenantId and role) when session changes
  useEffect(() => {
    const fetchUserData = async () => {
        if (supabase && session?.user?.email) {
            const userEmail = session.user.email;
            const { data, error } = await supabase
                .from('users')
                .select('tenant_id, role')
                .eq('email', userEmail)
                .maybeSingle();

            if (error) {
                console.error("Error fetching user data:", error);
                setTenantId(null);
                setUserRole(null);
                return;
            }

            // If a tenant_id is found, use it. Also set the role.
            if (data?.tenant_id) {
                setTenantId(data.tenant_id);
                setUserRole(data.role);
            } 
            // If no tenant_id is found (either user not in table or tenant_id is null)
            // AND the user is our special test user, apply the fallback.
            else if (userEmail === 'inquilino2@gastro.com') {
                console.warn(`User ${userEmail} has no tenant_id in 'users' table. Applying fallback.`);
                setTenantId('a1b2c3d4-e5f6-7890-1234-567890abcdef');
                // Apply fallback role for the special user if one doesn't exist in the DB
                setUserRole(data?.role || 'Funcionário');
            } 
            // For any other user without a tenant_id, set it to null.
            else {
                console.warn(`User ${userEmail} not found or has no tenant_id in 'users' table.`);
                setTenantId(null);
                setUserRole(null);
            }

        } else {
          setTenantId(null);
          setUserRole(null);
        }
    };
    fetchUserData();
}, [session]);
  
  // Fetch initial data and subscribe to real-time updates based on tenantId
  useEffect(() => {
    if (!tenantId || !supabase) {
      setMenu([]);
      setOrders([]);
      return;
    };

    const fetchData = async () => {
      // Fetch Menu
      const { data: menuData, error: menuError } = await supabase
        .from('menu_items')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('id');
      if (menuError) console.error('Error fetching menu:', menuError);
      else setMenu(menuData as MenuItemType[]);

      // Fetch Orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false });
      if (ordersError) console.error('Error fetching orders:', ordersError);
      else setOrders(ordersData as Order[]);
    };

    fetchData();

    // Real-time subscription for new orders
    const channel = supabase.channel(`public:orders:tenant_id=eq.${tenantId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'orders',
        filter: `tenant_id=eq.${tenantId}`
      }, (payload) => {
        const newOrder = payload.new as Order;
        // Add a check to prevent duplicates, since we now add the order manually upon creation.
        setOrders(prevOrders => {
          if (prevOrders.some(order => order.id === newOrder.id)) {
            return prevOrders;
          }
          return [newOrder, ...prevOrders];
        });
        setHasNewNotification(true);

        // Handle notifications and webhooks
        const notificationsEnabled = localStorage.getItem('notification-new-order') === 'true';
        if (notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
          new Notification('Novo Pedido Recebido!', {
            body: `Cliente: ${newOrder.customer.name}\nTotal: R$${newOrder.total.toFixed(2).replace('.', ',')}`,
            icon: '/favicon.ico'
          });
        }
        
        const webhookUrl = localStorage.getItem('webhookUrl');
        if (webhookUrl) {
          fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOrder)
          }).catch(error => console.error('Webhook failed:', error));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tenantId]);

  const filteredMenu = useMemo(() => 
    menu.filter(item => item.category === selectedCategory),
    [selectedCategory, menu]
  );
  
  const handlePlaceOrder = async (customer: { name: string; address: string; }, cartItems: CartItem[], total: number, paymentMethod: 'Cartão' | 'PIX') => {
    if (!tenantId || !supabase) {
        alert('Configuração do Supabase ou ID do Tenant não encontrado. Não é possível fazer o pedido.');
        return;
    }

    const newOrderPayload = {
      customer: {
        ...customer,
        paymentMethod: paymentMethod,
      },
      items: cartItems,
      total,
      status: 'Pendente' as const,
      tenant_id: tenantId,
    };

    const { data, error } = await supabase
      .from('orders')
      .insert([newOrderPayload])
      .select()
      .single();

    if (error) {
      console.error('Error placing order:', error);
      alert('Houve um erro ao processar seu pedido. Tente novamente.');
    } else if (data) {
      // Manually update state to ensure order appears immediately
      setOrders(prevOrders => [data as Order, ...prevOrders]);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-primary dark:bg-primary-dark"><p>Carregando...</p></div>;
  }

  if (!session) {
    return <Login />;
  }

  if (view === 'admin') {
    return <AdminLayout 
      orders={orders}
      setOrders={setOrders}
      menu={menu}
      setMenu={setMenu}
      onSwitchToFrontend={() => setView('frontend')}
      theme={theme}
      setTheme={setTheme}
      hasNewNotification={hasNewNotification}
      setHasNewNotification={setHasNewNotification}
      tenantId={tenantId}
      userRole={userRole}
    />
  }

  return (
    <div className="min-h-screen bg-primary font-sans">
      <Header 
        onCartClick={() => setCartOpen(true)} 
        cartItemCount={cart.items.length}
        onSwitchToAdmin={() => setView('admin')}
      />
      
      <main className="container mx-auto px-4 pb-24">
        <div className="sticky top-16 md:top-20 bg-primary/80 backdrop-blur-lg z-20 py-4 -mx-4 px-4 border-b border-border">
          <CategoryTabs 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-6">
          {filteredMenu.map(item => (
            <MenuItemCard key={item.id} item={item} onAddToCart={() => cart.addItem(item)} />
          ))}
        </div>
      </main>
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setCartOpen(false)}
        onPlaceOrder={handlePlaceOrder}
        {...cart}
      />
      
      <AIAssistant menuData={menu} />
    </div>
  );
};

export default App;
