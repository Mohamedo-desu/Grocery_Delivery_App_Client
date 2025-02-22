import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";

export interface SettingsState {
  theme: "system" | "light" | "dark";
  setTheme: (theme: SettingsState["theme"]) => void;
}

// Create the store with persistence
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => {
        set({ theme });
      },
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
