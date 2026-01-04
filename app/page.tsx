"use client";

import { useEffect, useState, useRef } from "react";
import { SideMenu } from "./components/SideMenu";
import { StartMenu } from "./components/StartMenu";
import { CharacterCreator } from "./components/CharacterCreator";
import { ConfirmationModal } from "./components/ConfirmationModal";
import { FeedbackForm } from "./components/FeedbackForm";
import { useEntityStats } from "./hooks/useEntityStats";
import { useInkGame } from "./hooks/useInkGame";

export default function Page() {
  type Mode = "menu" | "stats" | "game";

  const [mode, setMode] = useState<Mode>("menu");
  const [menuView, setMenuView] = useState<"splash" | "saves" | "achievements" | "settings">("splash");
  const [pendingSlot, setPendingSlot] = useState<number | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [pendingDarkMode, setPendingDarkMode] = useState(true);

  const [isMobileView, setIsMobileView] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ink_mobile_view");
      if (saved !== null) return saved === "true";
      return window.innerWidth < 600;
    }
    return false;
  });

  const [achievements, setAchievements] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ink_achievements");
      if (saved) return JSON.parse(saved);
    }
    return { victory: false, peaceful: false, decked_out: false };
  });

  useEffect(() => {
    localStorage.setItem("ink_achievements", JSON.stringify(achievements));
  }, [achievements]);

  // Notification State
  type NotificationType = "achievement" | "refusal" | "info";
  const [notification, setNotification] = useState<{ id: string; name: string; desc: string; type: NotificationType; status: "entering" | "active" | "exiting" } | null>(null);
  const [showOverwriteConfirm, setShowOverwriteConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showCharacterMenu, setShowCharacterMenu] = useState(false);
  const [showCompanionMenu, setShowCompanionMenu] = useState(false);

  // New Hooks
  const {
    uiCoins,
    uiEquippedWeapon,
    uiEquippedArmor,
    uiEquippedOutfit,
    uiEquippedHat,
    uiEquippedNecklace,
    uiEquippedRing,
    uiInventory,
    uiStats,
    companionId,
    companionName,
    companionGender,
    companionCoins,
    companionInventory,
    companionEquipment,
    companionStats,
    gender,
    setGender,
    syncSidebar,
    formatItemName: pretty,
    charName,
    getItemSlot, // Destructure this
  } = useEntityStats();

  const [stats, setStats] = useState({ STR_BASE: 8, CHA_BASE: 8, WIT_BASE: 8, HP_BASE: 8, SP_BASE: 8 });
  const [name, setName] = useState(""); // NEW: Name State
  const STAT_POOL = 50;

  function unlockAchievement(id: string) {
    if (!achievements[id]) {
      setAchievements(prev => ({ ...prev, [id]: true }));
      const ach = [
        { id: "victory", name: "Victory!", desc: "Defeat the goblin" },
        { id: "peaceful", name: "A Peaceful Resolution", desc: "Surrender to the goblin or persuade it to surrender" },
        { id: "decked_out", name: "Decked Out", desc: "Equip three pieces of gear" }
      ].find(a => a.id === id);

      if (ach) {
        setNotification({ ...ach, type: "achievement", status: "entering" });
        setTimeout(() => setNotification(prev => prev ? { ...prev, status: "active" } : null), 1000);
        setTimeout(() => setNotification(prev => prev ? { ...prev, status: "exiting" } : null), 6000);
        setTimeout(() => setNotification(null), 6500);
      }
    }
  }

  const {
    story,
    lines,
    choices,
    activeSlot,
    slotHasSave,
    isTransitioning,
    startFreshInSlot,
    loadSlot,
    clearSlot,
    choose,
    backToMenu,
    refreshSlotPresence,
    transferItemToCompanion,
    transferItemFromCompanion,
    getCompanionDesc,
    equipItem,
    unequipItem,
    dropItem,
    useItem,
    transferCoinsFromCompanion,
    equipCompanionItem,
    unequipCompanionItem,
    dropCompanionItem,
    useCompanionItem,
    checkCompanionRefusal,
    getRefusalText,
    getOutfitReactionText,
    jumpTo
  } = useInkGame({ syncSidebar, setMode, setMenuView, unlockAchievement });

  // Transfer Logic
  const [transferItem, setTransferItem] = useState<{ id: string, name: string } | null>(null);
  const [dropItemTarget, setDropItemTarget] = useState<{ id: string, name: string } | null>(null);
  const [useItemTarget, setUseItemTarget] = useState<{ id: string, name: string } | null>(null);

  // Companion Action Logic
  const [refusalModal, setRefusalModal] = useState<{ isOpen: boolean; message: string }>({ isOpen: false, message: "" });
  const [reactionModal, setReactionModal] = useState<{ isOpen: boolean; message: string }>({ isOpen: false, message: "" });
  const [companionDropTarget, setCompanionDropTarget] = useState<{ id: string, name: string } | null>(null);
  const [companionUseTarget, setCompanionUseTarget] = useState<{ id: string, name: string } | null>(null);

  useEffect(() => {
    if (mode !== "game" || !story) return;

    // Check if already ending/ended to avoid loops
    const currentReason = story.variablesState["death_reason"] as string;
    if (currentReason) return;

    // Check HP (Death)
    if (uiStats.HP.cur <= 0) {
      story.variablesState["death_reason"] = "hp";
      jumpTo("the_end");
      return;
    }

    // Check SP (Ascension)
    if (uiStats.SP.max > 0 && uiStats.SP.cur >= uiStats.SP.max) {
      story.variablesState["death_reason"] = "sp";
      jumpTo("the_end");
      return;
    }
  }, [uiStats.HP.cur, uiStats.SP.cur, uiStats.SP.max, mode, story, jumpTo]);

  function requestTransferToCompanion(itemId: string) {
    setTransferItem({ id: itemId, name: pretty(itemId) });
  }

  function confirmTransfer() {
    if (transferItem) {
      transferItemToCompanion(transferItem.id);
      setTransferItem(null);
    }
  }

  function requestDrop(itemId: string) {
    setDropItemTarget({ id: itemId, name: pretty(itemId) });
  }

  function confirmDrop() {
    if (dropItemTarget) {
      dropItem(dropItemTarget.id);
      setDropItemTarget(null);
    }
  }

  function requestUse(itemId: string) {
    setUseItemTarget({ id: itemId, name: pretty(itemId) });
  }

  function confirmUse() {
    if (useItemTarget) {
      useItem(useItemTarget.id);
      setUseItemTarget(null);
    }
  }

  // Wrappers for Companion Actions
  const handleCompanionInteract = (action: () => void) => {
    const canAct = checkCompanionRefusal();
    if (canAct) {
      action();
    } else {
      setRefusalModal({ isOpen: true, message: getRefusalText() });
    }
  };

  const handleCompanionEquip = (itemId: string, slot: string) => {
    handleCompanionInteract(() => equipCompanionItem(itemId, slot));
  };

  const handleCompanionUnequip = (slot: string) => {
    handleCompanionInteract(() => {
      unequipCompanionItem(slot);
      if (slot === "outfit") {
        setReactionModal({ isOpen: true, message: getOutfitReactionText() });
      }
    });
  };

  // Note: For Take, we keep the notification style? No, user said "remove checks/stopsigns... use grey popup".
  // So Take should updates too!
  function handleTakeFromCompanion(itemId: string) {
    handleCompanionInteract(() => {
      const isOutfit = itemId === companionEquipment.outfit;
      const result = transferItemFromCompanion(itemId); // checking inside too, but frontend check first for UX
      if (result.success) {
        if (isOutfit) {
          setReactionModal({ isOpen: true, message: getOutfitReactionText() });
        }
        // Success feedback? Maybe small notification or just inventory update.
        // Existing code used notification. User said remove it logic entirely.
        // But we need feedback "Item Taken".
        // I'll leave the success notification for now as "refusal" was the main point.
        // Actually, logic is: "remove checkmark and stopsign popups".
        // Stop sign = refusal. Checkmark = success.
        // So I should remove SUCCESS notification too?
        // "clicking a greyed out button... will create a grey popup... if rep does meet threshold... function as normal"
        // Usually "normal" implies silent update or subtle.
        // I will remove the explicit full screen notification for success/fail and rely on RefusalModal for fail. 
      }
    });
  }

  function confirmCompanionDrop() {
    if (companionDropTarget) {
      const isOutfit = companionDropTarget.id === companionEquipment.outfit;
      dropCompanionItem(companionDropTarget.id);
      setCompanionDropTarget(null);
      if (isOutfit) {
        setReactionModal({ isOpen: true, message: getOutfitReactionText() });
      }
    }
  }

  function confirmCompanionUse() {
    if (companionUseTarget) {
      useCompanionItem(companionUseTarget.id);
      setCompanionUseTarget(null);
    }
  }

  function handleTakeCoins() {
    // This button was also requested to be gated?
    // "add the equip... to... companion. all buttons... should be greyed out".
    // "Take Coins" is separate. But probably should follow rule.
    // I'll apply same logic.
    const canAct = checkCompanionRefusal();
    if (canAct) {
      transferCoinsFromCompanion();
    } else {
      setRefusalModal({ isOpen: true, message: getRefusalText() });
    }
  }

  // Item Action Generators
  const getPlayerItemActions = (item: { id?: string; name: string; count: number }) => {
    if (!item.id) return [];
    const actions: any[] = [];
    const slot = getItemSlot(item.id);

    // Equip/Unequip Logic
    if (slot && slot !== "none" && slot !== "consumable") {
      const isEquipped = [uiEquippedWeapon, uiEquippedArmor, uiEquippedOutfit, uiEquippedHat, uiEquippedNecklace, uiEquippedRing].includes(item.id!);
      if (isEquipped) {
        actions.push({ label: "Unequip", color: "#9d4dff", onClick: () => unequipItem(slot) }); // Purple
      } else {
        actions.push({ label: "Equip", color: "#4dff4d", onClick: () => equipItem(item.id!, slot) }); // Green
      }
    }

    // Use Consumable
    if (slot === "consumable") {
      actions.push({ label: "Use", color: "#4d4dff", onClick: () => requestUse(item.id!) }); // Corrected to #4d4dff
    }

    // Drop
    actions.push({ label: "Drop", color: "#ff4d4d", onClick: () => requestDrop(item.id!) }); // Red

    // Give (if companion exists)
    if (companionId !== "npc_none") {
      actions.push({ label: "Give", color: "#ffd700", onClick: () => requestTransferToCompanion(item.id!) }); // Yellow
    }

    return actions;
  };

  const getCompanionItemActions = (item: { id?: string; name: string; count: number }) => {
    if (!item.id) return [];

    const canAct = checkCompanionRefusal();
    const greyColor = "#888888";
    const slot = getItemSlot(item.id);
    const actions: any[] = [];

    // Equip/Unequip Logic
    if (slot && slot !== "none" && slot !== "consumable") {
      // Check against companion equipment!
      const isEquipped = Object.values(companionEquipment).includes(item.id);

      if (isEquipped) {
        actions.push({
          label: "Unequip",
          color: canAct ? "#9d4dff" : greyColor,
          onClick: () => handleCompanionUnequip(slot)
        });
      } else {
        actions.push({
          label: "Equip",
          color: canAct ? "#4dff4d" : greyColor,
          onClick: () => handleCompanionEquip(item.id!, slot)
        });
      }
    }

    // Use Consumable
    if (slot === "consumable") {
      actions.push({
        label: "Use",
        color: canAct ? "#4d4dff" : greyColor,
        onClick: () => handleCompanionInteract(() => setCompanionUseTarget({ id: item.id!, name: pretty(item.id!) }))
      });
    }

    // Drop
    actions.push({
      label: "Drop",
      color: canAct ? "#ff4d4d" : greyColor,
      onClick: () => handleCompanionInteract(() => setCompanionDropTarget({ id: item.id!, name: pretty(item.id!) }))
    });

    // Take
    actions.push({
      label: "Take",
      color: canAct ? "#ffd700" : greyColor,
      onClick: () => handleTakeFromCompanion(item.id!)
    });

    return actions;
  };


  function confirmTheme() {
    setIsDarkMode(pendingDarkMode);
    localStorage.setItem("ink_theme", pendingDarkMode ? "dark" : "light");
    setMenuView("splash");
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("ink_theme");
    if (savedTheme) {
      const dark = savedTheme === "dark";
      setIsDarkMode(dark);
      setPendingDarkMode(dark);
    }
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastLineRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (lastLineRef.current && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = lastLineRef.current.offsetTop - 18;
    }
  }, [lines, choices, mode]);

  const bgColor = isDarkMode ? "#121212" : "#f5f5f5";
  const textColor = isDarkMode ? "#ffffff" : "#121212";
  const borderColor = isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";

  function beginNewGame(slot: number) {
    setPendingSlot(slot);
    setStats({ STR_BASE: 8, CHA_BASE: 8, WIT_BASE: 8, HP_BASE: 8, SP_BASE: 8 });
    setGender("male");
    setName(""); // Reset Name
    setMode("stats");
    setShowOverwriteConfirm(false);
  }

  function handleQuickNewGame() {
    // Find first slot that is null (empty)
    const emptySlot = slotHasSave.findIndex(s => s === null);
    if (emptySlot !== -1) {
      beginNewGame(emptySlot);
    } else {
      setMenuView("saves");
    }
  }

  function handleQuickContinue() {
    // Check if slotHasSave[activeSlot] is not null
    if (slotHasSave[activeSlot] !== null) {
      loadSlot(activeSlot);
    } else {
      // Find first non-null slot
      const firstSave = slotHasSave.findIndex(s => s !== null);
      if (firstSave !== -1) {
        setMenuView("saves");
      }
    }
  }

  function confirmStats() {
    if (pendingSlot === null) return;
    if (slotHasSave[pendingSlot] !== null) {
      setShowOverwriteConfirm(true);
    } else {
      executeStatsConfirm();
    }
  }

  function executeStatsConfirm() {
    if (pendingSlot === null) return;
    startFreshInSlot(pendingSlot, stats, gender, name); // Pass name
    setPendingSlot(null);
    setShowOverwriteConfirm(false);
  }

  return (
    <div style={{ height: "100vh", overflowY: "scroll", background: bgColor, color: textColor, transition: "background 0.3s ease, color 0.3s ease" }}>
      <main style={{ maxWidth: mode === "game" ? 1200 : 720, margin: "0 auto", padding: "40px 16px", width: "100%", boxSizing: "border-box" }}>
        {mode === "menu" && (
          <StartMenu
            menuView={menuView}
            setMenuView={setMenuView}
            isDarkMode={isDarkMode}
            pendingDarkMode={pendingDarkMode}
            setPendingDarkMode={setPendingDarkMode}
            confirmTheme={confirmTheme}
            isMobileView={isMobileView}
            setIsMobileView={setIsMobileView}
            slotHasSave={slotHasSave}
            handleQuickNewGame={handleQuickNewGame}
            handleQuickContinue={handleQuickContinue}
            achievements={achievements}
            loadSlot={loadSlot}
            beginNewGame={beginNewGame}
            showDeleteConfirm={showDeleteConfirm}
            setShowDeleteConfirm={setShowDeleteConfirm}
            clearSlot={clearSlot}
            borderColor={borderColor}
            textColor={textColor}
          />
        )}

        {mode === "stats" && (
          <CharacterCreator
            stats={stats}
            setStats={setStats}
            pool={STAT_POOL}
            gender={gender}
            setGender={setGender}
            name={name}
            setName={setName}
            confirmStats={confirmStats}
            onBack={() => { setMode("menu"); setMenuView("saves"); setPendingSlot(null); }}
            textColor={textColor}
            pendingSlot={pendingSlot}
            slotHasSave={slotHasSave}
            showOverwriteConfirm={showOverwriteConfirm}
            setShowOverwriteConfirm={setShowOverwriteConfirm}
            executeStatsConfirm={executeStatsConfirm}
            isDarkMode={isDarkMode}
          />
        )}

        {mode === "game" && (
          <div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16, justifyContent: "space-between", alignItems: "center" }}>
              <button onClick={backToMenu} style={{ background: "rgba(128,128,128,0.2)", border: "none", color: textColor, padding: "6px 12px", borderRadius: 6, cursor: "pointer" }}>Back to Menu</button>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => {
                    setShowCharacterMenu(!showCharacterMenu);
                    if (!showCharacterMenu) setShowCompanionMenu(false);
                  }}
                  style={{
                    background: showCharacterMenu ? "linear-gradient(90deg, #ff4d4d, #4d4dff)" : "rgba(128,128,128,0.2)",
                    border: "none", color: showCharacterMenu ? "#fff" : textColor,
                    padding: "6px 12px", borderRadius: 6, cursor: "pointer",
                    fontWeight: showCharacterMenu ? 700 : 400
                  }}
                >
                  {showCharacterMenu ? "Hide Character" : "Show Character"}
                </button>
                {companionId !== "npc_none" && (
                  <button
                    onClick={() => {
                      setShowCompanionMenu(!showCompanionMenu);
                      if (!showCompanionMenu) setShowCharacterMenu(false);
                    }}
                    style={{
                      background: showCompanionMenu ? "linear-gradient(90deg, #ff4d4d, #4d4dff)" : "rgba(128,128,128,0.2)",
                      border: "none", color: showCompanionMenu ? "#fff" : textColor,
                      padding: "6px 12px", borderRadius: 6, cursor: "pointer",
                      fontWeight: showCompanionMenu ? 700 : 400
                    }}
                  >
                    {showCompanionMenu ? "Hide Companion" : "Show Companion"}
                  </button>
                )}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: isMobileView ? "column" : "row", gap: 16, alignItems: isMobileView ? "stretch" : "flex-start" }}>
              {/* Mobile Character Menu - Shown above dialogue when visible */}
              {isMobileView && showCharacterMenu && (
                <SideMenu
                  title={charName || `Slot ${activeSlot + 1}`}
                  coins={uiCoins}
                  stats={uiStats}
                  gender={gender}
                  equipment={{
                    weapon: uiEquippedWeapon, armor: uiEquippedArmor, outfit: uiEquippedOutfit,
                    hat: uiEquippedHat, necklace: uiEquippedNecklace, ring: uiEquippedRing
                  }}
                  inventory={uiInventory}
                  isMobile={true}
                  isDarkMode={isDarkMode}
                  borderColor={borderColor}
                  textColor={textColor}
                  bgColor={bgColor}
                  formatItemName={pretty}
                  baseHP={stats.HP_BASE}
                  baseSP={stats.SP_BASE}
                  onTransfer={undefined} // Handled by getItemActions
                  transferLabel={undefined}
                  getItemActions={getPlayerItemActions}
                />
              )}

              {/* Mobile Companion Menu - Shown above dialogue when visible */}
              {isMobileView && showCompanionMenu && (
                <SideMenu
                  title={companionName}
                  coins={companionCoins}
                  stats={companionStats}
                  gender={companionGender}
                  equipment={companionEquipment}
                  inventory={companionInventory}
                  isMobile={true}
                  isDarkMode={isDarkMode}
                  borderColor={borderColor}
                  textColor={textColor}
                  bgColor={bgColor}
                  formatItemName={pretty}
                  baseHP={companionStats.HP.max - (companionStats.HP.bonus || 0)}
                  baseSP={companionStats.SP.max - (companionStats.SP.bonus || 0)}
                  isCompanion={true}
                  description={getCompanionDesc()}
                  onTransfer={undefined} // Handled by getItemActions
                  transferLabel={undefined}
                  onTakeCoins={handleTakeCoins}
                  getItemActions={getCompanionItemActions}
                />
              )}


              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Dialogue Box */}
                <div
                  ref={scrollContainerRef}
                  style={{
                    height: "55vh",
                    overflowY: "auto",
                    border: `1px solid ${borderColor}`,
                    borderRadius: 12,
                    padding: 20,
                    background: isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.8)",
                    scrollBehavior: "smooth",
                    position: "relative"
                  }}
                >
                  <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6, fontSize: 15 }}>
                    {lines.map((t, idx) => (
                      <p
                        key={idx}
                        ref={idx === lines.length - 1 ? lastLineRef : null}
                        style={{ marginTop: 0, marginBottom: 16 }}
                      >
                        {t}
                      </p>
                    ))}
                  </div>

                  <div style={{ display: "grid", gap: 10, marginTop: 24, paddingBottom: "65vh" }}>
                    {choices.map(c => (
                      <button key={c.index} onClick={() => choose(c.index)} style={{ textAlign: "left", padding: "12px 18px", background: "rgba(128,128,128,0.1)", border: `1px solid ${borderColor}`, borderRadius: 8, color: textColor, cursor: "pointer", transition: "all 0.2s ease" }}>
                        {c.text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Form */}
                <FeedbackForm
                  textColor={textColor}
                  bgColor={isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.8)"}
                  borderColor={borderColor}
                />
              </div>

              {/* Desktop Character Menu - Shown to the right when visible */}
              {!isMobileView && showCharacterMenu && (
                <SideMenu
                  title={charName || `Slot ${activeSlot + 1}`}
                  coins={uiCoins}
                  stats={uiStats}
                  gender={gender}
                  equipment={{
                    weapon: uiEquippedWeapon, armor: uiEquippedArmor, outfit: uiEquippedOutfit,
                    hat: uiEquippedHat, necklace: uiEquippedNecklace, ring: uiEquippedRing
                  }}
                  inventory={uiInventory}
                  isMobile={false}
                  isDarkMode={isDarkMode}
                  borderColor={borderColor}
                  textColor={textColor}
                  bgColor={bgColor}
                  formatItemName={pretty}
                  baseHP={stats.HP_BASE}
                  baseSP={stats.SP_BASE}
                  onTransfer={undefined} // Handled by getItemActions
                  transferLabel={undefined}
                  getItemActions={getPlayerItemActions}
                />
              )}

              {/* Desktop Companion Menu - Shown to the right when visible */}
              {!isMobileView && showCompanionMenu && (
                <SideMenu
                  title={companionName}
                  coins={companionCoins}
                  stats={companionStats}
                  gender={companionGender}
                  equipment={companionEquipment}
                  inventory={companionInventory}
                  isMobile={false}
                  isDarkMode={isDarkMode}
                  borderColor={borderColor}
                  textColor={textColor}
                  bgColor={bgColor}
                  formatItemName={pretty}
                  baseHP={companionStats.HP.max - (companionStats.HP.bonus || 0)}
                  baseSP={companionStats.SP.max - (companionStats.SP.bonus || 0)}
                  isCompanion={true}
                  description={getCompanionDesc()}
                  onTransfer={undefined} // Handled by getItemActions
                  transferLabel={undefined}
                  onTakeCoins={handleTakeCoins}
                  getItemActions={getCompanionItemActions}
                />
              )}
            </div>
          </div>
        )
        }
      </main >

      {/* Transfer Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!transferItem}
        title="Give Item?"
        message={<>Are you sure you want to give <strong>{transferItem?.name}</strong> to {companionName}?</>}
        subtext="You may not be able to get it back."
        confirmLabel="Give Item"
        confirmColor="#ffd700"
        confirmTextColor="#000"
        onConfirm={confirmTransfer}
        onCancel={() => setTransferItem(null)}
        isDarkMode={isDarkMode}
      />

      {/* Drop Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!dropItemTarget}
        title="Drop Item?"
        message={<>Are you sure you want to drop <strong>{dropItemTarget?.name}</strong>?</>}
        subtext="It will be lost forever."
        confirmLabel="Drop Item"
        confirmColor="#ff4d4d"
        onConfirm={confirmDrop}
        onCancel={() => setDropItemTarget(null)}
        isDarkMode={isDarkMode}
      />

      {/* Use Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!useItemTarget}
        title="Use Item?"
        message={<>Are you sure you want to use <strong>{useItemTarget?.name}</strong>?</>}
        subtext="Has single use."
        confirmLabel="Use Item"
        confirmColor="#4d4dff"
        onConfirm={confirmUse}
        onCancel={() => setUseItemTarget(null)}
        isDarkMode={isDarkMode}
      />

      {/* Companion Drop Modal */}
      <ConfirmationModal
        isOpen={!!companionDropTarget}
        title="Drop Item?"
        message={<>Are you sure you want to drop <strong>{companionDropTarget?.name}</strong> from {companionName}&apos;s inventory?</>}
        subtext="It will be lost forever."
        confirmLabel="Drop Item"
        confirmColor="#ff4d4d"
        onConfirm={confirmCompanionDrop}
        onCancel={() => setCompanionDropTarget(null)}
        isDarkMode={isDarkMode}
      />

      {/* Companion Use Modal */}
      <ConfirmationModal
        isOpen={!!companionUseTarget}
        title="Use Item?"
        message={<>Are you sure you want to use <strong>{companionUseTarget?.name}</strong> on {companionName}?</>}
        subtext="Has single use."
        confirmLabel="Use Item"
        confirmColor="#4d4dff"
        onConfirm={confirmCompanionUse}
        onCancel={() => setCompanionUseTarget(null)}
        isDarkMode={isDarkMode}
      />

      {/* Refusal Modal (Grey) */}
      <ConfirmationModal
        isOpen={refusalModal.isOpen}
        title="Refused"
        message={<>{refusalModal.message}</>}
        subtext="You need a higher reputation."
        confirmLabel="OK"
        confirmColor="#888888"
        confirmTextColor="#fff"
        showCancel={false}
        onConfirm={() => setRefusalModal({ isOpen: false, message: "" })}
        onCancel={() => setRefusalModal({ isOpen: false, message: "" })}
        isDarkMode={isDarkMode}
      />

      {/* Reaction Modal (Purple) */}
      <ConfirmationModal
        isOpen={reactionModal.isOpen}
        title={`You removed ${companionName}'s outfit.`}
        message={<>{reactionModal.message}</>}
        confirmLabel="Continue"
        confirmColor="#9d4dff"
        confirmTextColor="#fff"
        showCancel={false}
        onConfirm={() => setReactionModal({ isOpen: false, message: "" })}
        onCancel={() => setReactionModal({ isOpen: false, message: "" })}
        isDarkMode={isDarkMode}
      />

      {/* Achievement Notification Popup */}
      {
        notification && (
          <div style={{
            position: "fixed", top: 20, right: 20, zIndex: 3000,
            background: isDarkMode ? "#1e1e1e" : "#fff",
            border: notification.type === "refusal" ? "2px solid rgba(255, 77, 77, 0.8)" :
              notification.type === "info" ? "2px solid rgba(77, 255, 77, 0.8)" :
                "2px solid rgba(77,77,255,0.8)", // Default/Achievement
            borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            animation: notification.status === "entering" ? "slideInRight 0.5s ease forwards" : notification.status === "exiting" ? "slideOutRight 0.5s ease forwards" : "none"
          }}>
            <div style={{
              position: "relative", width: 56, height: 56,
              background: isDarkMode ? "transparent" : "rgba(255,255,255,0.4)",
              border: notification.type === "refusal" ? "2px solid rgba(255, 77, 77, 0.8)" :
                notification.type === "info" ? "2px solid rgba(77, 255, 77, 0.8)" :
                  "2px solid rgba(77,77,255,0.8)",
              borderRadius: 12, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: notification.type === "refusal" ? "0 0 10px rgba(255, 77, 77, 0.3)" :
                notification.type === "info" ? "0 0 10px rgba(77, 255, 77, 0.3)" :
                  "0 0 10px rgba(77,77,255,0.3)"
            }}>
              {notification.type === "achievement" ? (
                <svg viewBox="0 0 24 24" style={{ width: "70%", height: "70%" }}>
                  <defs>
                    <linearGradient id="pop-grad-vertical" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ff4d4d" />
                      <stop offset="100%" stopColor="#4d4dff" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M19,5h-2V3H7v2H5C3.9,5,3,5.9,3,7v1c0,2.5,1.9,4.6,4.3,4.9c0.7,1.1,1.7,2,3,2.4V19H7v2h10v-2h-3.3v-3.7c1.2-0.4,2.2-1.3,3-2.4C19.1,12.6,21,10.5,21,8V7C21,5.9,20.1,5,19,5z M5,8V7h2v3.8C5.6,10.3,5,9.2,5,8z M19,8c0,1.2-0.6,2.3-1.6,2.8V7h2V8z"
                    fill="rgba(128,128,128,0.4)"
                  />
                  <path
                    d="M19,5h-2V3H7v2H5C3.9,5,3,5.9,3,7v1c0,2.5,1.9,4.6,4.3,4.9c0.7,1.1,1.7,2,3,2.4V19H7v2h10v-2h-3.3v-3.7c1.2-0.4,2.2-1.3,3-2.4C19.1,12.6,21,10.5,21,8V7C21,5.9,20.1,5,19,5z M5,8V7h2v3.8C5.6,10.3,5,9.2,5,8z M19,8c0,1.2-0.6,2.3-1.6,2.8V7h2V8z"
                    fill="url(#pop-grad-vertical)"
                    style={{
                      clipPath: notification.status === "active" ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
                      transition: "clip-path 0.5s ease-out"
                    }}
                  />
                </svg>
              ) : notification.type === "refusal" ? (
                <div style={{ fontSize: 24 }}>🛑</div>
              ) : (
                <div style={{ fontSize: 24 }}>✅</div>
              )}
            </div>
            <div>
              <div style={{ position: "relative" }}>
                {notification.type === "achievement" && (
                  <>
                    <div style={{
                      fontWeight: 800, fontSize: 16, marginBottom: 2,
                      color: "rgba(128,128,128,0.6)"
                    }}>
                      Achievement Unlocked!
                    </div>
                    <div style={{
                      position: "absolute", top: 0, left: 0,
                      fontWeight: 800, fontSize: 16, width: "100%",
                      background: "linear-gradient(90deg, #ff4d4d, #4d4dff)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      clipPath: notification.status === "active" ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                      transition: "clip-path 0.5s ease-out",
                      pointerEvents: "none"
                    }}>
                      Achievement Unlocked!
                    </div>
                  </>
                )}
                {notification.type !== "achievement" && (
                  <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 2, color: notification.type === "refusal" ? "#ff4d4d" : "#4dff4d" }}>
                    {notification.name}
                  </div>
                )}
              </div>
              {notification.type === "achievement" ? (
                <>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{notification.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.6 }}>{notification.desc}</div>
                </>
              ) : (
                <div style={{ fontSize: 13, opacity: 0.8 }}>{notification.desc}</div>
              )}
            </div>
          </div>
        )
      }

      {/* Screen Transition Overlay */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: bgColor, zIndex: 4000, pointerEvents: "none",
        opacity: isTransitioning ? 1 : 0, transition: "opacity 0.5s ease"
      }} />


    </div >
  );
}