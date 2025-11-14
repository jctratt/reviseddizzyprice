
import React from 'react';
import type { Settings, PricedItem, AnyItem } from '../types';

interface CharismaControlProps {
  charisma: number;
  setCharisma: (value: number) => void;
}

export const CharismaControl: React.FC<CharismaControlProps> = ({ charisma, setCharisma }) => {
  const increment = () => setCharisma(Math.min(20, charisma + 1));
  const decrement = () => setCharisma(Math.max(3, charisma - 1));

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="charisma" className="font-medium text-gray-300">Charisma:</label>
      <button onClick={decrement} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors">-</button>
      <span className="w-8 text-center font-bold text-lg text-cyan-400">{charisma}</span>
      <button onClick={increment} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors">+</button>
    </div>
  );
};

interface SettingsPanelProps {
  settings: Settings;
  onSettingsChange: (newSettings: Partial<Settings>) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onSettingsChange }) => {
  const handleCharismaChange = (newCharisma: number) => {
    onSettingsChange({ charisma: newCharisma });
  };
  
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-wrap items-center justify-center gap-6 mb-8">
      <CharismaControl charisma={settings.charisma} setCharisma={handleCharismaChange} />
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="tourist"
            checked={settings.isTourist}
            onChange={(e) => onSettingsChange({ isTourist: e.target.checked })}
            className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-600"
          />
          <label htmlFor="tourist" className="ml-2 text-gray-300">Tourist</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="dunce"
            checked={settings.hasDunceCap}
            onChange={(e) => onSettingsChange({ hasDunceCap: e.target.checked })}
            className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-600"
          />
          <label htmlFor="dunce" className="ml-2 text-gray-300">Dunce Cap</label>
        </div>
      </div>
    </div>
  );
};

interface ResultTableProps {
  items: PricedItem[];
  type: 'Buy' | 'Sell';
}

const getItemName = (item: AnyItem): string => {
  return 'enchantedName' in item ? item.enchantedName : item.name;
};

export const ResultTable: React.FC<ResultTableProps> = ({ items, type }) => {
  const isBuy = type === 'Buy';
  const headerColor = isBuy ? 'bg-green-800/50' : 'bg-red-800/50';
  const textColor = isBuy ? 'text-green-400' : 'text-red-400';

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h4 className={`text-lg font-semibold mb-2 ${textColor}`}>{type} Matches</h4>
      <div className="overflow-x-auto max-h-64 overflow-y-auto pr-2">
        <table className="w-full text-sm text-left text-gray-300 table-fixed">
          <thead className={`text-xs text-gray-200 uppercase ${headerColor} sticky top-0`}>
            <tr>
              <th scope="col" className="p-2 w-[15%]">Base</th>
              <th scope="col" className="p-2 w-[15%]">Price1</th>
              <th scope="col" className="p-2 w-[15%]">Price2</th>
              <th scope="col" className="p-2 w-[55%]">Item</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={`${getItemName(item)}-${index}`} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="p-2">{item.baseCost}</td>
                <td className="p-2">{item.calculatedPrices[0]}</td>
                <td className="p-2">{item.calculatedPrices[1]}</td>
                <td className="p-2 break-words">{getItemName(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
