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

3.  **Define Stats**: Add it to the `get_item_limit_bonus` function.
    ```ink
    === function get_item_limit_bonus(item, stat) ===
        { item:
        ...
        - ITEMS.ring_of_intelligence:
            { stat:
            - "WIT": ~ return 2
            }
        ...
        }
    ```

4.  **Add to Inventory List**: You MUST add the item to the main `inventory` knot so it appears in the list.
    **IMPORTANT**: Use `+` (sticky choice), NOT `*`. Using `*` will make the item disappear after you look at it once.
    ```ink
    === inventory ===
        ...
        + { inv ? ITEMS.ring_of_intelligence } [{item_label(ITEMS.ring_of_intelligence)}] -> item_screen(ITEMS.ring_of_intelligence)
        ...
        + [Back] ->->
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

