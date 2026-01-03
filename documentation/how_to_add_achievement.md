# How to Add an Achievement

This guide outlines the steps to add a new achievement to the game.

## Overview
Achievements are tracked in the React state and persisted to `localStorage`. They are triggered when specific conditions are met during the game (checked dynamically in `syncSidebar`).

## Steps

### 1. Update the Initial State
In `app/page.tsx`, look for the `achievements` state definition. Add your new achievement ID with a default value of `false` in the lazy initializer.

```tsx
const [achievements, setAchievements] = useState<Record<string, boolean>>(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("ink_achievements");
    if (saved) return JSON.parse(saved);
  }
  return { 
    victory: false, 
    peaceful: false, 
    decked_out: false,
    MY_NEW_ACHIEVEMENT: false // Add this
  };
});
```

### 2. Add Notification Metadata
In the `unlockAchievement` function, add your achievement to the list used for popup notifications.

```tsx
function unlockAchievement(id: string) {
  if (!achievements[id]) {
    setAchievements(prev => ({ ...prev, [id]: true }));
    const ach = [
      // ...
      { id: "MY_NEW_ACHIEVEMENT", name: "Achievement Name", desc: "Detailed description here" }
    ].find(a => a.id === id);
    // ...
  }
}
```

### 3. Add Menu Metadata
Add the achievement to the Achievements menu rendering logic so it appears in the collection view.

```tsx
{menuView === "achievements" && (
  // ...
  {[
    // ...
    { id: "MY_NEW_ACHIEVEMENT", name: "Achievement Name", desc: "Detailed description here" }
  ].map(ach => (
    // ...
  ))}
)}
```

### 4. Implement the Trigger Logic
Most achievements are checked in `syncSidebar`, which runs whenever the game state updates (e.g., when a choice is made or the UI is synced).

#### Case A: Check an Ink Variable
If your achievement depends on something that happens in the story, ensure you have a variable defined in your `.ink` files (e.g., `VAR has_found_secret = false`).

Then, in `syncSidebar`:
```tsx
if ((s as any).variablesState["has_found_secret"]) unlockAchievement("MY_NEW_ACHIEVEMENT");
```

#### Case B: Check a React/State Condition
You can also trigger achievements based on React state (like coins, equipment count, etc.):
```tsx
if (uiCoins >= 1000) unlockAchievement("MY_NEW_ACHIEVEMENT");
```

---

## Summary Checklist
- [ ] Add ID to `achievements` state initial Record.
- [ ] Add metadata to `unlockAchievement` list.
- [ ] Add metadata to Achievements menu display map.
- [ ] Add trigger check in `syncSidebar`.
