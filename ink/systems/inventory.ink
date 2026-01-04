// ALL INVENTORY ITEMS MUST BE HERE
LIST ITEMS = rusty_sword, leather_armor, old_sack, small_knife, potion_of_spirit, potion_of_stupidity, common_tunic, rugged_coat, noble_cloak, common_hood, old_helmet, rugged_stetson, fancy_bycocket, headband_of_intellect, shimmering_pendant, fine_silver_chain, collar, leash, pocketwatch, chainmail_bikini, steel_breastplate, gauntlets, oversized_warhammer, simple_pendulum, longsword, scythe, ribbon_wand, spinnable_spiral, ring_of_power, ring_of_intellect, ring_of_influence, ring_of_health, ring_of_restraint, none
VAR inv = ()

VAR eq_weapon = ITEMS.none
VAR eq_armor = ITEMS.none
VAR eq_outfit = ITEMS.none
VAR eq_hat = ITEMS.none
VAR eq_necklace = ITEMS.none
VAR eq_ring = ITEMS.none

// Item counts (for duplicate support)
VAR rusty_sword_count = 0
VAR leather_armor_count = 0
VAR old_sack_count = 0
VAR small_knife_count = 0
VAR potion_of_spirit_count = 0
VAR potion_of_stupidity_count = 0

// New item counts
VAR common_tunic_count = 0
VAR rugged_coat_count = 0
VAR noble_cloak_count = 0
VAR common_hood_count = 0
VAR old_helmet_count = 0
VAR rugged_stetson_count = 0
VAR fancy_bycocket_count = 0
VAR headband_of_intellect_count = 0
VAR shimmering_pendant_count = 0
VAR fine_silver_chain_count = 0
VAR collar_count = 0
VAR leash_count = 0
VAR pocketwatch_count = 0
VAR chainmail_bikini_count = 0
VAR steel_breastplate_count = 0
VAR gauntlets_count = 0
VAR oversized_warhammer_count = 0
VAR simple_pendulum_count = 0
VAR longsword_count = 0
VAR scythe_count = 0
VAR ribbon_wand_count = 0
VAR spinnable_spiral_count = 0
VAR ring_of_power_count = 0
VAR ring_of_intellect_count = 0
VAR ring_of_influence_count = 0
VAR ring_of_health_count = 0
VAR ring_of_restraint_count = 0

// Helper: Get item gold value
=== function get_item_value(item) ===
    { item:
    - ITEMS.rusty_sword: ~ return 25
    - ITEMS.leather_armor: ~ return 30
    - ITEMS.old_sack: ~ return 1
    - ITEMS.small_knife: ~ return 5
    - ITEMS.potion_of_spirit: ~ return 30
    - ITEMS.potion_of_stupidity: ~ return 25
    - ITEMS.common_tunic: ~ return 5
    - ITEMS.rugged_coat: ~ return 30
    - ITEMS.noble_cloak: ~ return 75
    - ITEMS.common_hood: ~ return 5
    - ITEMS.old_helmet: ~ return 10
    - ITEMS.rugged_stetson: ~ return 20
    - ITEMS.fancy_bycocket: ~ return 60
    - ITEMS.headband_of_intellect: ~ return 50
    - ITEMS.shimmering_pendant: ~ return 65
    - ITEMS.fine_silver_chain: ~ return 45
    - ITEMS.collar: ~ return 10
    - ITEMS.leash: ~ return 25
    - ITEMS.pocketwatch: ~ return 75
    - ITEMS.chainmail_bikini: ~ return 40
    - ITEMS.steel_breastplate: ~ return 100
    - ITEMS.gauntlets: ~ return 35
    - ITEMS.oversized_warhammer: ~ return 100
    - ITEMS.simple_pendulum: ~ return 10
    - ITEMS.longsword: ~ return 25
    - ITEMS.scythe: ~ return 45
    - ITEMS.ribbon_wand: ~ return 80
    - ITEMS.spinnable_spiral: ~ return 65
    - ITEMS.ring_of_power: ~ return 50
    - ITEMS.ring_of_intellect: ~ return 50
    - ITEMS.ring_of_influence: ~ return 50
    - ITEMS.ring_of_health: ~ return 50
    - ITEMS.ring_of_restraint: ~ return 50
    - else: ~ return 0
    }

// Helper: Get item count
=== function get_item_count(item) ===
    { item:
    - ITEMS.rusty_sword: ~ return rusty_sword_count
    - ITEMS.leather_armor: ~ return leather_armor_count
    - ITEMS.old_sack: ~ return old_sack_count
    - ITEMS.small_knife: ~ return small_knife_count
    - ITEMS.potion_of_spirit: ~ return potion_of_spirit_count
    - ITEMS.potion_of_stupidity: ~ return potion_of_stupidity_count
    - ITEMS.common_tunic: ~ return common_tunic_count
    - ITEMS.rugged_coat: ~ return rugged_coat_count
    - ITEMS.noble_cloak: ~ return noble_cloak_count
    - ITEMS.common_hood: ~ return common_hood_count
    - ITEMS.old_helmet: ~ return old_helmet_count
    - ITEMS.rugged_stetson: ~ return rugged_stetson_count
    - ITEMS.fancy_bycocket: ~ return fancy_bycocket_count
    - ITEMS.headband_of_intellect: ~ return headband_of_intellect_count
    - ITEMS.shimmering_pendant: ~ return shimmering_pendant_count
    - ITEMS.fine_silver_chain: ~ return fine_silver_chain_count
    - ITEMS.collar: ~ return collar_count
    - ITEMS.leash: ~ return leash_count
    - ITEMS.pocketwatch: ~ return pocketwatch_count
    - ITEMS.chainmail_bikini: ~ return chainmail_bikini_count
    - ITEMS.steel_breastplate: ~ return steel_breastplate_count
    - ITEMS.gauntlets: ~ return gauntlets_count
    - ITEMS.oversized_warhammer: ~ return oversized_warhammer_count
    - ITEMS.simple_pendulum: ~ return simple_pendulum_count
    - ITEMS.longsword: ~ return longsword_count
    - ITEMS.scythe: ~ return scythe_count
    - ITEMS.ribbon_wand: ~ return ribbon_wand_count
    - ITEMS.spinnable_spiral: ~ return spinnable_spiral_count
    - ITEMS.ring_of_power: ~ return ring_of_power_count
    - ITEMS.ring_of_intellect: ~ return ring_of_intellect_count
    - ITEMS.ring_of_influence: ~ return ring_of_influence_count
    - ITEMS.ring_of_health: ~ return ring_of_health_count
    - ITEMS.ring_of_restraint: ~ return ring_of_restraint_count
    - else: ~ return 0
    }

// Helper: Set item count
=== function set_item_count(item, count) ===
    { item:
    - ITEMS.rusty_sword: ~ rusty_sword_count = count
    - ITEMS.leather_armor: ~ leather_armor_count = count
    - ITEMS.old_sack: ~ old_sack_count = count
    - ITEMS.small_knife: ~ small_knife_count = count
    - ITEMS.potion_of_spirit: ~ potion_of_spirit_count = count
    - ITEMS.potion_of_stupidity: ~ potion_of_stupidity_count = count
    - ITEMS.common_tunic: ~ common_tunic_count = count
    - ITEMS.rugged_coat: ~ rugged_coat_count = count
    - ITEMS.noble_cloak: ~ noble_cloak_count = count
    - ITEMS.common_hood: ~ common_hood_count = count
    - ITEMS.old_helmet: ~ old_helmet_count = count
    - ITEMS.rugged_stetson: ~ rugged_stetson_count = count
    - ITEMS.fancy_bycocket: ~ fancy_bycocket_count = count
    - ITEMS.headband_of_intellect: ~ headband_of_intellect_count = count
    - ITEMS.shimmering_pendant: ~ shimmering_pendant_count = count
    - ITEMS.fine_silver_chain: ~ fine_silver_chain_count = count
    - ITEMS.collar: ~ collar_count = count
    - ITEMS.leash: ~ leash_count = count
    - ITEMS.pocketwatch: ~ pocketwatch_count = count
    - ITEMS.chainmail_bikini: ~ chainmail_bikini_count = count
    - ITEMS.steel_breastplate: ~ steel_breastplate_count = count
    - ITEMS.gauntlets: ~ gauntlets_count = count
    - ITEMS.oversized_warhammer: ~ oversized_warhammer_count = count
    - ITEMS.simple_pendulum: ~ simple_pendulum_count = count
    - ITEMS.longsword: ~ longsword_count = count
    - ITEMS.scythe: ~ scythe_count = count
    - ITEMS.ribbon_wand: ~ ribbon_wand_count = count
    - ITEMS.spinnable_spiral: ~ spinnable_spiral_count = count
    - ITEMS.ring_of_power: ~ ring_of_power_count = count
    - ITEMS.ring_of_intellect: ~ ring_of_intellect_count = count
    - ITEMS.ring_of_influence: ~ ring_of_influence_count = count
    - ITEMS.ring_of_health: ~ ring_of_health_count = count
    - ITEMS.ring_of_restraint: ~ ring_of_restraint_count = count
    }

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
    - ITEMS.common_tunic:
        ~ return "outfit"
    - ITEMS.rugged_coat:
        ~ return "outfit"
    - ITEMS.noble_cloak:
        ~ return "outfit"
    - ITEMS.common_hood:
        ~ return "hat"
    - ITEMS.old_helmet:
        ~ return "hat"
    - ITEMS.rugged_stetson:
        ~ return "hat"
    - ITEMS.fancy_bycocket:
        ~ return "hat"
    - ITEMS.headband_of_intellect:
        ~ return "hat"
    - ITEMS.shimmering_pendant:
        ~ return "necklace"
    - ITEMS.fine_silver_chain:
        ~ return "necklace"
    - ITEMS.collar:
        ~ return "necklace"
    - ITEMS.leash:
        ~ return "necklace"
    - ITEMS.pocketwatch:
        ~ return "necklace"
    - ITEMS.chainmail_bikini:
        ~ return "armor"
    - ITEMS.steel_breastplate:
        ~ return "armor"
    - ITEMS.gauntlets:
        ~ return "armor"
    - ITEMS.oversized_warhammer:
        ~ return "weapon"
    - ITEMS.simple_pendulum:
        ~ return "weapon"
    - ITEMS.longsword:
        ~ return "weapon"
    - ITEMS.scythe:
        ~ return "weapon"
    - ITEMS.ribbon_wand:
        ~ return "weapon"
    - ITEMS.spinnable_spiral:
        ~ return "weapon"
    - ITEMS.ring_of_power:
        ~ return "ring"
    - ITEMS.ring_of_intellect:
        ~ return "ring"
    - ITEMS.ring_of_influence:
        ~ return "ring"
    - ITEMS.ring_of_health:
        ~ return "ring"
    - ITEMS.ring_of_restraint:
        ~ return "ring"
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
        - "STR": ~ return 1
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
    - ITEMS.rugged_coat:
        { stat:
        - "CHA": ~ return 1
        - "HP": ~ return 1
        }
    - ITEMS.noble_cloak:
        { stat:
        - "CHA": ~ return 3
        }
    - ITEMS.old_helmet:
        { stat:
        - "STR": ~ return 1
        }
    - ITEMS.rugged_stetson:
        { stat:
        - "CHA": ~ return 2
        }
    - ITEMS.fancy_bycocket:
        { stat:
        - "CHA": ~ return 3
        }
    - ITEMS.headband_of_intellect:
        { stat:
        - "WIT": ~ return 3
        }
    - ITEMS.shimmering_pendant:
        { stat:
        - "WIT": ~ return 2
        - "CHA": ~ return 1
        }
    - ITEMS.fine_silver_chain:
        { stat:
        - "CHA": ~ return 2
        }
    - ITEMS.collar:
        { stat:
        - "SP": ~ return 2
        - "WIT": ~ return -1
        }
    - ITEMS.leash:
        { stat:
        - "SP": ~ return 3
        - "WIT": ~ return -3
        }
    - ITEMS.pocketwatch:
        { stat:
        - "WIT": ~ return 4
        }
    - ITEMS.chainmail_bikini:
        { stat:
        - "CHA": ~ return 3
        - "STR": ~ return 1
        }
    - ITEMS.steel_breastplate:
        { stat:
        - "STR": ~ return 4
        }
    - ITEMS.gauntlets:
        { stat:
        - "STR": ~ return 2
        }
    - ITEMS.oversized_warhammer:
        { stat:
        - "STR": ~ return 5
        }
    - ITEMS.simple_pendulum:
        { stat:
        - "WIT": ~ return 1
        }
    - ITEMS.longsword:
        { stat:
        - "STR": ~ return 3
        }
    - ITEMS.scythe:
        { stat:
        - "STR": ~ return 3
        - "WIT": ~ return 1
        }
    - ITEMS.ribbon_wand:
        { stat:
        - "WIT": ~ return 2
        - "CHA": ~ return 2
        }
    - ITEMS.spinnable_spiral:
        { stat:
        - "WIT": ~ return 4
        }
    - ITEMS.ring_of_power:
        { stat:
        - "STR": ~ return 3
        }
    - ITEMS.ring_of_intellect:
        { stat:
        - "WIT": ~ return 3
        }
    - ITEMS.ring_of_influence:
        { stat:
        - "CHA": ~ return 3
        }
    - ITEMS.ring_of_health:
        { stat:
        - "HP": ~ return 3
        }
    - ITEMS.ring_of_restraint:
        { stat:
        - "SP": ~ return 3
        }
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
    - ITEMS.common_tunic:
        ~ return "Common tunic"
    - ITEMS.rugged_coat:
        ~ return "Rugged coat"
    - ITEMS.noble_cloak:
        ~ return "Noble cloak"
    - ITEMS.common_hood:
        ~ return "Common hood"
    - ITEMS.old_helmet:
        ~ return "Old helmet"
    - ITEMS.rugged_stetson:
        ~ return "Rugged stetson"
    - ITEMS.fancy_bycocket:
        ~ return "Fancy bycocket"
    - ITEMS.headband_of_intellect:
        ~ return "Headband of Intellect"
    - ITEMS.shimmering_pendant:
        ~ return "Shimmering Pendant"
    - ITEMS.fine_silver_chain:
        ~ return "Fine silver chain"
    - ITEMS.collar:
        ~ return "Collar"
    - ITEMS.leash:
        ~ return "Leash"
    - ITEMS.pocketwatch:
        ~ return "Pocketwatch"
    - ITEMS.chainmail_bikini:
        ~ return "Chainmail bikini"
    - ITEMS.steel_breastplate:
        ~ return "Steel breastplate"
    - ITEMS.gauntlets:
        ~ return "Gauntlets"
    - ITEMS.oversized_warhammer:
        ~ return "Oversized warhammer"
    - ITEMS.simple_pendulum:
        ~ return "Simple pendulum"
    - ITEMS.longsword:
        ~ return "Longsword"
    - ITEMS.scythe:
        ~ return "Scythe"
    - ITEMS.ribbon_wand:
        ~ return "Ribbon wand"
    - ITEMS.spinnable_spiral:
        ~ return "Spinnable Spiral"
    - ITEMS.ring_of_power:
        ~ return "Ring of Power"
    - ITEMS.ring_of_intellect:
        ~ return "Ring of Intellect"
    - ITEMS.ring_of_influence:
        ~ return "Ring of Influence"
    - ITEMS.ring_of_health:
        ~ return "Ring of Health"
    - ITEMS.ring_of_restraint:
        ~ return "Ring of Restraint"
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
// Note: Ink lists are sets. Count shown when > 1.
    + { inv ? ITEMS.rusty_sword } [{item_label(ITEMS.rusty_sword)}{is_equipped(ITEMS.rusty_sword): (Equipped)}{get_item_count(ITEMS.rusty_sword) > 1: (x{get_item_count(ITEMS.rusty_sword)})}] -> item_screen(ITEMS.rusty_sword)
    + { inv ? ITEMS.leather_armor } [{item_label(ITEMS.leather_armor)}{is_equipped(ITEMS.leather_armor): (Equipped)}{get_item_count(ITEMS.leather_armor) > 1: (x{get_item_count(ITEMS.leather_armor)})}] -> item_screen(ITEMS.leather_armor)
    + { inv ? ITEMS.old_sack } [{item_label(ITEMS.old_sack)}{is_equipped(ITEMS.old_sack): (Equipped)}{get_item_count(ITEMS.old_sack) > 1: (x{get_item_count(ITEMS.old_sack)})}] -> item_screen(ITEMS.old_sack)
    + { inv ? ITEMS.small_knife } [{item_label(ITEMS.small_knife)}{is_equipped(ITEMS.small_knife): (Equipped)}{get_item_count(ITEMS.small_knife) > 1: (x{get_item_count(ITEMS.small_knife)})}] -> item_screen(ITEMS.small_knife)
    + { inv ? ITEMS.potion_of_spirit } [{item_label(ITEMS.potion_of_spirit)}{get_item_count(ITEMS.potion_of_spirit) > 1: (x{get_item_count(ITEMS.potion_of_spirit)})}] -> item_screen(ITEMS.potion_of_spirit)
    + { inv ? ITEMS.potion_of_stupidity } [{item_label(ITEMS.potion_of_stupidity)}{get_item_count(ITEMS.potion_of_stupidity) > 1: (x{get_item_count(ITEMS.potion_of_stupidity)})}] -> item_screen(ITEMS.potion_of_stupidity)
    + { inv ? ITEMS.common_tunic } [{item_label(ITEMS.common_tunic)}{is_equipped(ITEMS.common_tunic): (Equipped)}{get_item_count(ITEMS.common_tunic) > 1: (x{get_item_count(ITEMS.common_tunic)})}] -> item_screen(ITEMS.common_tunic)
    + { inv ? ITEMS.rugged_coat } [{item_label(ITEMS.rugged_coat)}{is_equipped(ITEMS.rugged_coat): (Equipped)}{get_item_count(ITEMS.rugged_coat) > 1: (x{get_item_count(ITEMS.rugged_coat)})}] -> item_screen(ITEMS.rugged_coat)
    + { inv ? ITEMS.noble_cloak } [{item_label(ITEMS.noble_cloak)}{is_equipped(ITEMS.noble_cloak): (Equipped)}{get_item_count(ITEMS.noble_cloak) > 1: (x{get_item_count(ITEMS.noble_cloak)})}] -> item_screen(ITEMS.noble_cloak)
    + { inv ? ITEMS.common_hood } [{item_label(ITEMS.common_hood)}{is_equipped(ITEMS.common_hood): (Equipped)}{get_item_count(ITEMS.common_hood) > 1: (x{get_item_count(ITEMS.common_hood)})}] -> item_screen(ITEMS.common_hood)
    + { inv ? ITEMS.old_helmet } [{item_label(ITEMS.old_helmet)}{is_equipped(ITEMS.old_helmet): (Equipped)}{get_item_count(ITEMS.old_helmet) > 1: (x{get_item_count(ITEMS.old_helmet)})}] -> item_screen(ITEMS.old_helmet)
    + { inv ? ITEMS.rugged_stetson } [{item_label(ITEMS.rugged_stetson)}{is_equipped(ITEMS.rugged_stetson): (Equipped)}{get_item_count(ITEMS.rugged_stetson) > 1: (x{get_item_count(ITEMS.rugged_stetson)})}] -> item_screen(ITEMS.rugged_stetson)
    + { inv ? ITEMS.fancy_bycocket } [{item_label(ITEMS.fancy_bycocket)}{is_equipped(ITEMS.fancy_bycocket): (Equipped)}{get_item_count(ITEMS.fancy_bycocket) > 1: (x{get_item_count(ITEMS.fancy_bycocket)})}] -> item_screen(ITEMS.fancy_bycocket)
    + { inv ? ITEMS.headband_of_intellect } [{item_label(ITEMS.headband_of_intellect)}{is_equipped(ITEMS.headband_of_intellect): (Equipped)}{get_item_count(ITEMS.headband_of_intellect) > 1: (x{get_item_count(ITEMS.headband_of_intellect)})}] -> item_screen(ITEMS.headband_of_intellect)
    + { inv ? ITEMS.shimmering_pendant } [{item_label(ITEMS.shimmering_pendant)}{is_equipped(ITEMS.shimmering_pendant): (Equipped)}{get_item_count(ITEMS.shimmering_pendant) > 1: (x{get_item_count(ITEMS.shimmering_pendant)})}] -> item_screen(ITEMS.shimmering_pendant)
    + { inv ? ITEMS.fine_silver_chain } [{item_label(ITEMS.fine_silver_chain)}{is_equipped(ITEMS.fine_silver_chain): (Equipped)}{get_item_count(ITEMS.fine_silver_chain) > 1: (x{get_item_count(ITEMS.fine_silver_chain)})}] -> item_screen(ITEMS.fine_silver_chain)
    + { inv ? ITEMS.collar } [{item_label(ITEMS.collar)}{is_equipped(ITEMS.collar): (Equipped)}{get_item_count(ITEMS.collar) > 1: (x{get_item_count(ITEMS.collar)})}] -> item_screen(ITEMS.collar)
    + { inv ? ITEMS.leash } [{item_label(ITEMS.leash)}{is_equipped(ITEMS.leash): (Equipped)}{get_item_count(ITEMS.leash) > 1: (x{get_item_count(ITEMS.leash)})}] -> item_screen(ITEMS.leash)
    + { inv ? ITEMS.pocketwatch } [{item_label(ITEMS.pocketwatch)}{is_equipped(ITEMS.pocketwatch): (Equipped)}{get_item_count(ITEMS.pocketwatch) > 1: (x{get_item_count(ITEMS.pocketwatch)})}] -> item_screen(ITEMS.pocketwatch)
    + { inv ? ITEMS.chainmail_bikini } [{item_label(ITEMS.chainmail_bikini)}{is_equipped(ITEMS.chainmail_bikini): (Equipped)}{get_item_count(ITEMS.chainmail_bikini) > 1: (x{get_item_count(ITEMS.chainmail_bikini)})}] -> item_screen(ITEMS.chainmail_bikini)
    + { inv ? ITEMS.steel_breastplate } [{item_label(ITEMS.steel_breastplate)}{is_equipped(ITEMS.steel_breastplate): (Equipped)}{get_item_count(ITEMS.steel_breastplate) > 1: (x{get_item_count(ITEMS.steel_breastplate)})}] -> item_screen(ITEMS.steel_breastplate)
    + { inv ? ITEMS.gauntlets } [{item_label(ITEMS.gauntlets)}{is_equipped(ITEMS.gauntlets): (Equipped)}{get_item_count(ITEMS.gauntlets) > 1: (x{get_item_count(ITEMS.gauntlets)})}] -> item_screen(ITEMS.gauntlets)
    + { inv ? ITEMS.oversized_warhammer } [{item_label(ITEMS.oversized_warhammer)}{is_equipped(ITEMS.oversized_warhammer): (Equipped)}{get_item_count(ITEMS.oversized_warhammer) > 1: (x{get_item_count(ITEMS.oversized_warhammer)})}] -> item_screen(ITEMS.oversized_warhammer)
    + { inv ? ITEMS.simple_pendulum } [{item_label(ITEMS.simple_pendulum)}{is_equipped(ITEMS.simple_pendulum): (Equipped)}{get_item_count(ITEMS.simple_pendulum) > 1: (x{get_item_count(ITEMS.simple_pendulum)})}] -> item_screen(ITEMS.simple_pendulum)
    + { inv ? ITEMS.longsword } [{item_label(ITEMS.longsword)}{is_equipped(ITEMS.longsword): (Equipped)}{get_item_count(ITEMS.longsword) > 1: (x{get_item_count(ITEMS.longsword)})}] -> item_screen(ITEMS.longsword)
    + { inv ? ITEMS.scythe } [{item_label(ITEMS.scythe)}{is_equipped(ITEMS.scythe): (Equipped)}{get_item_count(ITEMS.scythe) > 1: (x{get_item_count(ITEMS.scythe)})}] -> item_screen(ITEMS.scythe)
    + { inv ? ITEMS.ribbon_wand } [{item_label(ITEMS.ribbon_wand)}{is_equipped(ITEMS.ribbon_wand): (Equipped)}{get_item_count(ITEMS.ribbon_wand) > 1: (x{get_item_count(ITEMS.ribbon_wand)})}] -> item_screen(ITEMS.ribbon_wand)
    + { inv ? ITEMS.spinnable_spiral } [{item_label(ITEMS.spinnable_spiral)}{is_equipped(ITEMS.spinnable_spiral): (Equipped)}{get_item_count(ITEMS.spinnable_spiral) > 1: (x{get_item_count(ITEMS.spinnable_spiral)})}] -> item_screen(ITEMS.spinnable_spiral)
    + { inv ? ITEMS.ring_of_power } [{item_label(ITEMS.ring_of_power)}{is_equipped(ITEMS.ring_of_power): (Equipped)}{get_item_count(ITEMS.ring_of_power) > 1: (x{get_item_count(ITEMS.ring_of_power)})}] -> item_screen(ITEMS.ring_of_power)
    + { inv ? ITEMS.ring_of_intellect } [{item_label(ITEMS.ring_of_intellect)}{is_equipped(ITEMS.ring_of_intellect): (Equipped)}{get_item_count(ITEMS.ring_of_intellect) > 1: (x{get_item_count(ITEMS.ring_of_intellect)})}] -> item_screen(ITEMS.ring_of_intellect)
    + { inv ? ITEMS.ring_of_influence } [{item_label(ITEMS.ring_of_influence)}{is_equipped(ITEMS.ring_of_influence): (Equipped)}{get_item_count(ITEMS.ring_of_influence) > 1: (x{get_item_count(ITEMS.ring_of_influence)})}] -> item_screen(ITEMS.ring_of_influence)
    + { inv ? ITEMS.ring_of_health } [{item_label(ITEMS.ring_of_health)}{is_equipped(ITEMS.ring_of_health): (Equipped)}{get_item_count(ITEMS.ring_of_health) > 1: (x{get_item_count(ITEMS.ring_of_health)})}] -> item_screen(ITEMS.ring_of_health)
    + { inv ? ITEMS.ring_of_restraint } [{item_label(ITEMS.ring_of_restraint)}{is_equipped(ITEMS.ring_of_restraint): (Equipped)}{get_item_count(ITEMS.ring_of_restraint) > 1: (x{get_item_count(ITEMS.ring_of_restraint)})}] -> item_screen(ITEMS.ring_of_restraint)
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

=== function perform_use_item(item) ===
// Apply effects
~ STR_BASE += get_item_use_bonus(item, "STR")
~ CHA_BASE += get_item_use_bonus(item, "CHA")
~ WIT_BASE += get_item_use_bonus(item, "WIT")
~ HP_BASE += get_item_use_bonus(item, "HP_MAX")
~ lose_hp(-get_item_use_bonus(item, "HP_CUR"))
~ SP_BASE += get_item_use_bonus(item, "SP_MAX")
~ gain_sp(get_item_use_bonus(item, "SP_CUR"))

// Decrement count
~ temp current = get_item_count(item)
~ set_item_count(item, current - 1)
{ get_item_count(item) <= 0:
    ~ inv -= item
}

=== do_use(item) ===
~ perform_use_item(item)
-> status_check ->

You use {item_label(item)}.
+ [Back] -> inventory


=== do_equip_weapon(item) ===
~ eq_weapon = item
~ lose_hp(-get_item_limit_bonus(item, "HP_CUR"))
~ gain_sp(get_item_limit_bonus(item, "SP_CUR"))
->->

=== do_unequip_weapon(item) ===
~ eq_weapon = ITEMS.none
~ lose_hp(get_item_limit_bonus(item, "HP_CUR"))
~ lose_sp(get_item_limit_bonus(item, "SP_CUR"))
->->

=== do_equip_armor(item) ===
~ eq_armor = item
~ lose_hp(-get_item_limit_bonus(item, "HP_CUR"))
~ gain_sp(get_item_limit_bonus(item, "SP_CUR"))
->->

=== do_unequip_armor(item) ===
~ eq_armor = ITEMS.none
~ lose_hp(get_item_limit_bonus(item, "HP_CUR"))
~ lose_sp(get_item_limit_bonus(item, "SP_CUR"))
->->

=== do_equip_outfit(item) ===
~ eq_outfit = item
~ lose_hp(-get_item_limit_bonus(item, "HP_CUR"))
~ gain_sp(get_item_limit_bonus(item, "SP_CUR"))
->->

=== do_unequip_outfit(item) ===
~ eq_outfit = ITEMS.none
~ lose_hp(get_item_limit_bonus(item, "HP_CUR"))
~ lose_sp(get_item_limit_bonus(item, "SP_CUR"))
->->

=== do_equip_hat(item) ===
~ eq_hat = item
~ lose_hp(-get_item_limit_bonus(item, "HP_CUR"))
~ gain_sp(get_item_limit_bonus(item, "SP_CUR"))
->->

=== do_unequip_hat(item) ===
~ eq_hat = ITEMS.none
~ lose_hp(get_item_limit_bonus(item, "HP_CUR"))
~ lose_sp(get_item_limit_bonus(item, "SP_CUR"))
->->

=== do_equip_necklace(item) ===
~ eq_necklace = item
~ lose_hp(-get_item_limit_bonus(item, "HP_CUR"))
~ gain_sp(get_item_limit_bonus(item, "SP_CUR"))
->->

=== do_unequip_necklace(item) ===
~ eq_necklace = ITEMS.none
~ lose_hp(get_item_limit_bonus(item, "HP_CUR"))
~ lose_sp(get_item_limit_bonus(item, "SP_CUR"))
->->

=== do_equip_ring(item) ===
~ eq_ring = item
~ lose_hp(-get_item_limit_bonus(item, "HP_CUR"))
~ gain_sp(get_item_limit_bonus(item, "SP_CUR"))
->->

=== do_unequip_ring(item) ===
~ eq_ring = ITEMS.none
~ lose_hp(get_item_limit_bonus(item, "HP_CUR"))
~ lose_sp(get_item_limit_bonus(item, "SP_CUR"))
->->

=== do_drop(item) ===
~ temp current = get_item_count(item)
~ temp equipped = is_equipped(item)

// Only allow drop if we have more than 1, OR we have 1 and it's not equipped
{ current <= 1 && equipped:
    You can't drop your only {item_label(item)} while it's equipped.
    ->->
}

// Decrement count
~ set_item_count(item, current - 1)

// If count is now 0, remove from inv and unequip
{ get_item_count(item) <= 0:
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
    ~ inv -= item
}

You drop your {item_label(item)}.
->->

// Helper to add an item (increments count, adds to inv set if first)
=== function take_item(item) ===
    ~ temp current = get_item_count(item)
    ~ set_item_count(item, current + 1)
    ~ inv += item
    ~ return true
