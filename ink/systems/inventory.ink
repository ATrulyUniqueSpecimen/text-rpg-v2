// ALL INVENTORY ITEMS MUST BE HERE
LIST ITEMS = rusty_sword, leather_armor, old_sack, none
VAR inv = ()

VAR eq_weapon = ITEMS.none
VAR eq_armor = ITEMS.none
VAR eq_outfit = ITEMS.none
VAR eq_hat = ITEMS.none
VAR eq_necklace = ITEMS.none
VAR eq_ring = ITEMS.none

// Helper: Get the equipment slot for an item
=== function get_item_slot(item) ===
    { item:
    - ITEMS.rusty_sword:
        ~ return "weapon"
    - ITEMS.leather_armor:
        ~ return "armor"
    - ITEMS.old_sack:
        ~ return "outfit"
    - else:
        ~ return "none"
    }

// Helper: Get the bonus for a specific stat from an item
=== function get_item_limit_bonus(item, stat) ===
    // Define item stats here
    { item:
    - ITEMS.rusty_sword:
        { stat == "STR":
             ~ return 2
        }
    - ITEMS.leather_armor:
        { stat == "STR":
             ~ return 4
        }
    - ITEMS.old_sack:
        { stat == "CHA":
             ~ return -1
        }
    }
    ~ return 0

=== function item_label(item) ===
    { item:
    - ITEMS.rusty_sword:
        ~ return "Rusty sword"
    - ITEMS.leather_armor:
        ~ return "Leather armor"
    - ITEMS.old_sack:
        ~ return "Old sack"
    - else:
        ~ return "{item}"
    }

=== inventory ===
You check what you're carrying.
// Iterate over all items in the inventory
// Note: Ink lists are sets. We check availability.
    * { inv ? ITEMS.rusty_sword } [{item_label(ITEMS.rusty_sword)}] -> item_screen(ITEMS.rusty_sword)
    * { inv ? ITEMS.leather_armor } [{item_label(ITEMS.leather_armor)}] -> item_screen(ITEMS.leather_armor)
    * { inv ? ITEMS.old_sack } [{item_label(ITEMS.old_sack)}] -> item_screen(ITEMS.old_sack)
    * [Back] ->->

// Generic Item Screen
=== item_screen(item) ===
~ temp slot = get_item_slot(item)
You look at your {item_label(item)}.

{ slot != "none":
    It fits in the {slot} slot.
    // Display stats if any - crude check or just generic info
    ~ temp str_bonus = get_item_limit_bonus(item, "STR")
    ~ temp cha_bonus = get_item_limit_bonus(item, "CHA")
    { str_bonus != 0: (STR {str_bonus}) }
    { cha_bonus != 0: (CHA {cha_bonus}) }
- else:
    It's not equippable.
}

{ slot == "weapon":
    { eq_weapon == item:
        It's currently equipped.
        * [Unequip] -> do_unequip_weapon(item)
    - else:
        * [Equip] -> do_equip_weapon(item)
    }
}

{ slot == "armor":
    { eq_armor == item:
        It's currently equipped.
        * [Unequip] -> do_unequip_armor(item)
    - else:
        * [Equip] -> do_equip_armor(item)
    }
}
// Expand for other slots (outfit, hat, etc) as needed, keeping it simple for now as per original file scope

* [Drop] -> do_drop(item)
* [Back] ->->


=== do_equip_weapon(item) ===
~ eq_weapon = item
You equip it.
->->

=== do_unequip_weapon(item) ===
~ eq_weapon = ITEMS.none
You unequip it.
->->

=== do_equip_armor(item) ===
~ eq_armor = item
You put it on.
->->

=== do_unequip_armor(item) ===
~ eq_armor = ITEMS.none
You take it off.
->->

=== do_drop(item) ===
// Auto-unequip if dropped
{ eq_weapon == item:
    ~ eq_weapon = ITEMS.none
}
{ eq_armor == item:
    ~ eq_armor = ITEMS.none
}
// Add other slots logic here if expanded

~ inv -= item
You drop your {item_label(item)}.
->->

// Helper to add an item "safely" (handling duplicates isn't an issue with sets, but for feedback)
=== function take_item(item) ===
    ~ inv += item
    ~ return true
