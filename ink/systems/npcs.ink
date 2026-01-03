// systems/npcs.ink
// Requires: inventory.ink

LIST NPCS = (npc_none), npc_goblin

VAR goblin_inv = (rusty_sword, leather_armor, old_sack, small_knife, potion_of_spirit, potion_of_stupidity)
VAR goblin_coins = 5

=== function get_npc_stat(npc, stat) ===
    { npc:
    - NPCS.npc_goblin:
        { stat:
        - "STR": ~ return 4
        - "CHA": ~ return 4
        - "WIT": ~ return 4
        - "SP":  ~ return 4
        - else: ~ return 0
        }
    - else:
        ~ return 0
    }

=== function get_npc_inv(npc) ===
    { npc:
    - NPCS.npc_goblin: ~ return goblin_inv
    - else: ~ return ()
    }

=== function get_npc_coins(npc) ===
    { npc:
    - NPCS.npc_goblin: ~ return goblin_coins
    - else: ~ return 0
    }
