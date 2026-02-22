import useAuthStore from '@/store/auth.store';
import { Redirect, Stack } from 'expo-router';

export default function AdminLayout() {
    const { isAdmin, isAuthenticated, isLoading } = useAuthStore();

    if (isLoading) return null; // Wait for state to hydrate

    // Protect the entire admin section
    if (!isAuthenticated || !isAdmin) {
        return <Redirect href="/(tabs)/profile" />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="dashboard" />
        </Stack>
    );
}
