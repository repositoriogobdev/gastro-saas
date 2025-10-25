import React, { useState, useEffect } from 'react';
import type { MenuItem, Category } from '../../types';
import { categories } from '../../data/menuData';

interface MenuItemFormProps {
    onSubmit: (item: Omit<MenuItem, 'id'> | MenuItem) => void;
    onCancel: () => void;
    itemToEdit?: MenuItem | null;
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({ onSubmit, onCancel, itemToEdit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<string | number>('');
    const [category, setCategory] = useState<Category>(categories[0]);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (itemToEdit) {
            setName(itemToEdit.name);
            setDescription(itemToEdit.description);
            setPrice(itemToEdit.price);
            setCategory(itemToEdit.category);
            setImageUrl(itemToEdit.image_url);
        } else {
             setImageUrl('https://picsum.photos/seed/newitem/400/300');
        }
    }, [itemToEdit]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !description || !price || !category || !imageUrl) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        const itemData = {
            name,
            description,
            price: Number(price),
            category,
            image_url: imageUrl
        };

        if (itemToEdit) {
            // Fix: Pass `tenant_id` from the item being edited to satisfy the `MenuItem` type for the `onSubmit` prop.
            onSubmit({ ...itemData, id: itemToEdit.id, tenant_id: itemToEdit.tenant_id });
        } else {
            // Fix: Pass a dummy `tenant_id` to satisfy the `Omit<MenuItem, "id">` type for the `onSubmit` prop.
            // The parent component will overwrite this with the correct `tenant_id`.
            onSubmit({ ...itemData, tenant_id: '' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-secondary dark:bg-secondary-dark p-6 rounded-xl border border-border dark:border-border-dark space-y-4">
            <h3 className="text-xl font-bold text-text-primary dark:text-text-primary-dark">{itemToEdit ? 'Editar Item' : 'Adicionar Novo Item'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark">Nome do Item</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full bg-primary dark:bg-primary-dark border-border dark:border-border-dark rounded-md shadow-sm focus:ring-accent focus:border-accent" />
                </div>
                 <div>
                    <label htmlFor="price" className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark">Preço (ex: 29.99)</label>
                    <input type="number" id="price" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required className="mt-1 block w-full bg-primary dark:bg-primary-dark border-border dark:border-border-dark rounded-md shadow-sm focus:ring-accent focus:border-accent" />
                </div>
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark">Descrição</label>
                <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={3} className="mt-1 block w-full bg-primary dark:bg-primary-dark border-border dark:border-border-dark rounded-md shadow-sm focus:ring-accent focus:border-accent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark">Categoria</label>
                    <select id="category" value={category} onChange={e => setCategory(e.target.value as Category)} required className="mt-1 block w-full bg-primary dark:bg-primary-dark border-border dark:border-border-dark rounded-md shadow-sm focus:ring-accent focus:border-accent">
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark">URL da Imagem</label>
                    <input type="text" id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required className="mt-1 block w-full bg-primary dark:bg-primary-dark border-border dark:border-border-dark rounded-md shadow-sm focus:ring-accent focus:border-accent" />
                </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-primary dark:bg-primary-dark border border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark rounded-lg hover:bg-border dark:hover:bg-border-dark">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-highlight">{itemToEdit ? 'Salvar Alterações' : 'Adicionar Item'}</button>
            </div>
        </form>
    );
};

export default MenuItemForm;