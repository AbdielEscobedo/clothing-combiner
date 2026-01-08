import { useEffect } from 'react';
import { useClothingStore, CATEGORIES, CATEGORY_LABELS } from '../hooks/useClothingStore';
import CategorySlot from './CategorySlot';

const OutfitRandomizer = () => {
    const {
        items,
        currentOutfit,
        locked,
        loading,
        generateRandomOutfit,
        toggleLock,
        addNewItem,
        removeClothingItem
    } = useClothingStore();

    if (loading) return <div className="loading">Cargando tu guardarropa...</div>;

    return (
        <div className="randomizer-container">
            <div className="slots-grid">
                {CATEGORIES.map(cat => (
                    <CategorySlot
                        key={cat}
                        category={cat}
                        label={CATEGORY_LABELS[cat]}
                        item={currentOutfit[cat]}
                        isLocked={locked[cat]}
                        onToggleLock={toggleLock}
                        onUpload={addNewItem}
                        onRemove={removeClothingItem}
                    />
                ))}
            </div>

            <div className="controls">
                <button className="generate-btn" onClick={() => generateRandomOutfit()}>
                    ✨ Generar Outfit ✨
                </button>
            </div>
        </div>
    );
};

export default OutfitRandomizer;
