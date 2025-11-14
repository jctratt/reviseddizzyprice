
export interface Item {
  name: string;
  description: string;
  probability: number;
  baseCost: number;
}

export interface EnchantedItem extends Item {
  enchantment: number;
  enchantedName: string;
}

export type AnyItem = Item | EnchantedItem;

export type PricedItem = AnyItem & {
  calculatedPrices: number[];
};

export const CATEGORY_MAP: Record<string, string> = {
  amulet: "amulets",
  armor: "armor",
  book: "spellbooks",
  "gray-stone": "stones",
  potion: "potions",
  ring: "rings",
  scroll: "scrolls",
  tool: "tools",
  wand: "wands",
  weapon: "weapons",
};

export const CATEGORIES = [
  "amulet",
  "armor",
  "book",
  "potion",
  "ring",
  "scroll",
  "tool",
  "wand",
  "weapon",
  "gray-stone",
] as const;

export type Category = typeof CATEGORIES[number];

export interface Settings {
    charisma: number;
    isTourist: boolean;
    hasDunceCap: boolean;
}
