import { openDB } from 'idb';

const DB_NAME = 'clothing-app-db';
const STORE_NAME = 'clothing-items';

export const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        },
    });
};

export const addItem = async (category, imageBlob) => {
    const db = await initDB();
    return db.add(STORE_NAME, { category, imageBlob, allow: true });
};

export const getAllItems = async () => {
    const db = await initDB();
    return db.getAll(STORE_NAME);
};

export const getItemsByCategory = async (category) => {
    const db = await initDB();
    const allItems = await db.getAll(STORE_NAME);
    return allItems.filter(item => item.category === category);
};

export const deleteItem = async (id) => {
    const db = await initDB();
    return db.delete(STORE_NAME, id);
};
