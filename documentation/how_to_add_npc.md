# How to Add a New NPC

This guide covers all the steps required to add a new loot-able NPC to the game.

## 1. Update NPC System (`ink/systems/npcs.ink`)

1.  **Add to LIST**: Add the NPC's internal name to the `NPCS` list.
    ```ink
    LIST NPCS = (npc_none), npc_goblin, npc_kobold, npc_bandit
    ```

2.  **Declare Variables**: Add global variables for inventory, coins, and equipment.
    ```ink
    VAR bandit_inv = (rusty_sword, leather_armor)
    VAR bandit_coins = 10
    VAR bandit_eq_weapon = ITEMS.rusty_sword
    VAR bandit_eq_armor = ITEMS.leather_armor
    VAR bandit_eq_outfit = ITEMS.none
    VAR bandit_eq_hat = ITEMS.none
    VAR bandit_eq_necklace = ITEMS.none
    VAR bandit_eq_ring = ITEMS.none
    ```

3.  **Update `get_npc_name`**: Add a case for the NPC's display name.
    ```ink
    - NPCS.npc_bandit: ~ return "Bandit"
    ```

4.  **Update `get_npc_gender`**: Add a case for the NPC's gender ("male", "female", or "other").
    ```ink
    - NPCS.npc_bandit: ~ return "male"
    ```

5.  **Update `get_npc_stat`**: Add a case for the new NPC's stats.
    ```ink
    - NPCS.npc_bandit:
        { stat:
        - "STR": ~ return 5
        - "CHA": ~ return 3
        - "WIT": ~ return 4
        - "SP":  ~ return 4
        - else: ~ return 0
        }
    ```

6.  **Update `get_npc_inv`**: Add a case to return the NPC's inventory.
    ```ink
    - NPCS.npc_bandit: ~ return bandit_inv
    ```

7.  **Update `get_npc_coins`**: Add a case to return the NPC's coins.
    ```ink
    - NPCS.npc_bandit: ~ return bandit_coins
    ```

8.  **Update Equipment Getters**: Update `get_npc_eq_weapon`, `get_npc_eq_armor`, etc.
    ```ink
    === function get_npc_eq_weapon(npc) ===
        { npc:
        ...
        - NPCS.npc_bandit: ~ return bandit_eq_weapon
        ...
        }
    ```

9.  **Update Setters**: Update `set_npc_inv` and `set_npc_coins`.

## 2. Create the Encounter Scene (`ink/scenes/[npc]_encounter.ink`)

1.  **Create a new file**: Copy an existing encounter (e.g., `goblin_encounter(test).ink`) as a template.

2.  **Rename knots**: Update all knot names to be unique.

3.  **Recruitment**: To allow recruiting the NPC, use `recruit_companion(NPCS.npc_bandit)`.

4.  **Looting**: Use `-> loot_npc(NPCS.npc_bandit) ->`.

## 3. Include in Main Story (`ink/story.ink`)

1.  **INCLUDE the scene file**:
    ```ink
    INCLUDE scenes/bandit_encounter.ink
    ```

2.  **Call the starting knot**.

## 4. Frontend Updates (`app/page.tsx`)

> [!IMPORTANT]
> Because properties like `NPC_NAMES` and `NPC_GENDERS` are duplicated in the frontend for performance/sync reasons, you must update `app/page.tsx` when adding a new NPC.
> Look for the `syncSidebar` function (or search for `NPC_NAMES`) and add the new NPC to the lookup maps.

## 5. Verify

-   Recompile your Ink story: `.\inklecate.exe -o public/story.json ink/story.ink`
-   Run the game and test.

## Quick Checklist

When adding a new NPC, you must update these locations in `npcs.ink`:

| Location            | What to Add                                      |
| :------------------ | :----------------------------------------------- |
| `LIST NPCS`         | `npc_[name]`                                     |
| `VAR [name]_inv`    | Inventory variable                               |
| `VAR [name]_coins`  | Coins variable                                   |
| `VAR [name]_eq_...` | 6 Equipment slot variables                       |
| `get_npc_name`      | Display name                                     |
| `get_npc_gender`    | Gender                                           |
| `get_npc_stat`      | Stats                                            |
| `get_npc_inv`       | Inventory getter                                 |
| `get_npc_coins`     | Coins getter                                     |
| `get_npc_eq_...`    | 6 Equipment getters                              |
| `set_npc_inv`       | Inventory setter                                 |
| `set_npc_coins`     | Coins setter                                     |

    ```ink
    - NPCS.npc_bandit:
        { stat:
        - "STR": ~ return 5
        - "CHA": ~ return 3
        - "WIT": ~ return 4
        - "SP":  ~ return 4
        - "REP": ~ return 5  // Starting Reputation
        - else: ~ return 0
        }
    ```

    **Also define `get_npc_desc`:**
    ```ink
    === function get_npc_desc(npc) ===
        { npc:
        - NPCS.npc_bandit: ~ return "A scrappy fighter with a mean look."
        ...
        }
    ```

    **And Flavor Text:**
    *   `get_npc_refuse_outfit_text(npc)`
    *   `get_npc_give_item_text(npc)` (Success taking item)
    *   `get_npc_refuse_item_text(npc)` (Failure taking item)

5.  **Update `get_npc_inv`**: Add a case to return the NPC's inventory.
    ```ink
    - NPCS.npc_bandit: ~ return bandit_inv
    ```

6.  **Update `get_npc_coins`**: Add a case to return the NPC's coins.
    ```ink
    - NPCS.npc_bandit: ~ return bandit_coins
    ```

7.  **Update `set_npc_inv`**: Add a case to set the NPC's inventory.
    ```ink
    - NPCS.npc_bandit: ~ bandit_inv = new_inv
    ```

8.  **Update `set_npc_coins`**: Add a case to set the NPC's coins.
    ```ink
    - NPCS.npc_bandit: ~ bandit_coins = new_coins
    ```

## 2. Create the Encounter Scene (`ink/scenes/[npc]_encounter.ink`)

1.  **Create a new file**: Copy an existing encounter (e.g., `goblin_encounter(test).ink`) as a template.

2.  **Rename knots**: Update all knot names to be unique (e.g., `find_bandit`, `attack_bandit`, `loot_bandit`, `after_bandit`).

3.  **Update loot call**: Ensure the loot knot calls the generic looting system with the correct NPC.
    ```ink
    === loot_bandit ===
    -> loot_npc(NPCS.npc_bandit) ->
    -> after_bandit
    ```

4.  **Update skill checks**: Adjust any DCs or stat checks as needed for the encounter's difficulty.

## 3. Include in Main Story (`ink/story.ink`)

1.  **INCLUDE the scene file**:
    ```ink
    INCLUDE scenes/bandit_encounter.ink
    ```

2.  **Call the starting knot** (wherever appropriate in your story flow):
    ```ink
    -> find_bandit ->
    ```

## 4. Verify

-   Recompile your Ink story: `.\inklecate.exe -o public/story.json ink/story.ink`
-   Run the game and test the encounter, looting, and skill checks.

## Quick Checklist

When adding a new NPC, you must update these locations in `npcs.ink`:

| Location            | What to Add                                      |
| :------------------ | :----------------------------------------------- |
| `LIST NPCS`         | `npc_[name]`                                     |
| `VAR [name]_inv`    | New global variable for inventory                |
| `VAR [name]_coins`  | New global variable for coins                    |
| `get_npc_stat`      | New case returning stats                         |
| `get_npc_inv`       | New case returning `[name]_inv`                  |
| `get_npc_coins`     | New case returning `[name]_coins`                |
| `set_npc_inv`       | New case setting `[name]_inv`                    |
| `set_npc_coins`     | New case setting `[name]_coins`                  |
