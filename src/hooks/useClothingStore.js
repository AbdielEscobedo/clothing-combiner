import { useState, useEffect, useCallback } from 'react';
import { addItem, getAllItems, deleteItem } from '../utils/db';

export const CATEGORIES = ['Shoes', 'Pants', 'Blouse', 'Jacket', 'Accessory'];

export const CATEGORY_LABELS = {
    'Shoes': 'Zapatos',
    'Pants': 'Pantalón',
    'Blouse': 'Blusa/Camisa',
    'Jacket': 'Saco/Suéter',
    'Accessory': 'Accesorio'
};

export function useClothingStore() {
    const [items, setItems] = useState([]); // All items from DB
    const [currentOutfit, setCurrentOutfit] = useState({}); // { category: item }
    const [locked, setLocked] = useState({}); // { category: boolean }
    const [loading, setLoading] = useState(true);

    // Load items from DB on mount
    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        setLoading(true);
        try {
            const storedItems = await getAllItems();
            setItems(storedItems);
            // Initial random generation if outfit is empty
            if (Object.keys(currentOutfit).length === 0 && storedItems.length > 0) {
                generateRandomOutfit(storedItems);
            }
        } catch (error) {
            console.error("Failed to load items", error);
        } finally {
            setLoading(false);
        }
    };

    const generateRandomOutfit = useCallback((currentItems = items) => {
        const newOutfit = { ...currentOutfit };

        CATEGORIES.forEach(cat => {
            // If locked and we have an item there, skip
            if (locked[cat] && newOutfit[cat]) return;

            const catItems = currentItems.filter(i => i.category === cat);
            if (catItems.length > 0) {
                const randomItem = catItems[Math.floor(Math.random() * catItems.length)];
                newOutfit[cat] = randomItem;
            } else {
                // If no items in category, verify if we should clear it (optional, maybe keep placeholder)
                if (!locked[cat]) newOutfit[cat] = null;
            }
        });

        setCurrentOutfit(newOutfit);
    }, [items, currentOutfit, locked]);

    const toggleLock = (category) => {
        setLocked(prev => ({ ...prev, [category]: !prev[category] }));
    };

    const addNewItem = async (category, file) => {
        if (!file) return;
        try {
            const newId = await addItem(category, file);
            const storedItems = await getAllItems();
            setItems(storedItems);

            const newItem = storedItems.find(i => i.id === newId);
            if (newItem) {
                setCurrentOutfit(prev => ({ ...prev, [category]: newItem }));
            }
        } catch (error) {
            console.error("Failed to add item", error);
        }
    };

    const removeClothingItem = async (id) => {
        try {
            await deleteItem(id);
            await loadItems();
        } catch (error) {
            console.error("Failed to delete item", error);
        }
    };

    return {
        items,
        currentOutfit,
        locked,
        loading,
        generateRandomOutfit,
        toggleLock,
        addNewItem,
        removeClothingItem
    };
}
