// ALL INVENTORY ITEMS MUST BE HERE
LIST ITEMS = rusty_sword, leather_armor, old_sack, small_knife, potion_of_spirit, potion_of_stupidity, none
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
    - ITEMS.small_knife:
        ~ return "weapon"
    - ITEMS.potion_of_spirit:
        ~ return "consumable"
    - ITEMS.potion_of_stupidity:
        ~ return "consumable"
    - else:
        ~ return "none"
    }

// Helper: Get the bonus for a specific stat from an item
=== function get_item_limit_bonus(item, stat) ===
    { item:
    - ITEMS.rusty_sword:
        { stat:
        - "STR": ~ return 2
        }
    - ITEMS.leather_armor:
        { stat:
        - "STR": ~ return 4
        }
    - ITEMS.old_sack:
        { stat:
        - "CHA": ~ return -1
        - "HP": ~ return 1
        }
    - ITEMS.small_knife:
        { stat:
        - "STR": ~ return 1
        }
    - ITEMS.potion_of_spirit:
        ~ return 0
    }
    ~ return 0

// Helper: Get the usage bonus for a consumable
=== function get_item_use_bonus(item, stat) ===
    { item:
    - ITEMS.potion_of_spirit:
        { stat:
        - "SP_CUR": ~ return 2
        }
    - ITEMS.potion_of_stupidity:
        { stat:
        - "WIT": ~ return -2
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
    - ITEMS.small_knife:
        ~ return "Small knife"
    - ITEMS.potion_of_spirit:
        ~ return "Potion of Spirit"
    - ITEMS.potion_of_stupidity:
        ~ return "Potion of Stupidity"
    - else:
        ~ return "{item}"
    }

=== function is_equipped(item) ===
    {
    - eq_weapon == item: ~ return true
    - eq_armor == item: ~ return true
    - eq_outfit == item: ~ return true
    - eq_hat == item: ~ return true
    - eq_necklace == item: ~ return true
    - eq_ring == item: ~ return true
    - else: ~ return false
    }

=== inventory ===
// Iterate over all items in the inventory
// Note: Ink lists are sets. We check availability.
    + { inv ? ITEMS.rusty_sword } [{item_label(ITEMS.rusty_sword)}{is_equipped(ITEMS.rusty_sword): (Equipped)}] -> item_screen(ITEMS.rusty_sword)
    + { inv ? ITEMS.leather_armor } [{item_label(ITEMS.leather_armor)}{is_equipped(ITEMS.leather_armor): (Equipped)}] -> item_screen(ITEMS.leather_armor)
    + { inv ? ITEMS.old_sack } [{item_label(ITEMS.old_sack)}{is_equipped(ITEMS.old_sack): (Equipped)}] -> item_screen(ITEMS.old_sack)
    + { inv ? ITEMS.small_knife } [{item_label(ITEMS.small_knife)}{is_equipped(ITEMS.small_knife): (Equipped)}] -> item_screen(ITEMS.small_knife)
    + { inv ? ITEMS.potion_of_spirit } [{item_label(ITEMS.potion_of_spirit)}] -> item_screen(ITEMS.potion_of_spirit)
    + { inv ? ITEMS.potion_of_stupidity } [{item_label(ITEMS.potion_of_stupidity)}] -> item_screen(ITEMS.potion_of_stupidity)
    + [Back] ->->

// Generic Item Screen
=== item_screen(item) ===
~ temp slot = get_item_slot(item)
~ temp str_b = get_item_limit_bonus(item, "STR")
~ temp cha_b = get_item_limit_bonus(item, "CHA")
~ temp wit_b = get_item_limit_bonus(item, "WIT")
~ temp hp_b = get_item_limit_bonus(item, "HP")
~ temp sp_b = get_item_limit_bonus(item, "SP")

~ temp str_u = get_item_use_bonus(item, "STR")
~ temp cha_u = get_item_use_bonus(item, "CHA")
~ temp wit_u = get_item_use_bonus(item, "WIT")
~ temp hp_max_u = get_item_use_bonus(item, "HP_MAX")
~ temp hp_cur_u = get_item_use_bonus(item, "HP_CUR")
~ temp sp_max_u = get_item_use_bonus(item, "SP_MAX")
~ temp sp_cur_u = get_item_use_bonus(item, "SP_CUR")

{ slot == "weapon":
    { eq_weapon == item:
        + [Unequip{ str_b > 0: (-{str_b} STR)}{ str_b < 0: (+{str_b * -1} STR)}{ cha_b > 0: (-{cha_b} CHA)}{ cha_b < 0: (+{cha_b * -1} CHA)}{ wit_b > 0: (-{wit_b} WIT)}{ wit_b < 0: (+{wit_b * -1} WIT)}{ hp_b > 0: (-{hp_b} HP)}{ hp_b < 0: (+{hp_b * -1} HP)}{ sp_b > 0: (-{sp_b} SP)}{ sp_b < 0: (+{sp_b * -1} SP)}] -> do_unequip_weapon(item)
    - else:
        + [Equip{ str_b > 0: (+{str_b} STR)}{ str_b < 0: ({str_b} STR)}{ cha_b > 0: (+{cha_b} CHA)}{ cha_b < 0: ({cha_b} CHA)}{ wit_b > 0: (+{wit_b} WIT)}{ wit_b < 0: ({wit_b} WIT)}{ hp_b > 0: (+{hp_b} HP)}{ hp_b < 0: ({hp_b} HP)}{ sp_b > 0: (+{sp_b} SP)}{ sp_b < 0: ({sp_b} SP)}] -> do_equip_weapon(item)
    }
}

{ slot == "armor":
    { eq_armor == item:
        + [Unequip{ str_b > 0: (-{str_b} STR)}{ str_b < 0: (+{str_b * -1} STR)}{ cha_b > 0: (-{cha_b} CHA)}{ cha_b < 0: (+{cha_b * -1} CHA)}{ wit_b > 0: (-{wit_b} WIT)}{ wit_b < 0: (+{wit_b * -1} WIT)}{ hp_b > 0: (-{hp_b} HP)}{ hp_b < 0: (+{hp_b * -1} HP)}{ sp_b > 0: (-{sp_b} SP)}{ sp_b < 0: (+{sp_b * -1} SP)}] -> do_unequip_armor(item)
    - else:
        + [Equip{ str_b > 0: (+{str_b} STR)}{ str_b < 0: ({str_b} STR)}{ cha_b > 0: (+{cha_b} CHA)}{ cha_b < 0: ({cha_b} CHA)}{ wit_b > 0: (+{wit_b} WIT)}{ wit_b < 0: ({wit_b} WIT)}{ hp_b > 0: (+{hp_b} HP)}{ hp_b < 0: ({hp_b} HP)}{ sp_b > 0: (+{sp_b} SP)}{ sp_b < 0: ({sp_b} SP)}] -> do_equip_armor(item)
    }
}

{ slot == "outfit":
    { eq_outfit == item:
        + [Unequip{ str_b > 0: (-{str_b} STR)}{ str_b < 0: (+{str_b * -1} STR)}{ cha_b > 0: (-{cha_b} CHA)}{ cha_b < 0: (+{cha_b * -1} CHA)}{ wit_b > 0: (-{wit_b} WIT)}{ wit_b < 0: (+{wit_b * -1} WIT)}{ hp_b > 0: (-{hp_b} HP)}{ hp_b < 0: (+{hp_b * -1} HP)}{ sp_b > 0: (-{sp_b} SP)}{ sp_b < 0: (+{sp_b * -1} SP)}] -> do_unequip_outfit(item)
    - else:
        + [Equip{ str_b > 0: (+{str_b} STR)}{ str_b < 0: ({str_b} STR)}{ cha_b > 0: (+{cha_b} CHA)}{ cha_b < 0: ({cha_b} CHA)}{ wit_b > 0: (+{wit_b} WIT)}{ wit_b < 0: ({wit_b} WIT)}{ hp_b > 0: (+{hp_b} HP)}{ hp_b < 0: ({hp_b} HP)}{ sp_b > 0: (+{sp_b} SP)}{ sp_b < 0: ({sp_b} SP)}] -> do_equip_outfit(item)
    }
}

{ slot == "hat":
    { eq_hat == item:
        + [Unequip{ str_b > 0: (-{str_b} STR)}{ str_b < 0: (+{str_b * -1} STR)}{ cha_b > 0: (-{cha_b} CHA)}{ cha_b < 0: (+{cha_b * -1} CHA)}{ wit_b > 0: (-{wit_b} WIT)}{ wit_b < 0: (+{wit_b * -1} WIT)}{ hp_b > 0: (-{hp_b} HP)}{ hp_b < 0: (+{hp_b * -1} HP)}{ sp_b > 0: (-{sp_b} SP)}{ sp_b < 0: (+{sp_b * -1} SP)}] -> do_unequip_hat(item)
    - else:
        + [Equip{ str_b > 0: (+{str_b} STR)}{ str_b < 0: ({str_b} STR)}{ cha_b > 0: (+{cha_b} CHA)}{ cha_b < 0: ({cha_b} CHA)}{ wit_b > 0: (+{wit_b} WIT)}{ wit_b < 0: ({wit_b} WIT)}{ hp_b > 0: (+{hp_b} HP)}{ hp_b < 0: ({hp_b} HP)}{ sp_b > 0: (+{sp_b} SP)}{ sp_b < 0: ({sp_b} SP)}] -> do_equip_hat(item)
    }
}

{ slot == "necklace":
    { eq_necklace == item:
        + [Unequip{ str_b > 0: (-{str_b} STR)}{ str_b < 0: (+{str_b * -1} STR)}{ cha_b > 0: (-{cha_b} CHA)}{ cha_b < 0: (+{cha_b * -1} CHA)}{ wit_b > 0: (-{wit_b} WIT)}{ wit_b < 0: (+{wit_b * -1} WIT)}{ hp_b > 0: (-{hp_b} HP)}{ hp_b < 0: (+{hp_b * -1} HP)}{ sp_b > 0: (-{sp_b} SP)}{ sp_b < 0: (+{sp_b * -1} SP)}] -> do_unequip_necklace(item)
    - else:
        + [Equip{ str_b > 0: (+{str_b} STR)}{ str_b < 0: ({str_b} STR)}{ cha_b > 0: (+{cha_b} CHA)}{ cha_b < 0: ({cha_b} CHA)}{ wit_b > 0: (+{wit_b} WIT)}{ wit_b < 0: ({wit_b} WIT)}{ hp_b > 0: (+{hp_b} HP)}{ hp_b < 0: ({hp_b} HP)}{ sp_b > 0: (+{sp_b} SP)}{ sp_b < 0: ({sp_b} SP)}] -> do_equip_necklace(item)
    }
}

{ slot == "ring":
    { eq_ring == item:
        + [Unequip{ str_b > 0: (-{str_b} STR)}{ str_b < 0: (+{str_b * -1} STR)}{ cha_b > 0: (-{cha_b} CHA)}{ cha_b < 0: (+{cha_b * -1} CHA)}{ wit_b > 0: (-{wit_b} WIT)}{ wit_b < 0: (+{wit_b * -1} WIT)}{ hp_b > 0: (-{hp_b} HP)}{ hp_b < 0: (+{hp_b * -1} HP)}{ sp_b > 0: (-{sp_b} SP)}{ sp_b < 0: (+{sp_b * -1} SP)}] -> do_unequip_ring(item)
    - else:
        + [Equip{ str_b > 0: (+{str_b} STR)}{ str_b < 0: ({str_b} STR)}{ cha_b > 0: (+{cha_b} CHA)}{ cha_b < 0: ({cha_b} CHA)}{ wit_b > 0: (+{wit_b} WIT)}{ wit_b < 0: ({wit_b} WIT)}{ hp_b > 0: (+{hp_b} HP)}{ hp_b < 0: ({hp_b} HP)}{ sp_b > 0: (+{sp_b} SP)}{ sp_b < 0: ({sp_b} SP)}] -> do_equip_ring(item)
    }
}

{ slot == "consumable":
    + [Use{ str_u > 0: (+{str_u} STR)}{ str_u < 0: ({str_u} STR)}{ cha_u > 0: (+{cha_u} CHA)}{ cha_u < 0: ({cha_u} CHA)}{ wit_u > 0: (+{wit_u} WIT)}{ wit_u < 0: ({wit_u} WIT)}{ hp_max_u > 0: (+{hp_max_u} Max HP)}{ hp_max_u < 0: ({hp_max_u} Max HP)}{ hp_cur_u > 0: (+{hp_cur_u} HP)}{ hp_cur_u < 0: ({hp_cur_u} HP)}{ sp_max_u > 0: (+{sp_max_u} Max SP)}{ sp_max_u < 0: ({sp_max_u} Max SP)}{ sp_cur_u > 0: (+{sp_cur_u} SP)}{ sp_cur_u < 0: ({sp_cur_u} SP)}] -> use_confirm(item)
}

+ [Drop] -> drop_confirm(item)
+ [Back] ->->

=== drop_confirm(item) ===
Are you sure you want to drop {item_label(item)}?
+ [Yes] -> do_drop(item)
+ [No] -> item_screen(item)

=== use_confirm(item) ===
Are you sure you want to use {item_label(item)}?
+ [Yes] -> do_use(item)
+ [No] -> item_screen(item)

=== do_use(item) ===
~ STR_BASE += get_item_use_bonus(item, "STR")
~ CHA_BASE += get_item_use_bonus(item, "CHA")
~ WIT_BASE += get_item_use_bonus(item, "WIT")
~ HP_BASE += get_item_use_bonus(item, "HP_MAX")
~ lose_hp(-get_item_use_bonus(item, "HP_CUR"))
~ SP_BASE += get_item_use_bonus(item, "SP_MAX")
~ gain_sp(get_item_use_bonus(item, "SP_CUR"))
-> status_check ->
~ inv -= item
You use {item_label(item)}.
+ [Back] -> inventory


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
