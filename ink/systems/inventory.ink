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
// Iterate over all items in the inventory
// Note: Ink lists are sets. We check availability.
    + { inv ? ITEMS.rusty_sword } [{item_label(ITEMS.rusty_sword)}] -> item_screen(ITEMS.rusty_sword)
    + { inv ? ITEMS.leather_armor } [{item_label(ITEMS.leather_armor)}] -> item_screen(ITEMS.leather_armor)
    + { inv ? ITEMS.old_sack } [{item_label(ITEMS.old_sack)}] -> item_screen(ITEMS.old_sack)
    + [Back] ->->

// Generic Item Screen
=== item_screen(item) ===
~ temp slot = get_item_slot(item)
~ temp str_b = get_item_limit_bonus(item, "STR")
~ temp cha_b = get_item_limit_bonus(item, "CHA")
~ temp wit_b = get_item_limit_bonus(item, "WIT")

{ slot == "weapon":
    { eq_weapon == item:
        + [Unequip{ str_b > 0: (-{str_b} STR)}{ str_b < 0: (+{str_b * -1} STR)}{ cha_b > 0: (-{cha_b} CHA)}{ cha_b < 0: (+{cha_b * -1} CHA)}{ wit_b > 0: (-{wit_b} WIT)}{ wit_b < 0: (+{wit_b * -1} WIT)}] -> do_unequip_weapon(item)
    - else:
        + [Equip{ str_b > 0: (+{str_b} STR)}{ str_b < 0: ({str_b} STR)}{ cha_b > 0: (+{cha_b} CHA)}{ cha_b < 0: ({cha_b} CHA)}{ wit_b > 0: (+{wit_b} WIT)}{ wit_b < 0: ({wit_b} WIT)}] -> do_equip_weapon(item)
    }
}

{ slot == "armor":
    { eq_armor == item:
        + [Unequip{ str_b > 0: (-{str_b} STR)}{ str_b < 0: (+{str_b * -1} STR)}{ cha_b > 0: (-{cha_b} CHA)}{ cha_b < 0: (+{cha_b * -1} CHA)}{ wit_b > 0: (-{wit_b} WIT)}{ wit_b < 0: (+{wit_b * -1} WIT)}] -> do_unequip_armor(item)
    - else:
        + [Equip{ str_b > 0: (+{str_b} STR)}{ str_b < 0: ({str_b} STR)}{ cha_b > 0: (+{cha_b} CHA)}{ cha_b < 0: ({cha_b} CHA)}{ wit_b > 0: (+{wit_b} WIT)}{ wit_b < 0: ({wit_b} WIT)}] -> do_equip_armor(item)
    }
}

{ slot == "outfit":
    { eq_outfit == item:
        + [Unequip{ str_b > 0: (-{str_b} STR)}{ str_b < 0: (+{str_b * -1} STR)}{ cha_b > 0: (-{cha_b} CHA)}{ cha_b < 0: (+{cha_b * -1} CHA)}{ wit_b > 0: (-{wit_b} WIT)}{ wit_b < 0: (+{wit_b * -1} WIT)}] -> do_unequip_outfit(item)
    - else:
        + [Equip{ str_b > 0: (+{str_b} STR)}{ str_b < 0: ({str_b} STR)}{ cha_b > 0: (+{cha_b} CHA)}{ cha_b < 0: ({cha_b} CHA)}{ wit_b > 0: (+{wit_b} WIT)}{ wit_b < 0: ({wit_b} WIT)}] -> do_equip_outfit(item)
    }
}

{ slot == "hat":
    { eq_hat == item:
        + [Unequip{ str_b > 0: (-{str_b} STR)}{ str_b < 0: (+{str_b * -1} STR)}{ cha_b > 0: (-{cha_b} CHA)}{ cha_b < 0: (+{cha_b * -1} CHA)}{ wit_b > 0: (-{wit_b} WIT)}{ wit_b < 0: (+{wit_b * -1} WIT)}] -> do_unequip_hat(item)
    - else:
        + [Equip{ str_b > 0: (+{str_b} STR)}{ str_b < 0: ({str_b} STR)}{ cha_b > 0: (+{cha_b} CHA)}{ cha_b < 0: ({cha_b} CHA)}{ wit_b > 0: (+{wit_b} WIT)}{ wit_b < 0: ({wit_b} WIT)}] -> do_equip_hat(item)
    }
}

{ slot == "necklace":
    { eq_necklace == item:
        + [Unequip{ str_b > 0: (-{str_b} STR)}{ str_b < 0: (+{str_b * -1} STR)}{ cha_b > 0: (-{cha_b} CHA)}{ cha_b < 0: (+{cha_b * -1} CHA)}{ wit_b > 0: (-{wit_b} WIT)}{ wit_b < 0: (+{wit_b * -1} WIT)}] -> do_unequip_necklace(item)
    - else:
        + [Equip{ str_b > 0: (+{str_b} STR)}{ str_b < 0: ({str_b} STR)}{ cha_b > 0: (+{cha_b} CHA)}{ cha_b < 0: ({cha_b} CHA)}{ wit_b > 0: (+{wit_b} WIT)}{ wit_b < 0: ({wit_b} WIT)}] -> do_equip_necklace(item)
    }
}

{ slot == "ring":
    { eq_ring == item:
        + [Unequip{ str_b > 0: (-{str_b} STR)}{ str_b < 0: (+{str_b * -1} STR)}{ cha_b > 0: (-{cha_b} CHA)}{ cha_b < 0: (+{cha_b * -1} CHA)}{ wit_b > 0: (-{wit_b} WIT)}{ wit_b < 0: (+{wit_b * -1} WIT)}] -> do_unequip_ring(item)
    - else:
        + [Equip{ str_b > 0: (+{str_b} STR)}{ str_b < 0: ({str_b} STR)}{ cha_b > 0: (+{cha_b} CHA)}{ cha_b < 0: ({cha_b} CHA)}{ wit_b > 0: (+{wit_b} WIT)}{ wit_b < 0: ({wit_b} WIT)}] -> do_equip_ring(item)
    }
}

+ [Drop] -> do_drop(item)
+ [Back] ->->


=== do_equip_weapon(item) ===
~ eq_weapon = item
->->

=== do_unequip_weapon(item) ===
~ eq_weapon = ITEMS.none
->->

=== do_equip_armor(item) ===
~ eq_armor = item
->->

=== do_unequip_armor(item) ===
~ eq_armor = ITEMS.none
->->

=== do_equip_outfit(item) ===
~ eq_outfit = item
->->

=== do_unequip_outfit(item) ===
~ eq_outfit = ITEMS.none
->->

=== do_equip_hat(item) ===
~ eq_hat = item
->->

=== do_unequip_hat(item) ===
~ eq_hat = ITEMS.none
->->

=== do_equip_necklace(item) ===
~ eq_necklace = item
->->

=== do_unequip_necklace(item) ===
~ eq_necklace = ITEMS.none
->->

=== do_equip_ring(item) ===
~ eq_ring = item
->->

=== do_unequip_ring(item) ===
~ eq_ring = ITEMS.none
->->

=== do_drop(item) ===
// Auto-unequip if dropped
{ eq_weapon == item:
    ~ eq_weapon = ITEMS.none
}
{ eq_armor == item:
    ~ eq_armor = ITEMS.none
}
{ eq_outfit == item:
    ~ eq_outfit = ITEMS.none
}
{ eq_hat == item:
    ~ eq_hat = ITEMS.none
}
{ eq_necklace == item:
    ~ eq_necklace = ITEMS.none
}
{ eq_ring == item:
    ~ eq_ring = ITEMS.none
}
// Add other slots logic here if expanded

~ inv -= item
You drop your {item_label(item)}.
->->

// Helper to add an item "safely" (handling duplicates isn't an issue with sets, but for feedback)
=== function take_item(item) ===
    ~ inv += item
    ~ return true
