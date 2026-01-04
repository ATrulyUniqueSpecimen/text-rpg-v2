// systems/npcs.ink
// Requires: inventory.ink

LIST NPCS = (npc_none), npc_goblin, npc_kobold

VAR goblin_inv = (rusty_sword, leather_armor, old_sack, small_knife, potion_of_spirit, potion_of_stupidity)
VAR goblin_coins = 5
VAR kobold_inv = (rusty_sword, leather_armor, old_sack, small_knife, potion_of_spirit, potion_of_stupidity)
VAR kobold_coins = 5

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

    - NPCS.npc_kobold:
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
    - NPCS.npc_kobold: ~ return kobold_inv
    - else: ~ return ()
    }

=== function get_npc_coins(npc) ===
    { npc:
    - NPCS.npc_goblin: ~ return goblin_coins
    - NPCS.npc_kobold: ~ return kobold_coins
    - else: ~ return 0
    }

=== function set_npc_inv(npc, new_inv) ===
    { npc:
    - NPCS.npc_goblin: ~ goblin_inv = new_inv
    - NPCS.npc_kobold: ~ kobold_inv = new_inv
    }

=== function set_npc_coins(npc, new_coins) ===
    { npc:
    - NPCS.npc_goblin: ~ goblin_coins = new_coins
    - NPCS.npc_kobold: ~ kobold_coins = new_coins
    }

=== loot_npc(npc) ===
~ temp npc_inv = get_npc_inv(npc)
~ temp npc_coins = get_npc_coins(npc)

+ {npc_coins > 0} [Take {npc_coins} coins]
    ~ coins += npc_coins
    ~ set_npc_coins(npc, 0)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.rusty_sword} [Take {item_label(ITEMS.rusty_sword)}]
    ~ take_item(ITEMS.rusty_sword)
    ~ set_npc_inv(npc, npc_inv - ITEMS.rusty_sword)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.leather_armor} [Take {item_label(ITEMS.leather_armor)}]
    ~ take_item(ITEMS.leather_armor)
    ~ set_npc_inv(npc, npc_inv - ITEMS.leather_armor)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.old_sack} [Take {item_label(ITEMS.old_sack)}]
    ~ take_item(ITEMS.old_sack)
    ~ set_npc_inv(npc, npc_inv - ITEMS.old_sack)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.small_knife} [Take {item_label(ITEMS.small_knife)}]
    ~ take_item(ITEMS.small_knife)
    ~ set_npc_inv(npc, npc_inv - ITEMS.small_knife)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.potion_of_spirit} [Take {item_label(ITEMS.potion_of_spirit)}]
    ~ take_item(ITEMS.potion_of_spirit)
    ~ set_npc_inv(npc, npc_inv - ITEMS.potion_of_spirit)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.potion_of_stupidity} [Take {item_label(ITEMS.potion_of_stupidity)}]
    ~ take_item(ITEMS.potion_of_stupidity)
    ~ set_npc_inv(npc, npc_inv - ITEMS.potion_of_stupidity)
    -> loot_npc(npc)

+ [Leave]
    ->->
