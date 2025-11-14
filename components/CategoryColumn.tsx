import React, { useMemo } from 'react';
import { ResultTable } from './UI';
import type { Category, Settings, AnyItem, PricedItem } from '../types';
import { ALL_ITEM_DATA } from '../data/objects';
import { CATEGORY_MAP } from '../types';
import { getBuyModifiers, getSellModifiers, calculatePrices, expandEnchantments } from '../services/priceCalculator';

interface CategoryColumnProps {
  category: Category;
  price: string;
  onPriceChange: (category: Category, value: string) => void;
  settings: Settings;
}

const CategoryColumn: React.FC<CategoryColumnProps> = ({ category, price, onPriceChange, settings }) => {
  const dataKey = CATEGORY_MAP[category];
  const rawItems = ALL_ITEM_DATA[dataKey] || [];

  const items = useMemo(() => {
    if (category === 'armor' || category === 'weapon') {
      return expandEnchantments(rawItems);
    }
    return rawItems;
  }, [category, rawItems]);

  const matches = useMemo(() => {
    const targetPrice = parseInt(price, 10);
    if (isNaN(targetPrice) || price === '') {
      return { buy: [], sell: [] };
    }

    const buyModifiers = getBuyModifiers(settings.charisma, settings.isTourist, settings.hasDunceCap);
    const sellModifiers = getSellModifiers(settings.isTourist, settings.hasDunceCap);
    
    const buyMatches: PricedItem[] = [];
    const sellMatches: PricedItem[] = [];
    
    items.forEach((item: AnyItem) => {
      const buyPrices = calculatePrices(item.baseCost, buyModifiers);
      if (buyPrices.includes(targetPrice)) {
        buyMatches.push({ ...item, calculatedPrices: buyPrices });
      }

      const sellPrices = calculatePrices(item.baseCost, sellModifiers);
      if (sellPrices.includes(targetPrice)) {
        sellMatches.push({ ...item, calculatedPrices: sellPrices });
      }
    });

    return { buy: buyMatches, sell: sellMatches };
  }, [price, items, settings]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col">
      <h3 className="text-xl font-bold mb-3 text-cyan-400 capitalize">{category.replace('-', ' ')}</h3>
      <input
        type="number"
        value={price}
        onChange={(e) => onPriceChange(category, e.target.value)}
        placeholder="Enter price..."
        className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
      />
      <div className="flex-grow">
        <ResultTable items={matches.buy} type="Buy" />
        <ResultTable items={matches.sell} type="Sell" />
      </div>
    </div>
  );
};

export default React.memo(CategoryColumn);