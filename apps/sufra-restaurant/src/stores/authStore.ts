import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Manager } from "@/types/Manager";

type ManagerState = {
  manager: Manager | null;
  setManager: (manager: Manager) => void;
  clearManager: () => void;
};

export const useManagerStore = create<ManagerState>()(
  persist( (set, get, api) => ({
      manager: {
        managerID: 0,
        fname: "",
        lname: "",
        email: "",
        restaurantId: 0,
        restaurantName: "",
      },
      setManager: (data) => set({ manager: data }),
      clearManager: () => {
        set({ manager: null });
        api.persist.clearStorage(); 
      },
    }),
    {
      name: "manager-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);