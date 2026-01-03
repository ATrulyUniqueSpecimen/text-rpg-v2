// systems/stats.ink
// Requires: systems/inventory.ink to be INCLUDED somewhere

VAR STR_BASE = 0
VAR CHA_BASE = 0
VAR WIT_BASE = 0
VAR HP_BASE = 0
VAR SP_BASE = 0
VAR HP_CUR = 0
VAR SP_CUR = 0
VAR char_gender = "male"

// Sum all equipped-slot bonuses that apply to a given stat.
=== function EQUIPPED_STAT_BONUS(stat) ===
~ temp total = 0

~ total += get_item_limit_bonus(eq_weapon, stat)
~ total += get_item_limit_bonus(eq_armor, stat)
~ total += get_item_limit_bonus(eq_outfit, stat)
~ total += get_item_limit_bonus(eq_hat, stat)
~ total += get_item_limit_bonus(eq_necklace, stat)
~ total += get_item_limit_bonus(eq_ring, stat)

~ return total


=== function STR() ===
~ return STR_BASE + EQUIPPED_STAT_BONUS("STR")


=== function CHA() ===
~ return CHA_BASE + EQUIPPED_STAT_BONUS("CHA")


=== function WIT() ===
~ return WIT_BASE + EQUIPPED_STAT_BONUS("WIT")


// Skill check: roll d10 + stat >= dc
// Accepts ability keys: "STR", "CHA", "WIT" and also "INT" as an alias for WIT
=== function skill_check(ability, dc) ===
~ temp score = 0

{ ability == "STR":
    ~ score = STR()
}
{ ability == "CHA":
    ~ score = CHA()
}
{ ability == "WIT" || ability == "INT":
    ~ score = WIT()
}

~ temp roll = RANDOM(1,10)

{ roll + score >= dc:
    ~ return true
- else:
    ~ return false
}


=== function lose_hp(amt) ===
~ HP_CUR -= amt
{
- HP_CUR > HP_BASE + EQUIPPED_STAT_BONUS("HP"):
    ~ HP_CUR = HP_BASE + EQUIPPED_STAT_BONUS("HP")
- HP_CUR <= 0:
    ~ HP_CUR = 0
}


=== function gain_sp(amt) ===
~ SP_CUR += amt
{
- SP_CUR > SP_BASE + EQUIPPED_STAT_BONUS("SP"):
    ~ SP_CUR = SP_BASE + EQUIPPED_STAT_BONUS("SP")
- SP_CUR < 0:
    ~ SP_CUR = 0
}

=== status_check ===
{
- HP_CUR <= 0:
    ~ HP_CUR = 1
    ~ SP_CUR = 0
    You are knocked unconscious.
    + [Continue] -> after_goblin
- SP_CUR >= SP_BASE + EQUIPPED_STAT_BONUS("SP"):
    ~ SP_CUR = 0
    You overloaded on spirit. You collapse from exhaustion.
    + [Continue] -> after_goblin
- else:
    ->->
}
