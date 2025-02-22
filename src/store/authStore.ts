import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { mmkvStorage } from './storage'

interface AuthStore {
	user: Record<string, any> | null
	currentOrder: Record<string, any> | null
	setUser: (user: any) => void
	setCurrentOrder: (order: any) => void
	logout: () => void
}

export const useAuthStore = create<AuthStore>()(
	persist(
		(set, get) => ({
			user: null,
			currentOrder: null,
			setUser: (user: any) => set({ user }),
			setCurrentOrder: (order: any) => set({ currentOrder: order }),
			logout: () => set({ user: null, currentOrder: null }),
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => mmkvStorage),
		},
	),
)
