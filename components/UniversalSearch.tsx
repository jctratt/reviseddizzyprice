import React, { useState, useMemo } from 'react';
import useDebounce from '../hooks/useDebounce';
import { ResultTable } from './UI';
import type { Settings, AnyItem, PricedItem, Category } from '../types';
import { ALL_ITEM_DATA } from '../data/objects';
import { CATEGORIES, CATEGORY_MAP } from '../types';
import { getBuyModifiers, getSellModifiers, calculatePrices, expandEnchantments } from '../services/priceCalculator';

interface UniversalSearchProps {
  settings: Settings;
}

const UniversalSearch: React.FC<UniversalSearchProps> = ({ settings }) => {
  const [price, setPrice] = useState('');
  const debouncedPrice = useDebounce(price, 500);

  const allItems = useMemo(() => {
    const itemsByCategory: { [key in Category]?: AnyItem[] } = {};
    CATEGORIES.forEach(category => {
      const dataKey = CATEGORY_MAP[category];
      const rawItems = ALL_ITEM_DATA[dataKey] || [];
      if (category === 'armor' || category === 'weapon') {
        itemsByCategory[category] = expandEnchantments(rawItems);
      } else {
        itemsByCategory[category] = rawItems;
      }
    });
    return itemsByCategory;
  }, []);

  const allMatches = useMemo(() => {
    const targetPrice = parseInt(debouncedPrice, 10);
    if (isNaN(targetPrice) || debouncedPrice === '') {
      return { buy: {}, sell: {} };
    }

    const buyModifiers = getBuyModifiers(settings.charisma, settings.isTourist, settings.hasDunceCap);
    const sellModifiers = getSellModifiers(settings.isTourist, settings.hasDunceCap);
    
    const buyMatches: Record<string, PricedItem[]> = {};
    const sellMatches: Record<string, PricedItem[]> = {};
    
    CATEGORIES.forEach(category => {
        const items = allItems[category] || [];
        items.forEach((item: AnyItem) => {
            const buyPrices = calculatePrices(item.baseCost, buyModifiers);
            if (buyPrices.includes(targetPrice)) {
                if (!buyMatches[category]) buyMatches[category] = [];
                buyMatches[category].push({ ...item, calculatedPrices: buyPrices });
            }

            const sellPrices = calculatePrices(item.baseCost, sellModifiers);
            if (sellPrices.includes(targetPrice)) {
                if (!sellMatches[category]) sellMatches[category] = [];
                sellMatches[category].push({ ...item, calculatedPrices: sellPrices });
            }
        });
    });

    return { buy: buyMatches, sell: sellMatches };
  }, [debouncedPrice, allItems, settings]);

  const hasBuyMatches = Object.keys(allMatches.buy).length > 0;
  const hasSellMatches = Object.keys(allMatches.sell).length > 0;
  const hasMatches = hasBuyMatches || hasSellMatches;

  return (
    <div className="mb-8">
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-3 text-cyan-400">Universal Search</h2>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter any price to search all categories..."
          className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-lg"
          aria-label="Universal price search"
        />
      </div>

      {debouncedPrice !== '' && (
        <div className="mt-6">
            {!hasMatches ? (
                 <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center text-gray-400">
                    No matches found for this price.
                 </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        {hasBuyMatches && Object.entries(allMatches.buy).map(([category, items]) => (
                            <div key={category} className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
                                <h3 className="text-xl font-bold mb-1 text-cyan-400 capitalize">{category.replace('-', ' ')}</h3>
                                <ResultTable items={items} type="Buy" />
                            </div>
                        ))}
                    </div>
                    <div>
                         {hasSellMatches && Object.entries(allMatches.sell).map(([category, items]) => (
                            <div key={category} className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
                                <h3 className="text-xl font-bold mb-1 text-cyan-400 capitalize">{category.replace('-', ' ')}</h3>
                                <ResultTable items={items} type="Sell" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default UniversalSearch;