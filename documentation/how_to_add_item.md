# How to Add a New Item (e.g., Ring of Intelligence)

Here is the step-by-step process to add a new item to the game.

## 1. Update Ink Logic (`ink/systems/inventory.ink`)

1.  **Define the Item**: Add the internal name to the `ITEMS` list.
    ```ink
    LIST ITEMS = ..., ring_of_intelligence
    ```

2.  **Define the Slot**: Add it to the `get_item_slot` function.
    ```ink
    === function get_item_slot(item) ===
        { item:
        ...
        - ITEMS.ring_of_intelligence:
            ~ return "ring"
        ...
        }
    ```

3.  **Define Stats**: 
    - For **Equipment** (permanent bonuses while equipped), add to `get_item_limit_bonus`.
    - For **Consumables** (one-time effect), add to `get_item_use_bonus`.
    ```ink
    // Use this for armor/weapons
    === function get_item_limit_bonus(item, stat) ===
        { item:
        - ITEMS.ring_of_intelligence:
            { stat:
            - "WIT": ~ return 2
            }
        }

    // Use this for potions/food
    === function get_item_use_bonus(item, stat) ===
        { item:
        - ITEMS.potion_of_spirit:
            { stat:
            - "SP_CUR": ~ return 2
            }
        }
    ```
    *Note: `do_use` automatically applies these bonuses to your base stats or current HP/SP.*

4.  **Add to Inventory List**: You MUST add the item to the main `inventory` knot.
    ```ink
    === inventory ===
        ...
        + { inv ? ITEMS.ring_of_intelligence } [{item_label(ITEMS.ring_of_intelligence)}] -> item_screen(ITEMS.ring_of_intelligence)
        + { inv ? ITEMS.potion_of_spirit } [{item_label(ITEMS.potion_of_spirit)}] -> item_screen(ITEMS.potion_of_spirit)
        ...
    ```

5.  **Define Label**: Add the display name in `item_label` (used inside Ink text).
    ```ink
    === function item_label(item) ===
        { item:
        ...
        - ITEMS.ring_of_intelligence:
            ~ return "Ring of Intelligence"
        ...
        }
    ```

6.  **Update Generic Looting**: Add the item as a choice in the `loot_npc` knot in `ink/systems/npcs.ink`.
    ```ink
    + {npc_inv ? ITEMS.ring_of_intelligence} [Take {item_label(ITEMS.ring_of_intelligence)}]
        ~ take_item(ITEMS.ring_of_intelligence)
        ~ set_npc_inv(npc, npc_inv - ITEMS.ring_of_intelligence)
        -> loot_npc(npc)
    ```

## 2. Update Frontend (`app/page.tsx`)

1.  **Pretty Name**: Add the mapping to `ITEM_NAMES` so it looks good in the sidebar.
    ```typescript
    const ITEM_NAMES: Record<string, string> = {
      ...
      ring_of_intelligence: "Ring of Intelligence",
    };
    ```

## 3. Verify
-   Recompile your Ink story: `.\inklecate.exe -o public/story.json ink/story.ink`
-   Run the game and test!

