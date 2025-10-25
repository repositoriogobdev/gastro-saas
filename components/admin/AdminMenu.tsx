
import React, { useState } from 'react';
import type { MenuItem } from '../../types';
import MenuItemForm from './MenuItemForm';
import { PlusIcon, PencilIcon } from '../Icons';
import MenuItemModal from './MenuItemModal';
import { supabase } from '../../services/supabaseClient';

interface AdminMenuProps {
    menu: MenuItem[];
    setMenu: React.Dispatch<React.SetStateAction<MenuItem[]>>;
    tenantId: string | null;
}

const AdminMenu: React.FC<AdminMenuProps> = ({ menu, setMenu, tenantId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

    const handleAddItemClick = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleEditItemClick = (item: MenuItem) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    }

    const handleSaveItem = async (itemData: Omit<MenuItem, 'id' | 'tenant_id'> | MenuItem) => {
        if (!tenantId) {
            alert("Não foi possível salvar: ID do restaurante não encontrado.");
            return;
        }

        if ('id' in itemData && itemData.id) {
            // Update existing item
            const { id, tenant_id, ...updateData } = itemData;
            const { data, error } = await supabase
                .from('menu_items')
                .update(updateData)
                .eq('id', id)
                .select();

            if (error) {
                console.error('Error updating menu item:', error);
                alert('Erro ao atualizar o item.');
            } else if (data) {
                setMenu(prevMenu => prevMenu.map(item => item.id === id ? data[0] : item));
            }

        } else {
            // Add new item
            const newItemPayload = {
                ...(itemData as Omit<MenuItem, 'id'>),
                tenant_id: tenantId
            };
            const { data, error } = await supabase
                .from('menu_items')
                .insert([newItemPayload])
                .select();
            
            if (error) {
                 console.error('Error adding menu item:', error);
                 alert('Erro ao adicionar o item.');
            } else if(data) {
                setMenu(prevMenu => [data[0], ...prevMenu]);
            }
        }
        handleCloseModal();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">Gerenciar Cardápio</h2>
                <button
                    onClick={handleAddItemClick}
                    className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-highlight transition-colors"
                >
                    <PlusIcon className="h-5 w-5" />
                    <span>Adicionar Item</span>
                </button>
            </div>

            <MenuItemModal isOpen={isModalOpen} onClose={handleCloseModal}>
                <MenuItemForm 
                    key={editingItem?.id || 'new'}
                    onSubmit={handleSaveItem} 
                    onCancel={handleCloseModal}
                    itemToEdit={editingItem}
                />
            </MenuItemModal>

            <div className="bg-secondary dark:bg-secondary-dark rounded-xl border border-border dark:border-border-dark overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-primary dark:bg-primary-dark">
                            <tr>
                                <th className="p-4 font-semibold">Item</th>
                                <th className="p-4 font-semibold">Categoria</th>
                                <th className="p-4 font-semibold">Preço</th>
                                <th className="p-4 font-semibold hidden md:table-cell">Descrição</th>
                                <th className="p-4 font-semibold">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menu.map(item => (
                                <tr key={item.id} className="border-t border-border dark:border-border-dark">
                                    <td className="p-4 flex items-center gap-4">
                                        <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-md object-cover hidden sm:block" />
                                        <span className="font-semibold">{item.name}</span>
                                    </td>
                                    <td className="p-4 text-text-secondary dark:text-text-secondary-dark">{item.category}</td>
                                    <td className="p-4 text-text-secondary dark:text-text-secondary-dark">R${item.price.toFixed(2).replace('.',',')}</td>
                                    <td className="p-4 text-text-secondary dark:text-text-secondary-dark text-sm max-w-xs truncate hidden md:table-cell">{item.description}</td>
                                    <td className="p-4">
                                        <button onClick={() => handleEditItemClick(item)} className="p-2 text-text-secondary dark:text-text-secondary-dark hover:text-accent dark:hover:text-accent transition-colors">
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminMenu;
