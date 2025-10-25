
import React, { useState, useEffect } from 'react';
import type { User } from '../../types';
import { UserIcon, AtSymbolIcon } from '../Icons';
import { supabase } from '../../services/supabaseClient';


type SettingsTab = 'geral' | 'integracoes';

interface AdminSettingsProps {
    tenantId: string | null;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ tenantId }) => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('geral');
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Funcionário' as 'Admin' | 'Funcionário' });
    const [webhookUrl, setWebhookUrl] = useState('');
    const [notificationStatus, setNotificationStatus] = useState<'default' | 'granted' | 'denied'>('default');
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    useEffect(() => {
        // Fetch users from Supabase
        const fetchUsers = async () => {
            if (!tenantId) return;

            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('tenant_id', tenantId);
            
            if (error) console.error('Error fetching users:', error);
            else setUsers(data as User[]);
        };
        fetchUsers();

        if ('Notification' in window) {
            setNotificationStatus(Notification.permission);
        }
        const savedWebhookUrl = localStorage.getItem('webhookUrl') || '';
        setWebhookUrl(savedWebhookUrl);
        
        const savedNotificationPref = localStorage.getItem('notification-new-order') === 'true';
        setNotificationsEnabled(savedNotificationPref);
    }, [tenantId]);

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tenantId) {
            alert("Não foi possível adicionar usuário: ID do restaurante não encontrado.");
            return;
        }

        if (newUser.name && newUser.email) {
            const newUserPayload = { ...newUser, tenant_id: tenantId };
            const { data, error } = await supabase
                .from('users')
                .insert([newUserPayload])
                .select();
            
            if (error) {
                console.error('Error adding user:', error);
                alert('Erro ao adicionar usuário.');
            } else if (data) {
                setUsers([...users, data[0]]);
                setNewUser({ name: '', email: '', role: 'Funcionário' });
            }
        }
    };
    
    const handleSaveWebhook = () => {
        localStorage.setItem('webhookUrl', webhookUrl);
        alert('URL do Webhook salva com sucesso!');
    };

    const handleRequestNotificationPermission = () => {
        if (!('Notification' in window)) {
            alert('Este navegador não suporta notificações de desktop.');
            return;
        }
        Notification.requestPermission().then(permission => {
            setNotificationStatus(permission);
            if (permission === 'granted') {
                handleNotificationToggle(true);
            }
        });
    };

    const handleNotificationToggle = (enabled: boolean) => {
        setNotificationsEnabled(enabled);
        localStorage.setItem('notification-new-order', String(enabled));
    };

    const SettingsCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
        <div className="bg-secondary dark:bg-secondary-dark rounded-xl border border-border dark:border-border-dark overflow-hidden">
            <h3 className="p-4 text-lg font-bold border-b border-border dark:border-border-dark">{title}</h3>
            <div className="p-4 space-y-4">{children}</div>
        </div>
    );

    const TabButton: React.FC<{ tabName: SettingsTab; label: string }> = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                activeTab === tabName
                    ? 'bg-accent text-white shadow-md'
                    : 'text-text-secondary dark:text-text-secondary-dark hover:bg-border dark:hover:bg-border-dark'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <h2 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">Configurações</h2>
                <div className="flex space-x-2 bg-secondary dark:bg-secondary-dark p-1 rounded-xl border border-border dark:border-border-dark">
                    <TabButton tabName="geral" label="Geral" />
                    <TabButton tabName="integracoes" label="Integrações" />
                </div>
            </div>
            
            {activeTab === 'geral' && (
                <div className="space-y-8 animate-fade-in-up">
                    <SettingsCard title="Gerenciar Usuários">
                        <form onSubmit={handleAddUser} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="new-user-name" className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark">Nome</label>
                                    <div className="relative mt-1">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <UserIcon className="h-5 w-5 text-text-secondary dark:text-text-secondary-dark" />
                                        </div>
                                        <input
                                            id="new-user-name"
                                            type="text"
                                            value={newUser.name}
                                            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                            required
                                            className="block w-full rounded-md border-border bg-primary py-2 pl-10 pr-3 text-text-primary placeholder-text-secondary focus:border-accent focus:ring-accent dark:border-border-dark dark:bg-primary-dark dark:text-text-primary-dark dark:placeholder-text-secondary-dark shadow-sm"
                                            placeholder="João da Silva"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="new-user-email" className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark">Email</label>
                                    <div className="relative mt-1">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <AtSymbolIcon className="h-5 w-5 text-text-secondary dark:text-text-secondary-dark" />
                                        </div>
                                        <input
                                            id="new-user-email"
                                            type="email"
                                            value={newUser.email}
                                            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                            required
                                            className="block w-full rounded-md border-border bg-primary py-2 pl-10 pr-3 text-text-primary placeholder-text-secondary focus:border-accent focus:ring-accent dark:border-border-dark dark:bg-primary-dark dark:text-text-primary-dark dark:placeholder-text-secondary-dark shadow-sm"
                                            placeholder="voce@exemplo.com"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="new-user-role" className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark">Função</label>
                                <select
                                    id="new-user-role"
                                    value={newUser.role}
                                    onChange={e => setNewUser({ ...newUser, role: e.target.value as any })}
                                    className="mt-1 block w-full rounded-md border-border bg-primary py-2 pl-3 pr-10 text-text-primary focus:border-accent focus:ring-accent dark:border-border-dark dark:bg-primary-dark dark:text-text-primary-dark shadow-sm"
                                >
                                    <option>Funcionário</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                            <button type="submit" className="px-5 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary dark:focus:ring-offset-secondary-dark focus:ring-highlight transition-all duration-300">Adicionar Usuário</button>
                        </form>
                        <div className="border-t border-border dark:border-border-dark pt-4">
                            <h4 className="font-semibold mb-2">Usuários Existentes</h4>
                            <ul className="space-y-2">
                                {users.map(user => (
                                    <li key={user.id} className="flex justify-between items-center p-2 bg-primary dark:bg-primary-dark rounded-md">
                                        <div>
                                            <p className="font-semibold">{user.name}</p>
                                            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{user.email}</p>
                                        </div>
                                        <span className="text-sm font-medium px-2 py-1 rounded-full bg-border dark:bg-border-dark">{user.role}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </SettingsCard>
                    <SettingsCard title="Configurações de Alerta">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold">Notificações de Novos Pedidos</p>
                                <p className="text-sm text-text-secondary dark:text-text-secondary-dark">Receba um alerta no desktop a cada novo pedido.</p>
                            </div>
                            {notificationStatus === 'granted' ? (
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" checked={notificationsEnabled} onChange={e => handleNotificationToggle(e.target.checked)} className="sr-only peer" />
                                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
                                </label>
                            ) : (
                                <button onClick={handleRequestNotificationPermission} disabled={notificationStatus === 'denied'} className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                    {notificationStatus === 'denied' ? 'Permissão Negada' : 'Ativar Notificações'}
                                </button>
                            )}
                        </div>
                        {notificationStatus === 'denied' && (
                             <p className="text-xs text-red-500">Você bloqueou as notificações. É necessário alterar as permissões nas configurações do seu navegador.</p>
                        )}
                    </SettingsCard>
                </div>
            )}

            {activeTab === 'integracoes' && (
                <div className="space-y-8 animate-fade-in-up">
                    <SettingsCard title="Webhooks">
                         <div>
                            <label htmlFor="webhookUrl" className="block text-sm font-medium">URL do Webhook</label>
                            <p className="text-xs text-text-secondary dark:text-text-secondary-dark mb-2">Envie dados de novos pedidos em tempo real para um serviço externo, como Slack, Discord ou seu próprio sistema de automação.</p>
                            <div className="flex gap-2">
                                <input 
                                    type="url" 
                                    id="webhookUrl" 
                                    value={webhookUrl}
                                    onChange={e => setWebhookUrl(e.target.value)}
                                    placeholder="https://seu-servico.com/webhook" 
                                    className="flex-grow bg-primary dark:bg-primary-dark border-border dark:border-border-dark rounded-md shadow-sm" 
                                />
                                <button onClick={handleSaveWebhook} className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-highlight">Salvar</button>
                            </div>
                        </div>
                    </SettingsCard>
                </div>
            )}
        </div>
    );
};

export default AdminSettings;
