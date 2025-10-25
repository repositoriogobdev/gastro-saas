export type Category = 'Hambúrgueres' | 'Pizzas' | 'Bebidas' | 'Sobremesas';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  image_url: string;
  tenant_id: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    address: string;
    paymentMethod?: 'Cartão' | 'PIX';
  };
  items: CartItem[];
  total: number;
  created_at: string;
  status: 'Pendente' | 'Em Preparo' | 'Entregue';
  tenant_id: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Funcionário';
  tenant_id: string;
}

export interface PaymentGateway {
  id: 'stripe' | 'mercado-pago' | 'pagseguro';
  name: string;
  publicKey: string;
  secretKey: string;
}