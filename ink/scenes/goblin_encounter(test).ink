VAR goblin_defeated = false
VAR peaceful_resolution = false

=== find_goblin ===
You come across a goblin in the woods. What do you do?
+ [Fight it] -> attack_goblin
+ [Persuade it to follow you] -> persuade_goblin
+ [Surrender] -> surrender_goblin
+ [Check inventory] 
    -> inventory ->
    -> find_goblin

=== attack_goblin ===
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
-> loot_npc(NPCS.npc_goblin) ->
-> after_goblin

=== persuade_goblin ===
{ skill_check("CHA", 10):
    The goblin looks impressed by your words. 
    ~ peaceful_resolution = true
    -> recruit_companion(NPCS.npc_goblin) ->
    -> after_goblin
  - else:
    It laughs and attacks. -> attack_goblin
}

=== surrender_goblin ===
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
  ++ [Continue]
      ->->
