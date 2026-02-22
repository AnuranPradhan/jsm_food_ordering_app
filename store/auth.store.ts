import { getCurrentUser, signOut } from "@/lib/appwrite";
import { User } from "@/type";
import { create } from 'zustand';

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    isAdmin: boolean;

    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: User | null) => void;
    updateUserLocal: (updates: Partial<User>) => void;
    setLoading: (loading: boolean) => void;
    setIsAdmin: (isAdmin: boolean) => void;

    fetchAuthenticatedUser: () => Promise<void>;
    logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: false,
    isAdmin: false,

    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setUser: (user) => set({ user }),
    updateUserLocal: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } as User : null
    })),
    setLoading: (value) => set({ isLoading: value }),
    setIsAdmin: (isAdmin) => set({ isAdmin }),

    fetchAuthenticatedUser: async () => {
        set({ isLoading: true });

        try {
            const user = await getCurrentUser();

            if (user) {
                // Determine Admin straight off the User object parameter
                const isAdmin = !!user.isAdmin;

                set({ isAuthenticated: true, user: user as unknown as User, isAdmin });
            }
            else set({ isAuthenticated: false, user: null, isAdmin: false });
        } catch (e) {
            console.log('fetchAuthenticatedUser error', e);
            set({ isAuthenticated: false, user: null, isAdmin: false })
        } finally {
            set({ isLoading: false });
        }
    },
    logout: async () => {
        try {
            await signOut();
            set({ isAuthenticated: false, user: null, isAdmin: false });
        } catch (e) {
            console.error('Logout error: ', e);
        }
    }
}))

export default useAuthStore;