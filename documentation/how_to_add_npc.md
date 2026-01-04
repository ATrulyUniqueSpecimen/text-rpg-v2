# How to Add a New NPC

This guide covers all the steps required to add a new loot-able NPC to the game.

## 1. Update NPC System (`ink/systems/npcs.ink`)

1.  **Add to LIST**: Add the NPC's internal name to the `NPCS` list.
    ```ink
    LIST NPCS = (npc_none), npc_goblin, npc_kobold, npc_bandit
    ```

2.  **Declare Inventory & Coins**: Add global variables for its inventory and coins.
    ```ink
    VAR bandit_inv = (rusty_sword, leather_armor)
    VAR bandit_coins = 10
    ```

3.  **Update `get_npc_stat`**: Add a case for the new NPC's stats.
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

4.  **Update `get_npc_inv`**: Add a case to return the NPC's inventory.
    ```ink
    - NPCS.npc_bandit: ~ return bandit_inv
    ```

5.  **Update `get_npc_coins`**: Add a case to return the NPC's coins.
    ```ink
    - NPCS.npc_bandit: ~ return bandit_coins
    ```

6.  **Update `set_npc_inv`**: Add a case to set the NPC's inventory.
    ```ink
    - NPCS.npc_bandit: ~ bandit_inv = new_inv
    ```

7.  **Update `set_npc_coins`**: Add a case to set the NPC's coins.
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
