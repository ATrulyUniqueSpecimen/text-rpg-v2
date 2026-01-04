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

6.  **Define Gold Value**: Add the item's sell value in `get_item_value`.
    ```ink
    === function get_item_value(item) ===
        { item:
        ...
        - ITEMS.ring_of_intelligence: ~ return 25
        ...
        }
    ```

7.  **Add Count Variable**: Add a global variable for the item count (for duplicate support).
    ```ink
    VAR ring_of_intelligence_count = 0
    ```

8.  **Update `get_item_count`**: Add a case to return the count.
    ```ink
    - ITEMS.ring_of_intelligence: ~ return ring_of_intelligence_count
    ```

9.  **Update `set_item_count`**: Add a case to set the count.
    ```ink
    - ITEMS.ring_of_intelligence: ~ ring_of_intelligence_count = count
    ```

10. **Update Generic Looting**: Add the item as a choice in the `loot_npc` knot in `ink/systems/npcs.ink`.
    ```ink
    + {npc_inv ? ITEMS.ring_of_intelligence} [Take {item_label(ITEMS.ring_of_intelligence)}]
        ~ take_item(ITEMS.ring_of_intelligence)
        ~ set_npc_inv(npc, npc_inv - ITEMS.ring_of_intelligence)
        -> loot_npc(npc)
    ```

## 2. Update Frontend (`app/hooks/useEntityStats.ts`)

You need to update three constant objects in `app/hooks/useEntityStats.ts` to ensure the item is displayed correctly and its stats are calculated in the UI (for the stats bar preview).

1.  **Pretty Name**: Add to `ITEM_NAMES`.
    ```typescript
    const ITEM_NAMES: Record<string, string> = {
      // ...
      ring_of_intelligence: "Ring of Intelligence",
    };
    ```

2.  **Stats**: Add to `ITEM_STATS`. This is used to preview stats in the sidebar. Use the same values as your Ink logic.
    ```typescript
    const ITEM_STATS: Record<string, { STR?: number; CHA?: number; WIT?: number; HP?: number; SP?: number; REP?: number }> = {
      // ...
      ring_of_intelligence: { WIT: 2 },
    };
    ```

3.  **Slot**: Add to `ITEM_SLOTS`. This determines where the item appears in the equipment list (e.g., "ring", "weapon", "consumable").
    ```typescript
    export const ITEM_SLOTS: Record<string, string> = {
      // ...
      ring_of_intelligence: "ring",
    };
    ```

## 3. Verify
-   Recompile your Ink story: `.\inklecate.exe -o public/story.json ink/story.ink`
-   Run the game and test!

