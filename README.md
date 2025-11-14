# dizzyprice - NetHack Price Identification Calculator

A modern, standalone web application to identify items in the game NetHack based on their shop prices.

This project is a port of the original `dizzyprice.py` tool written by Aubrey Raech. It has been ported to TypeScript and React to provide a fast, responsive, and easy-to-use interface that runs entirely in your browser.

## Background

A little while back, [NetHack](http://nethack.org/) finally released version 3.6.0, after more than 10 years with no updates. As a part of this release, the C source calculating the prices of items in shops changed slightly, resulting in all existing Price ID calculators online to cease to function. The original dizzyprice was created to fill this need. This project modernizes it.

## Features

*   **Instant Price Identification:** Enter a price in a category's input box to see all possible matching items for both buying (green) and selling (red).
*   **All Categories:** Covers all major item categories: amulets, armor, books, potions, rings, scrolls, tools, wands, weapons, and gray stones.
*   **Character Modifiers:** Easily adjust your character's charisma with +/- buttons, and toggle statuses like "Tourist" or "wearing a Dunce Cap" to see how they affect prices.
*   **Persistent Charisma:** Your charisma setting is automatically saved in your browser's local storage, so you don't have to set it every time.
*   **Responsive Design:** The layout adjusts to work great on both desktop and mobile devices.
*   **No Server Needed:** The entire application runs client-side, making it fast and available offline once loaded.

## How to Use

1.  **Set Your Charisma:** Use the `+` and `-` buttons to set your character's charisma stat.
2.  **Set Status:** Check the "Tourist" or "Dunce Cap" boxes if they apply to your character.
3.  **Enter Prices:** For any item category, type the price you see in the shop into the corresponding input box.
4.  **View Matches:** The tables below the input box will instantly update to show all items that could match that price, separated into "Buy" and "Sell" lists.

## Credits and License

This project is a port of the original `dizzyprice.py` created by Aubrey Raech. The core price calculation logic and item data are based on their work.

The original program is licensed under the Affero GPLv3+. In keeping with the original license, this web application is also licensed under the AGPLv3. The full license text is available in the `LICENSE` file.
