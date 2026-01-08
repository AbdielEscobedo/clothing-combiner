import OutfitRandomizer from './components/OutfitRandomizer';

function App() {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>✨ Mix & Match ✨</h1>
                <p>Crea tu outfit perfecto</p>
            </header>
            <main>
                <OutfitRandomizer />
            </main>
        </div>
    )
}

export default App
