import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DashboardCard = ({ title, icon, onPress, color = '#16a34a' }: { title: string, icon: any, onPress: () => void, color?: string }) => (
    <TouchableOpacity
        onPress={onPress}
        className="w-full bg-white rounded-2xl p-5 flex-row items-center border border-gray-100 shadow-sm mb-4"
    >
        <View className="w-12 h-12 rounded-xl items-center justify-center mr-4" style={{ backgroundColor: `${color}15` }}>
            <Ionicons name={icon} size={24} color={color} />
        </View>
        <View className="flex-1">
            <Text className="text-lg font-bold text-gray-800">{title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
);

const AdminDashboard = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 pt-4 pb-6 bg-white shadow-sm z-10">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-bold">Admin Panel</Text>
                <View className="w-8" />
            </View>

            <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
                <Text className="text-gray-500 mb-6 text-base px-1">
                    Manage your restaurant menu, categories, and fulfill incoming user orders.
                </Text>

                <View className="mb-8">
                    <Text className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">Fulfillment</Text>
                    <DashboardCard
                        title="View Orders"
                        icon="receipt-outline"
                        color="#F59E0B"
                        onPress={() => router.push('/(admin)/orders')}
                    />
                </View>

                <View className="mb-10">
                    <Text className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">Catalog Management</Text>

                    <DashboardCard
                        title="Manage Categories"
                        icon="grid-outline"
                        onPress={() => router.push('/(admin)/categories')}
                    />

                    <DashboardCard
                        title="Manage Medicines"
                        icon="medkit-outline"
                        onPress={() => router.push('/(admin)/menu')}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AdminDashboard;
