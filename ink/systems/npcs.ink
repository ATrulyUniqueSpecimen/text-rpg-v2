// systems/npcs.ink
// Requires: inventory.ink

LIST NPCS = (npc_none), npc_goblin, npc_kobold

// Current companion (only one at a time)
VAR current_companion = NPCS.npc_none

// Goblin data
VAR goblin_rep = 10
VAR goblin_inv = (rusty_sword, leather_armor, old_sack, small_knife, potion_of_spirit, potion_of_stupidity)
VAR goblin_coins = 5
VAR goblin_eq_weapon = ITEMS.rusty_sword
VAR goblin_eq_armor = ITEMS.none
VAR goblin_eq_outfit = ITEMS.old_sack
VAR goblin_eq_hat = ITEMS.none
VAR goblin_eq_necklace = ITEMS.none
VAR goblin_eq_ring = ITEMS.none

// Kobold data
VAR kobold_rep = 10
VAR kobold_inv = (rusty_sword, leather_armor, old_sack, small_knife, potion_of_spirit, potion_of_stupidity)
VAR kobold_coins = 5
VAR kobold_eq_weapon = ITEMS.none
VAR kobold_eq_armor = ITEMS.none
VAR kobold_eq_outfit = ITEMS.none
VAR kobold_eq_hat = ITEMS.none
VAR kobold_eq_necklace = ITEMS.none
VAR kobold_eq_ring = ITEMS.none

// NPC Names
=== function get_npc_name(npc) ===
    { npc:
    - NPCS.npc_goblin: ~ return "Goblin"
    - NPCS.npc_kobold: ~ return "Kobold"
    - else: ~ return "Unknown"
    }

// NPC Gender (male, female, other)
=== function get_npc_gender(npc) ===
    { npc:
    - NPCS.npc_goblin: ~ return "male"
    - NPCS.npc_kobold: ~ return "female"
    - else: ~ return "other"
    }


// Threshold for taking items (Reputation)
VAR REP_THRESHOLD_TAKE = 10

// NPC Description
=== function get_npc_desc(npc) ===
    { npc:
    - NPCS.npc_goblin: ~ return "A short, grubby humanoid with large ears and a larger personality."
    - NPCS.npc_kobold: ~ return "A small, scaled creature with quick eyes and a nervous twitch."
    - else: ~ return ""
    }

=== function get_npc_stat(npc, stat) ===
    { npc:
    - NPCS.npc_goblin:
        { stat:
        - "STR": ~ return 4
        - "CHA": ~ return 4
        - "WIT": ~ return 4
        - "SP":  ~ return 4
        - "REP": ~ return goblin_rep
        - else: ~ return 0
        }

    - NPCS.npc_kobold:
        { stat:
        - "STR": ~ return 4
        - "CHA": ~ return 4
        - "WIT": ~ return 4
        - "SP":  ~ return 4
        - "REP": ~ return kobold_rep
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

=== function get_npc_refuse_outfit_text(npc) ===
    { npc:
    - NPCS.npc_goblin: ~ return "The goblin growls at you for taking his outfit and turns around to cover himself."
    - NPCS.npc_kobold: ~ return "The kobold shrieks and covers its eyes!"
    - else: ~ return "The character looks embarrassed."
    }

=== function get_npc_give_item_text(npc) ===
    { npc:
    - NPCS.npc_goblin: ~ return "Sure, take it."
    - NPCS.npc_kobold: ~ return "Fine, fine! Just take it!"
    - else: ~ return "Here you go."
    }

=== function get_npc_refuse_item_text(npc) ===
    { npc:
    - NPCS.npc_goblin: ~ return "This is mine. You can't have it."
    - NPCS.npc_kobold: ~ return "No! Mine! You can't!"
    - else: ~ return "I can't let you have that."
    }

// ... Looting and Equipment Getters continue as before ...

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

// Equipment Getters
=== function get_npc_eq_weapon(npc) ===
    { npc:
    - NPCS.npc_goblin: ~ return goblin_eq_weapon
    - NPCS.npc_kobold: ~ return kobold_eq_weapon
    - else: ~ return ITEMS.none
    }

=== function get_npc_eq_armor(npc) ===
    { npc:
    - NPCS.npc_goblin: ~ return goblin_eq_armor
    - NPCS.npc_kobold: ~ return kobold_eq_armor
    - else: ~ return ITEMS.none
    }

=== function get_npc_eq_outfit(npc) ===
    { npc:
    - NPCS.npc_goblin: ~ return goblin_eq_outfit
    - NPCS.npc_kobold: ~ return kobold_eq_outfit
    - else: ~ return ITEMS.none
    }

=== function get_npc_eq_hat(npc) ===
    { npc:
    - NPCS.npc_goblin: ~ return goblin_eq_hat
    - NPCS.npc_kobold: ~ return kobold_eq_hat
    - else: ~ return ITEMS.none
    }

=== function get_npc_eq_necklace(npc) ===
    { npc:
    - NPCS.npc_goblin: ~ return goblin_eq_necklace
    - NPCS.npc_kobold: ~ return kobold_eq_necklace
    - else: ~ return ITEMS.none
    }

=== function get_npc_eq_ring(npc) ===
    { npc:
    - NPCS.npc_goblin: ~ return goblin_eq_ring
    - NPCS.npc_kobold: ~ return kobold_eq_ring
    - else: ~ return ITEMS.none
    }

// Companion Recruitment
=== recruit_companion(npc) ===
~ temp npc_name = get_npc_name(npc)

{ current_companion != NPCS.npc_none:
    ~ temp old_name = get_npc_name(current_companion)
    You already have {old_name} as a companion. Replace them with {npc_name}?
    + [Yes, replace companion]
        {old_name} leaves your party.
        ~ current_companion = npc
        {npc_name} joins you!
        ->->
    + [No, keep current companion]
        ->->
- else:
    {npc_name} offers to join you.
    + [Accept]
        ~ current_companion = npc
        {npc_name} joins you!
        ->->
{npc_name} nods and leaves.
        ->->
}

// Transfer Logic Logic
=== function transfer_to_companion(npc, item) ===
    ~ temp npc_inv = get_npc_inv(npc)
    // Remove from player (assuming 'inv' is global player inventory list)
    ~ inv -= item
    // Add to NPC
    ~ set_npc_inv(npc, npc_inv + item)

=== function check_can_take_item(npc) ===
     ~ temp rep = get_npc_stat(npc, "REP")
     { rep >= REP_THRESHOLD_TAKE:
        ~ return true
     - else:
        ~ return false
     }

=== function transfer_from_companion(npc, item) ===
    ~ temp npc_inv = get_npc_inv(npc)
    // Unequip from NPC if they are wearing it
    ~ unequip_npc_item_if_equipped(npc, item)
    // Remove from NPC
    ~ set_npc_inv(npc, npc_inv - item)
    // Add to player
    ~ inv += item

// --- JS Interop Wrappers ---

=== function check_can_take_item_current() ===
    ~ return check_can_take_item(current_companion)

=== function get_npc_desc_current() ===
    ~ return get_npc_desc(current_companion)

=== function get_npc_give_item_text_current() ===
    ~ return get_npc_give_item_text(current_companion)

=== function get_npc_refuse_item_text_current() ===
    ~ return get_npc_refuse_item_text(current_companion)

=== function get_npc_stat_current(stat) ===
    ~ return get_npc_stat(current_companion, stat)

=== function transfer_from_companion_by_name(item_name) ===
    // Find item by name
    ~ temp found = false
    ~ temp item_to_transfer = ITEMS.none
    
    // We scan the ITEMS list
    // Note: iterating a LIST definition requires LIST_ALL or similar, but in Ink iterating a list type variable works?
    // LIST_ALL(ITEMS) is not standard ink function but LIST_ALL(list_name) is supported in some versions?
    // standard way: loop through the list definition
    
    // Actually, simple iteration:
    // (item) in ITEMS: ...
    // But ITEMS is a definition.
    // We can use LIST_ALL(ITEMS) if supported, or just (ITEMS)
    
    // Let's assume user has inkjs which supports LIST_ALL(ITEMS) or standard list loop.
    // If not, we can't easily look up by string without a huge switch.
    
    // Alternative: The JS passes the item name as string "rusty_sword". 
    // We can just try to resolve it. But we can't cast string to item easily.
    
    // Fallback: Huge switch statement? Reliability > Elegance here.
    
    { item_name:
        - "rusty_sword": ~ item_to_transfer = ITEMS.rusty_sword
        - "leather_armor": ~ item_to_transfer = ITEMS.leather_armor
        - "old_sack": ~ item_to_transfer = ITEMS.old_sack
        - "small_knife": ~ item_to_transfer = ITEMS.small_knife
        - "potion_of_spirit": ~ item_to_transfer = ITEMS.potion_of_spirit
        - "potion_of_stupidity": ~ item_to_transfer = ITEMS.potion_of_stupidity
    }
    
    { item_to_transfer != ITEMS.none:
        ~ transfer_from_companion(current_companion, item_to_transfer)
    }

=== function transfer_to_companion_by_name(item_name) ===
     ~ temp item_to_transfer = ITEMS.none
    { item_name:
        - "rusty_sword": ~ item_to_transfer = ITEMS.rusty_sword
        - "leather_armor": ~ item_to_transfer = ITEMS.leather_armor
        - "old_sack": ~ item_to_transfer = ITEMS.old_sack
        - "small_knife": ~ item_to_transfer = ITEMS.small_knife
        - "potion_of_spirit": ~ item_to_transfer = ITEMS.potion_of_spirit
        - "potion_of_stupidity": ~ item_to_transfer = ITEMS.potion_of_stupidity
    }
    
    { item_to_transfer != ITEMS.none:
         ~ transfer_to_companion(current_companion, item_to_transfer)
    }

=== function equip_item_by_name(slot, item_name) ===
    ~ temp item_to_equip = ITEMS.none
    // Resolve item name to List Item
    // Note: Reusing the look-up logic or sharing it would be better but copy-paste is safer for now to avoid logic errors in 'function calling function'
    { item_name:
        - "rusty_sword": ~ item_to_equip = ITEMS.rusty_sword
        - "leather_armor": ~ item_to_equip = ITEMS.leather_armor
        - "old_sack": ~ item_to_equip = ITEMS.old_sack
        - "small_knife": ~ item_to_equip = ITEMS.small_knife
        - "potion_of_spirit": ~ item_to_equip = ITEMS.potion_of_spirit
        - "potion_of_stupidity": ~ item_to_equip = ITEMS.potion_of_stupidity
    }

    { item_to_equip != ITEMS.none:
        { slot:
            - "weapon":
                ~ eq_weapon = item_to_equip
            - "armor":
                ~ eq_armor = item_to_equip
            - "outfit":
                ~ eq_outfit = item_to_equip
            - "hat":
                ~ eq_hat = item_to_equip
            - "necklace":
                ~ eq_necklace = item_to_equip
            - "ring":
                ~ eq_ring = item_to_equip
        }
    }

=== function unequip_item(slot) ===
    { slot:
        - "weapon":
            ~ eq_weapon = ITEMS.none
        - "armor":
            ~ eq_armor = ITEMS.none
        - "outfit":
            ~ eq_outfit = ITEMS.none
        - "hat":
            ~ eq_hat = ITEMS.none
        - "necklace":
            ~ eq_necklace = ITEMS.none
        - "ring":
            ~ eq_ring = ITEMS.none
    }

// Helper to unequip an item from an NPC if they are wearing it
=== function unequip_npc_item_if_equipped(npc, item) ===
    { npc:
    - NPCS.npc_goblin:
        { goblin_eq_weapon == item: 
            ~ goblin_eq_weapon = ITEMS.none 
        }
        { goblin_eq_armor == item: 
            ~ goblin_eq_armor = ITEMS.none 
        }
        { goblin_eq_outfit == item: 
            ~ goblin_eq_outfit = ITEMS.none 
        }
        { goblin_eq_hat == item: 
            ~ goblin_eq_hat = ITEMS.none 
        }
        { goblin_eq_necklace == item: 
            ~ goblin_eq_necklace = ITEMS.none 
        }
        { goblin_eq_ring == item: 
            ~ goblin_eq_ring = ITEMS.none 
        }
    - NPCS.npc_kobold:
        { kobold_eq_weapon == item: 
            ~ kobold_eq_weapon = ITEMS.none 
        }
        { kobold_eq_armor == item: 
            ~ kobold_eq_armor = ITEMS.none 
        }
        { kobold_eq_outfit == item: 
            ~ kobold_eq_outfit = ITEMS.none 
        }
        { kobold_eq_hat == item: 
            ~ kobold_eq_hat = ITEMS.none 
        }
        { kobold_eq_necklace == item: 
            ~ kobold_eq_necklace = ITEMS.none 
        }
        { kobold_eq_ring == item: 
            ~ kobold_eq_ring = ITEMS.none 
        }
    }

=== function use_item_by_name(item_name) ===
    ~ temp item_to_use = ITEMS.none
    { item_name:
        - "rusty_sword": ~ item_to_use = ITEMS.rusty_sword
        - "leather_armor": ~ item_to_use = ITEMS.leather_armor
        - "old_sack": ~ item_to_use = ITEMS.old_sack
        - "small_knife": ~ item_to_use = ITEMS.small_knife
        - "potion_of_spirit": ~ item_to_use = ITEMS.potion_of_spirit
        - "potion_of_stupidity": ~ item_to_use = ITEMS.potion_of_stupidity
    }
    
    { item_to_use != ITEMS.none:
        ~ perform_use_item(item_to_use)
    }

=== function drop_item_by_name(item_name) ===
    ~ temp item_to_drop = ITEMS.none
    { item_name:
        - "rusty_sword": ~ item_to_drop = ITEMS.rusty_sword
        - "leather_armor": ~ item_to_drop = ITEMS.leather_armor
        - "old_sack": ~ item_to_drop = ITEMS.old_sack
        - "small_knife": ~ item_to_drop = ITEMS.small_knife
        - "potion_of_spirit": ~ item_to_drop = ITEMS.potion_of_spirit
        - "potion_of_stupidity": ~ item_to_drop = ITEMS.potion_of_stupidity
    }

    { item_to_drop != ITEMS.none:
         ~ temp current = get_item_count(item_to_drop)
         ~ set_item_count(item_to_drop, current - 1)
         
         // Un-equip if equipped (checking all slots)
         { eq_weapon == item_to_drop: 
            ~ eq_weapon = ITEMS.none 
         }
         { eq_armor == item_to_drop: 
            ~ eq_armor = ITEMS.none 
         }
         { eq_outfit == item_to_drop: 
            ~ eq_outfit = ITEMS.none 
         }
         { eq_hat == item_to_drop: 
            ~ eq_hat = ITEMS.none 
         }
         { eq_necklace == item_to_drop: 
            ~ eq_necklace = ITEMS.none 
         }
         { eq_ring == item_to_drop: 
            ~ eq_ring = ITEMS.none 
         }
         
         // Remove from inventory list if count <= 0
         { get_item_count(item_to_drop) <= 0:
             ~ inv -= item_to_drop
         }
    }
