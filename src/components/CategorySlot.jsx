import { useRef } from 'react';

const CategorySlot = ({ category, label, item, isLocked, onToggleLock, onUpload, onRemove }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onUpload(category, e.target.files[0]);
        }
    };

    const imageUrl = item ? URL.createObjectURL(item.imageBlob) : null;

    return (
        <div className={`category-slot ${isLocked ? 'locked' : ''}`}>
            <div className="slot-header">
                <h3>{label}</h3>
                <div className="header-actions">
                    <button
                        className="action-btn add-btn"
                        onClick={() => fileInputRef.current.click()}
                        title="Añadir nueva prenda"
                    >
                        ➕
                    </button>
                    <button
                        className="action-btn lock-btn"
                        onClick={() => onToggleLock(category)}
                        title={isLocked ? "Desbloquear" : "Bloquear para próxima combinación"}
                    >
                        {isLocked ? '🔒' : '🔓'}
                    </button>
                </div>
            </div>

            <div className="image-area" onClick={() => !item && fileInputRef.current.click()}>
                {imageUrl ? (
                    <div className="image-container">
                        <img src={imageUrl} alt={category} />
                        <div className="image-actions">
                            <button onClick={() => fileInputRef.current.click()} title="Cambiar foto">✏️</button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
                                title="Eliminar esta prenda permanentemente"
                                className="delete-btn"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="placeholder">
                        <span>+</span>
                        <p>Añadir</p>
                    </div>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default CategorySlot;
