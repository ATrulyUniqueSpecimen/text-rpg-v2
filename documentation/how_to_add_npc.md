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

5.  **Update `get_npc_stat`**: Add a case for the new NPC's stats, **including REP**.
    ```ink
    - NPCS.npc_bandit:
        { stat:
        - "STR": ~ return 5
        - "CHA": ~ return 3
        - "WIT": ~ return 4
        - "SP":  ~ return 4
        - "REP": ~ return 5  // Starting Reputation (Required for coin sharing)
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
    ```ink
    === function set_npc_inv(npc, new_inv) ===
        { npc:
        ...
        - NPCS.npc_bandit: ~ bandit_inv = new_inv
        ...
        }
        
    === function set_npc_coins(npc, new_coins) ===
        { npc:
        ...
        - NPCS.npc_bandit: ~ bandit_coins = new_coins
        ...
        }
    ```
    
10. **Flavor Text & Descriptions**:
    *   **Description**: Update `get_npc_desc`.
        ```ink
        - NPCS.npc_bandit: ~ return "A scrappy fighter with a mean look."
        ```
    *   **Responses**: Update `get_npc_refuse_outfit_text`, `get_npc_give_item_text`, and `get_npc_refuse_item_text` if you want custom dialogue.

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

2.  **Call the starting knot** in the story flow.

## 4. Frontend Updates (`app/hooks/useEntityStats.ts`)

> [!IMPORTANT]
> You must manually add the frontend mapping so the UI knows the NPC's Name and Gender immediately upon loading stats.

1.  Open `app/hooks/useEntityStats.ts`.
2.  Find the `syncSidebar` function.
3.  Locate the local variables `NPC_NAMES` and `NPC_GENDERS` (inside the `if (compId !== "npc_none")` block).
4.  Add your new NPC:
    ```typescript
    const NPC_NAMES: Record<string, string> = { 
        npc_goblin: "Goblin", 
        npc_kobold: "Kobold",
        npc_bandit: "Bandit" // Add this
    };
    const NPC_GENDERS: Record<string, "male" | "female" | "other"> = { 
        npc_goblin: "male", 
        npc_kobold: "female",
        npc_bandit: "male" // Add this
    };
    ```

## 5. Verify

-   Recompile your Ink story: `.\inklecate.exe -o public/story.json ink/story.ink`
-   Run the game.
-   Recruit the NPC and verify:
    -   Name and Gender appear correctly in the sidebar.
    -   Stats (including REP) are visible.
    -   Inventory and Equipment are visible.
    -   "Take Coins" button appears if they have coins and you have high enough REP.
