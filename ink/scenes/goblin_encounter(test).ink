VAR goblin_defeated = false
VAR peaceful_resolution = false

=== find_goblin ===
You come across a goblin in the woods. What do you do?
+ [Fight it] -> attack
+ [Persuade it to surrender] -> persuade
+ [Surrender] -> surrender
+ [Check inventory] 
    -> inventory ->
    -> find_goblin

=== attack ===
+ [Attack!] -> fight_goblin

=== fight_goblin ===
{ skill_check("STR", 10):
    You win.
    ~ goblin_defeated = true
    + [Loot the body] -> loot_goblin
    + [Leave] -> after_goblin
  - else:
    You lose and limp away.
    ~ lose_hp(5)
    -> status_check ->
    -> after_goblin
}

=== loot_goblin ===
+ {goblin_coins > 0} [Take {goblin_coins} coins]
    ~ coins += goblin_coins
    ~ goblin_coins = 0
    -> loot_goblin
+ {goblin_inv ? rusty_sword} [Take {item_label(ITEMS.rusty_sword)}]
    ~ take_item(ITEMS.rusty_sword)
    ~ goblin_inv -= rusty_sword
    -> loot_goblin
+ {goblin_inv ? old_sack} [Take {item_label(ITEMS.old_sack)}]
    ~ take_item(ITEMS.old_sack)
    ~ goblin_inv -= old_sack
    -> loot_goblin
+ {goblin_inv ? leather_armor} [Take {item_label(ITEMS.leather_armor)}]
    ~ take_item(ITEMS.leather_armor)
    ~ goblin_inv -= leather_armor
    -> loot_goblin
+ {goblin_inv ? small_knife} [Take {item_label(ITEMS.small_knife)}]
    ~ take_item(ITEMS.small_knife)
    ~ goblin_inv -= small_knife
    -> loot_goblin
+ {goblin_inv ? potion_of_spirit} [Take {item_label(ITEMS.potion_of_spirit)}]
    ~ take_item(ITEMS.potion_of_spirit)
    ~ goblin_inv -= potion_of_spirit
    -> loot_goblin
+ {goblin_inv ? potion_of_stupidity} [Take {item_label(ITEMS.potion_of_stupidity)}]
    ~ take_item(ITEMS.potion_of_stupidity)
    ~ goblin_inv -= potion_of_stupidity
    -> loot_goblin
+ [Leave] 
    -> after_goblin

=== persuade ===
{ skill_check("CHA", 10):
    It surrenders. 
    ~ peaceful_resolution = true
    -> after_goblin
  - else:
    It laughs and attacks. -> attack
}

=== surrender ===
You drop your weapon. 
// Logic: If you have a weapon equipped, you lose it.
{ eq_weapon != ITEMS.none:
    ~ inv -= eq_weapon
    ~ eq_weapon = ITEMS.none
}

The goblin takes your coins and leaves.
// Logic: Lose all coins
~ peaceful_resolution = true
~ gain_sp(2)
-> status_check ->
~ coins = 0
-> after_goblin

=== after_goblin ===
+ [Check inventory] 
    -> inventory ->
    -> after_goblin
+ [Move on]
  You continue down the trail...
  ->->
