import React, { useState, useCallback } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { SettingsPanel } from './components/UI';
import CategoryColumn from './components/CategoryColumn';
import UniversalSearch from './components/UniversalSearch';
import type { Category, Settings } from './types';
import { CATEGORIES } from './types';

function App() {
  const [charisma, setCharisma] = useLocalStorage<number>('dizzyprice-charisma', 10);
  const [isTourist, setIsTourist] = useState<boolean>(false);
  const [hasDunceCap, setHasDunceCap] = useState<boolean>(false);
  const [prices, setPrices] = useState<Record<Category, string>>(() => 
    Object.fromEntries(CATEGORIES.map(c => [c, ''])) as Record<Category, string>
  );

  const settings: Settings = { charisma, isTourist, hasDunceCap };

  const handleSettingsChange = useCallback((newSettings: Partial<Settings>) => {
    if (newSettings.charisma !== undefined) setCharisma(newSettings.charisma);
    if (newSettings.isTourist !== undefined) setIsTourist(newSettings.isTourist);
    if (newSettings.hasDunceCap !== undefined) setHasDunceCap(newSettings.hasDunceCap);
  }, [setCharisma]);
  
  const handlePriceChange = useCallback((category: Category, value: string) => {
    setPrices(prevPrices => ({
      ...prevPrices,
      [category]: value
    }));
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-900">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 tracking-wider">DizzyPrice</h1>
        <p className="text-gray-400 mt-2">The NetHack Price Identification Tool</p>
      </header>
      
      <main>
        <SettingsPanel settings={settings} onSettingsChange={handleSettingsChange} />
        
        <UniversalSearch settings={settings} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {CATEGORIES.map(category => (
            <CategoryColumn
              key={category}
              category={category}
              price={prices[category]}
              onPriceChange={handlePriceChange}
              settings={settings}
            />
          ))}
        </div>
      </main>

      <footer className="text-center mt-12 text-gray-500 text-sm">
        <p>Ported from the original dizzyprice.py by Aubrey Raech.</p>
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>

    </div>
  );
}

export default App;