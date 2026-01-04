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

// Goblin Item Counts
VAR goblin_rusty_sword_count = 1
VAR goblin_leather_armor_count = 1
VAR goblin_old_sack_count = 1
VAR goblin_small_knife_count = 1
VAR goblin_potion_of_spirit_count = 1
VAR goblin_potion_of_stupidity_count = 1

// Goblin Base Stats (for consumable effects)
VAR goblin_str_base = 4
VAR goblin_cha_base = 4
VAR goblin_wit_base = 4
VAR goblin_hp_base = 4
VAR goblin_sp_base = 4
VAR goblin_hp_cur = 4
VAR goblin_sp_cur = 0

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

// Kobold Item Counts
VAR kobold_rusty_sword_count = 1
VAR kobold_leather_armor_count = 1
VAR kobold_old_sack_count = 1
VAR kobold_small_knife_count = 1
VAR kobold_potion_of_spirit_count = 1
VAR kobold_potion_of_stupidity_count = 1

// Kobold Base Stats (for consumable effects)
VAR kobold_str_base = 4
VAR kobold_cha_base = 4
VAR kobold_wit_base = 4
VAR kobold_hp_base = 4
VAR kobold_sp_base = 4
VAR kobold_hp_cur = 4
VAR kobold_sp_cur = 0

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

=== function get_npc_item_count(npc, item) ===
    { npc:
    - NPCS.npc_goblin:
        { item:
        - ITEMS.rusty_sword: ~ return goblin_rusty_sword_count
        - ITEMS.leather_armor: ~ return goblin_leather_armor_count
        - ITEMS.old_sack: ~ return goblin_old_sack_count
        - ITEMS.small_knife: ~ return goblin_small_knife_count
        - ITEMS.potion_of_spirit: ~ return goblin_potion_of_spirit_count
        - ITEMS.potion_of_stupidity: ~ return goblin_potion_of_stupidity_count
        }
    - NPCS.npc_kobold:
        { item:
        - ITEMS.rusty_sword: ~ return kobold_rusty_sword_count
        - ITEMS.leather_armor: ~ return kobold_leather_armor_count
        - ITEMS.old_sack: ~ return kobold_old_sack_count
        - ITEMS.small_knife: ~ return kobold_small_knife_count
        - ITEMS.potion_of_spirit: ~ return kobold_potion_of_spirit_count
        - ITEMS.potion_of_stupidity: ~ return kobold_potion_of_stupidity_count
        }
    }
    ~ return 0

=== function set_npc_item_count(npc, item, count) ===
    { npc:
    - NPCS.npc_goblin:
        { item:
        - ITEMS.rusty_sword: ~ goblin_rusty_sword_count = count
        - ITEMS.leather_armor: ~ goblin_leather_armor_count = count
        - ITEMS.old_sack: ~ goblin_old_sack_count = count
        - ITEMS.small_knife: ~ goblin_small_knife_count = count
        - ITEMS.potion_of_spirit: ~ goblin_potion_of_spirit_count = count
        - ITEMS.potion_of_stupidity: ~ goblin_potion_of_stupidity_count = count
        }
    - NPCS.npc_kobold:
        { item:
        - ITEMS.rusty_sword: ~ kobold_rusty_sword_count = count
        - ITEMS.leather_armor: ~ kobold_leather_armor_count = count
        - ITEMS.old_sack: ~ kobold_old_sack_count = count
        - ITEMS.small_knife: ~ kobold_small_knife_count = count
        - ITEMS.potion_of_spirit: ~ kobold_potion_of_spirit_count = count
        - ITEMS.potion_of_stupidity: ~ kobold_potion_of_stupidity_count = count
        }
    }


=== function get_npc_stat(npc, stat) ===
    { npc:
    - NPCS.npc_goblin:
        { stat:
        - "STR": ~ return goblin_str_base
        - "CHA": ~ return goblin_cha_base
        - "WIT": ~ return goblin_wit_base
        - "HP":  ~ return goblin_hp_base
        - "SP":  ~ return goblin_sp_base
        - "HP_CUR": ~ return goblin_hp_cur
        - "SP_CUR": ~ return goblin_sp_cur
        - "REP": ~ return goblin_rep
        - else: ~ return 0
        }

    - NPCS.npc_kobold:
        { stat:
        - "STR": ~ return kobold_str_base
        - "CHA": ~ return kobold_cha_base
        - "WIT": ~ return kobold_wit_base
        - "HP":  ~ return kobold_hp_base
        - "SP":  ~ return kobold_sp_base
        - "HP_CUR": ~ return kobold_hp_cur
        - "SP_CUR": ~ return kobold_sp_cur
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

+ {npc_inv ? ITEMS.common_tunic} [Take {item_label(ITEMS.common_tunic)}]
    ~ take_item(ITEMS.common_tunic)
    ~ set_npc_inv(npc, npc_inv - ITEMS.common_tunic)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.rugged_coat} [Take {item_label(ITEMS.rugged_coat)}]
    ~ take_item(ITEMS.rugged_coat)
    ~ set_npc_inv(npc, npc_inv - ITEMS.rugged_coat)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.noble_cloak} [Take {item_label(ITEMS.noble_cloak)}]
    ~ take_item(ITEMS.noble_cloak)
    ~ set_npc_inv(npc, npc_inv - ITEMS.noble_cloak)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.common_hood} [Take {item_label(ITEMS.common_hood)}]
    ~ take_item(ITEMS.common_hood)
    ~ set_npc_inv(npc, npc_inv - ITEMS.common_hood)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.old_helmet} [Take {item_label(ITEMS.old_helmet)}]
    ~ take_item(ITEMS.old_helmet)
    ~ set_npc_inv(npc, npc_inv - ITEMS.old_helmet)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.rugged_stetson} [Take {item_label(ITEMS.rugged_stetson)}]
    ~ take_item(ITEMS.rugged_stetson)
    ~ set_npc_inv(npc, npc_inv - ITEMS.rugged_stetson)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.fancy_bycocket} [Take {item_label(ITEMS.fancy_bycocket)}]
    ~ take_item(ITEMS.fancy_bycocket)
    ~ set_npc_inv(npc, npc_inv - ITEMS.fancy_bycocket)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.headband_of_intellect} [Take {item_label(ITEMS.headband_of_intellect)}]
    ~ take_item(ITEMS.headband_of_intellect)
    ~ set_npc_inv(npc, npc_inv - ITEMS.headband_of_intellect)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.shimmering_pendant} [Take {item_label(ITEMS.shimmering_pendant)}]
    ~ take_item(ITEMS.shimmering_pendant)
    ~ set_npc_inv(npc, npc_inv - ITEMS.shimmering_pendant)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.fine_silver_chain} [Take {item_label(ITEMS.fine_silver_chain)}]
    ~ take_item(ITEMS.fine_silver_chain)
    ~ set_npc_inv(npc, npc_inv - ITEMS.fine_silver_chain)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.collar} [Take {item_label(ITEMS.collar)}]
    ~ take_item(ITEMS.collar)
    ~ set_npc_inv(npc, npc_inv - ITEMS.collar)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.leash} [Take {item_label(ITEMS.leash)}]
    ~ take_item(ITEMS.leash)
    ~ set_npc_inv(npc, npc_inv - ITEMS.leash)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.pocketwatch} [Take {item_label(ITEMS.pocketwatch)}]
    ~ take_item(ITEMS.pocketwatch)
    ~ set_npc_inv(npc, npc_inv - ITEMS.pocketwatch)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.chainmail_bikini} [Take {item_label(ITEMS.chainmail_bikini)}]
    ~ take_item(ITEMS.chainmail_bikini)
    ~ set_npc_inv(npc, npc_inv - ITEMS.chainmail_bikini)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.steel_breastplate} [Take {item_label(ITEMS.steel_breastplate)}]
    ~ take_item(ITEMS.steel_breastplate)
    ~ set_npc_inv(npc, npc_inv - ITEMS.steel_breastplate)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.gauntlets} [Take {item_label(ITEMS.gauntlets)}]
    ~ take_item(ITEMS.gauntlets)
    ~ set_npc_inv(npc, npc_inv - ITEMS.gauntlets)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.oversized_warhammer} [Take {item_label(ITEMS.oversized_warhammer)}]
    ~ take_item(ITEMS.oversized_warhammer)
    ~ set_npc_inv(npc, npc_inv - ITEMS.oversized_warhammer)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.simple_pendulum} [Take {item_label(ITEMS.simple_pendulum)}]
    ~ take_item(ITEMS.simple_pendulum)
    ~ set_npc_inv(npc, npc_inv - ITEMS.simple_pendulum)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.longsword} [Take {item_label(ITEMS.longsword)}]
    ~ take_item(ITEMS.longsword)
    ~ set_npc_inv(npc, npc_inv - ITEMS.longsword)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.scythe} [Take {item_label(ITEMS.scythe)}]
    ~ take_item(ITEMS.scythe)
    ~ set_npc_inv(npc, npc_inv - ITEMS.scythe)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.ribbon_wand} [Take {item_label(ITEMS.ribbon_wand)}]
    ~ take_item(ITEMS.ribbon_wand)
    ~ set_npc_inv(npc, npc_inv - ITEMS.ribbon_wand)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.spinnable_spiral} [Take {item_label(ITEMS.spinnable_spiral)}]
    ~ take_item(ITEMS.spinnable_spiral)
    ~ set_npc_inv(npc, npc_inv - ITEMS.spinnable_spiral)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.ring_of_power} [Take {item_label(ITEMS.ring_of_power)}]
    ~ take_item(ITEMS.ring_of_power)
    ~ set_npc_inv(npc, npc_inv - ITEMS.ring_of_power)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.ring_of_intellect} [Take {item_label(ITEMS.ring_of_intellect)}]
    ~ take_item(ITEMS.ring_of_intellect)
    ~ set_npc_inv(npc, npc_inv - ITEMS.ring_of_intellect)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.ring_of_influence} [Take {item_label(ITEMS.ring_of_influence)}]
    ~ take_item(ITEMS.ring_of_influence)
    ~ set_npc_inv(npc, npc_inv - ITEMS.ring_of_influence)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.ring_of_health} [Take {item_label(ITEMS.ring_of_health)}]
    ~ take_item(ITEMS.ring_of_health)
    ~ set_npc_inv(npc, npc_inv - ITEMS.ring_of_health)
    -> loot_npc(npc)

+ {npc_inv ? ITEMS.ring_of_restraint} [Take {item_label(ITEMS.ring_of_restraint)}]
    ~ take_item(ITEMS.ring_of_restraint)
    ~ set_npc_inv(npc, npc_inv - ITEMS.ring_of_restraint)
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
    // Decrement player count
    ~ temp current = get_item_count(item)
    ~ set_item_count(item, current - 1)
    
    // Remove from player inv list only if ran out
    { get_item_count(item) <= 0:
        ~ inv -= item
    }

    // Add to NPC
    ~ temp npc_cur = get_npc_item_count(npc, item)
    ~ set_npc_item_count(npc, item, npc_cur + 1)
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
    ~ temp npc_current = get_npc_item_count(npc, item)

    // Decrement NPC count
    ~ set_npc_item_count(npc, item, npc_current - 1)

    // If ran out
    { get_npc_item_count(npc, item) <= 0:
         ~ unequip_npc_item_if_equipped(npc, item)
         ~ set_npc_inv(npc, npc_inv - item)
    }

    // Add to player using helper to update counts
    ~ temp added = take_item(item)

=== function transfer_coins_from_companion(npc) ===
    ~ temp npc_coins = get_npc_coins(npc)
    { npc_coins > 0:
        ~ set_npc_coins(npc, 0)
        ~ coins += npc_coins
        ~ return true
    - else:
        ~ return false
    }

// --- JS Interop Wrappers ---

=== function check_can_take_item_current() ===
    ~ return check_can_take_item(current_companion)

=== function get_npc_desc_current() ===
    ~ return get_npc_desc(current_companion)

=== function get_npc_give_item_text_current() ===
    ~ return get_npc_give_item_text(current_companion)

=== function get_npc_refuse_outfit_text_current() ===
    ~ return get_npc_refuse_outfit_text(current_companion)

=== function get_npc_refuse_item_text_current() ===
    ~ return get_npc_refuse_item_text(current_companion)

=== function get_npc_stat_current(stat) ===
    ~ return get_npc_stat(current_companion, stat)

=== function get_npc_coins_current() ===
    ~ return get_npc_coins(current_companion)

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

=== function transfer_coins_from_companion_current() ===
    ~ return transfer_coins_from_companion(current_companion)

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

// --- NPC Interaction Logic ---

// Helper to look up item from name (Reused pattern)
=== function get_item_from_name(name) ===
    { name:
        - "rusty_sword": ~ return ITEMS.rusty_sword
        - "leather_armor": ~ return ITEMS.leather_armor
        - "old_sack": ~ return ITEMS.old_sack
        - "small_knife": ~ return ITEMS.small_knife
        - "potion_of_spirit": ~ return ITEMS.potion_of_spirit
        - "potion_of_stupidity": ~ return ITEMS.potion_of_stupidity
        - "common_tunic": ~ return ITEMS.common_tunic
        - "rugged_coat": ~ return ITEMS.rugged_coat
        - "noble_cloak": ~ return ITEMS.noble_cloak
        - "common_hood": ~ return ITEMS.common_hood
        - "old_helmet": ~ return ITEMS.old_helmet
        - "rugged_stetson": ~ return ITEMS.rugged_stetson
        - "fancy_bycocket": ~ return ITEMS.fancy_bycocket
        - "headband_of_intellect": ~ return ITEMS.headband_of_intellect
        - "shimmering_pendant": ~ return ITEMS.shimmering_pendant
        - "fine_silver_chain": ~ return ITEMS.fine_silver_chain
        - "collar": ~ return ITEMS.collar
        - "leash": ~ return ITEMS.leash
        - "pocketwatch": ~ return ITEMS.pocketwatch
        - "chainmail_bikini": ~ return ITEMS.chainmail_bikini
        - "steel_breastplate": ~ return ITEMS.steel_breastplate
        - "gauntlets": ~ return ITEMS.gauntlets
        - "oversized_warhammer": ~ return ITEMS.oversized_warhammer
        - "simple_pendulum": ~ return ITEMS.simple_pendulum
        - "longsword": ~ return ITEMS.longsword
        - "scythe": ~ return ITEMS.scythe
        - "ribbon_wand": ~ return ITEMS.ribbon_wand
        - "spinnable_spiral": ~ return ITEMS.spinnable_spiral
        - "ring_of_power": ~ return ITEMS.ring_of_power
        - "ring_of_intellect": ~ return ITEMS.ring_of_intellect
        - "ring_of_influence": ~ return ITEMS.ring_of_influence
        - "ring_of_health": ~ return ITEMS.ring_of_health
        - "ring_of_restraint": ~ return ITEMS.ring_of_restraint
        - else: ~ return ITEMS.none
    }

=== function equip_npc_item_current(slot, item_name) ===
    ~ temp item = get_item_from_name(item_name)
    { item != ITEMS.none:
        // Use slot to determine variable to set for current companion
        { current_companion:
            - NPCS.npc_goblin:
                { slot:
                    - "weapon": ~ goblin_eq_weapon = item
                    - "armor": ~ goblin_eq_armor = item
                    - "outfit": ~ goblin_eq_outfit = item
                    - "hat": ~ goblin_eq_hat = item
                    - "necklace": ~ goblin_eq_necklace = item
                    - "ring": ~ goblin_eq_ring = item
                }
            - NPCS.npc_kobold:
                { slot:
                    - "weapon": ~ kobold_eq_weapon = item
                    - "armor": ~ kobold_eq_armor = item
                    - "outfit": ~ kobold_eq_outfit = item
                    - "hat": ~ kobold_eq_hat = item
                    - "necklace": ~ kobold_eq_necklace = item
                    - "ring": ~ kobold_eq_ring = item
                }
        }
    }

=== function unequip_npc_item_current(slot) ===
    { current_companion:
        - NPCS.npc_goblin:
            { slot:
                - "weapon": ~ goblin_eq_weapon = ITEMS.none
                - "armor": ~ goblin_eq_armor = ITEMS.none
                - "outfit": ~ goblin_eq_outfit = ITEMS.none
                - "hat": ~ goblin_eq_hat = ITEMS.none
                - "necklace": ~ goblin_eq_necklace = ITEMS.none
                - "ring": ~ goblin_eq_ring = ITEMS.none
            }
        - NPCS.npc_kobold:
            { slot:
                - "weapon": ~ kobold_eq_weapon = ITEMS.none
                - "armor": ~ kobold_eq_armor = ITEMS.none
                - "outfit": ~ kobold_eq_outfit = ITEMS.none
                - "hat": ~ kobold_eq_hat = ITEMS.none
                - "necklace": ~ kobold_eq_necklace = ITEMS.none
                - "ring": ~ kobold_eq_ring = ITEMS.none
            }
    }

=== function drop_npc_item_current(item_name) ===
    ~ temp item = get_item_from_name(item_name)
    { item != ITEMS.none:
        ~ temp cur_inv = get_npc_inv(current_companion)
        ~ temp count = get_npc_item_count(current_companion, item)

        // Decrement
        ~ set_npc_item_count(current_companion, item, count - 1)

        { get_npc_item_count(current_companion, item) <= 0:
            // Remove from inventory
            ~ set_npc_inv(current_companion, cur_inv - item)
            // Unequip if needed
            ~ unequip_npc_item_if_equipped(current_companion, item)
        }
    }

=== function use_npc_item_current(item_name) ===
    ~ temp item = get_item_from_name(item_name)
    { item != ITEMS.none:
         ~ temp cur_inv = get_npc_inv(current_companion)
         ~ temp count = get_npc_item_count(current_companion, item)
        
        // Apply consumable effects to companion stats
        ~ temp str_bonus = get_item_use_bonus(item, "STR")
        ~ temp cha_bonus = get_item_use_bonus(item, "CHA")
        ~ temp wit_bonus = get_item_use_bonus(item, "WIT")
        ~ temp hp_max_bonus = get_item_use_bonus(item, "HP_MAX")
        ~ temp hp_cur_bonus = get_item_use_bonus(item, "HP_CUR")
        ~ temp sp_max_bonus = get_item_use_bonus(item, "SP_MAX")
        ~ temp sp_cur_bonus = get_item_use_bonus(item, "SP_CUR")
        
        // Apply effects based on NPC type
        { current_companion:
        - NPCS.npc_goblin:
            ~ goblin_str_base += str_bonus
            ~ goblin_cha_base += cha_bonus
            ~ goblin_wit_base += wit_bonus
            ~ goblin_hp_base += hp_max_bonus
            ~ goblin_hp_cur += hp_cur_bonus
            ~ goblin_sp_base += sp_max_bonus
            ~ goblin_sp_cur += sp_cur_bonus
        - NPCS.npc_kobold:
            ~ kobold_str_base += str_bonus
            ~ kobold_cha_base += cha_bonus
            ~ kobold_wit_base += wit_bonus
            ~ kobold_hp_base += hp_max_bonus
            ~ kobold_hp_cur += hp_cur_bonus
            ~ kobold_sp_base += sp_max_bonus
            ~ kobold_sp_cur += sp_cur_bonus
        }
        
        // Decrement item count
        ~ set_npc_item_count(current_companion, item, count - 1)

        { get_npc_item_count(current_companion, item) <= 0:
             ~ set_npc_inv(current_companion, cur_inv - item)
        }
    }

=== function get_rep_threshold() ===
    ~ return REP_THRESHOLD_TAKE

=== function get_npc_item_count_current(item_name) ===
    ~ temp item = get_item_from_name(item_name)
    { item != ITEMS.none:
         ~ return get_npc_item_count(current_companion, item)
    - else:
         ~ return 0
    }
