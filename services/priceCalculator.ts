
import type { Item, EnchantedItem, AnyItem } from '../types';

export const getBuyModifiers = (charisma: number, isTourist: boolean, hasDunceCap: boolean): [number, number][] => {
    let multiplier = 1, divisor = 1;

    if (isTourist || hasDunceCap) {
        multiplier *= 4;
        divisor *= 3;
    }

    if (charisma > 18) {
        divisor *= 2;
    } else if (charisma === 18) {
        multiplier *= 2;
        divisor *= 3;
    } else if (charisma >= 16) {
        multiplier *= 3;
        divisor *= 4;
    } else if (charisma <= 5) {
        multiplier *= 2;
    } else if (charisma <= 7) {
        multiplier *= 3;
        divisor *= 2;
    } else if (charisma <= 10) {
        multiplier *= 4;
        divisor *= 3;
    }

    const priceA: [number, number] = [multiplier, divisor];
    const priceB: [number, number] = [multiplier * 4, divisor * 3];
    return [priceA, priceB];
};

export const getSellModifiers = (isTourist: boolean, hasDunceCap: boolean): [number, number][] => {
    let multiplier = 1, divisor = 1;

    if (isTourist || hasDunceCap) {
        divisor *= 3;
    } else {
        divisor *= 2;
    }
    
    const offerA: [number, number] = [multiplier, divisor];
    const offerB: [number, number] = [multiplier * 3, divisor * 4]; 
    return [offerA, offerB];
};

const calculateSinglePrice = (baseCost: number, modifier: [number, number]): number => {
  const [multiplier, divisor] = modifier;
  let tmp = baseCost * multiplier;
  if (divisor > 1) {
    tmp = tmp * 10;
    tmp = Math.floor(tmp / divisor);
    tmp += 5;
    tmp = Math.floor(tmp / 10);
  }
  return Math.max(1, tmp);
};

export const calculatePrices = (baseCost: number, modifiers: [number, number][]): number[] => {
  return modifiers.map(mod => calculateSinglePrice(baseCost, mod));
};

export const expandEnchantments = (items: Item[]): AnyItem[] => {
  const expanded: AnyItem[] = [];
  items.forEach(item => {
    // Add +0 to +7 enchantments
    for (let i = 0; i <= 7; i++) {
      const enchantedName = `+${i} ${item.name}`;
      const baseCost = item.baseCost + i * 10;
      expanded.push({
        ...item,
        enchantment: i,
        enchantedName,
        baseCost,
      });
    }
  });
  return expanded;
};