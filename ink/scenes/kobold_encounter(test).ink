=== find_kobold ===
You come across a kobold in the woods. What do you do?
+ [Fight it] -> attack_kobold
+ [Persuade it to surrender] -> persuade_kobold
+ [Surrender] -> surrender_kobold
+ [Check inventory] 
    -> inventory ->
    -> find_kobold

=== attack_kobold ===
+ [Attack!] -> fight_kobold

=== fight_kobold ===
{ skill_check("STR", 10):
    You win.
    + [Loot the body] -> loot_kobold
    + [Leave] -> after_kobold
  - else:
    You lose and limp away.
    ~ lose_hp(5)
    -> status_check ->
    -> after_kobold
}

=== loot_kobold ===
-> loot_npc(NPCS.npc_kobold) ->
-> after_kobold

=== persuade_kobold ===
{ skill_check("CHA", 10):
    It surrenders. 
    -> after_kobold
  - else:
    It laughs and attacks. -> attack_kobold
}

=== surrender_kobold ===
You drop your weapon. 
// Logic: If you have a weapon equipped, you lose it.
{ eq_weapon != ITEMS.none:
    ~ inv -= eq_weapon
    ~ eq_weapon = ITEMS.none
}

The kobold takes your coins and leaves.
// Logic: Lose all coins
~ peaceful_resolution = true
~ gain_sp(2)
-> status_check ->
~ coins = 0
-> after_kobold

=== after_kobold ===
+ [Check inventory] 
    -> inventory ->
    -> after_kobold
+ [Move on]
  You continue down the trail...
  ++ [Continue]
      ->->
