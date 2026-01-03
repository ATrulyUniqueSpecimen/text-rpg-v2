VAR took_coins = false
VAR took_sword = false
VAR took_sack = false
VAR took_armor = false

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
    + [Loot the body] -> loot_goblin
    + [Leave] -> after_goblin
  - else:
    You lose and limp away.
}
-> after_goblin

=== loot_goblin ===
+ {not took_coins} [Take 5 coins]
    ~ coins += 5
    ~ took_coins = true
    -> loot_goblin
+ {not took_sword} [Take rusty sword]
    ~ take_item(ITEMS.rusty_sword)
    ~ took_sword = true
    -> loot_goblin
+ {not took_sack} [Take old sack]
    ~ take_item(ITEMS.old_sack)
    ~ took_sack = true
    -> loot_goblin
+ {not took_armor} [Take leather armor]
    ~ take_item(ITEMS.leather_armor)
    ~ took_armor = true
    -> loot_goblin
+ [Leave] 
    -> after_goblin

=== persuade ===
{ skill_check("CHA", 10):
    It surrenders. -> after_goblin
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
~ coins = 0
-> after_goblin

=== after_goblin ===
+ [Check inventory] 
    -> inventory ->
    -> after_goblin
+ [Move on]
  You continue down the trail...
  ->->
