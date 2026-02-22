import { deleteMenuItem, getMenu } from '@/lib/appwrite';
import { MenuItem } from '@/type';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AdminMenu = () => {
    const router = useRouter();
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMenu = async () => {
        setIsLoading(true);
        try {
            const data = await getMenu({ category: '', query: '' });
            setMenuItems(data as unknown as MenuItem[]);
        } catch (error: any) {
            Alert.alert("Error fetching Menu", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    const handleDelete = (id: string, name: string) => {
        Alert.alert(
            "Delete Menu Item",
            `Are you sure you want to completely delete '${name}'?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteMenuItem(id);
                            // Refresh list
                            fetchMenu();
                        } catch (error: any) {
                            Alert.alert('Error', error.message);
                        }
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }: { item: MenuItem }) => (
        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-row items-center justify-between mb-3 px-5">
            <View className="flex-row items-center flex-1">
                <Image
                    source={{ uri: item.image_url }}
                    className="w-12 h-12 rounded-lg bg-gray-100 mr-4"
                />
                <View className="flex-1 pr-4">
                    <Text className="text-base font-bold text-gray-800" numberOfLines={1}>{item.name}</Text>
                    <Text className="text-primary font-bold mt-1">${item.price}</Text>
                </View>
            </View>
            <View className="flex-row items-center gap-2">
                <TouchableOpacity
                    onPress={() => router.push(`/(admin)/edit-medicine/${item.$id}` as any)}
                    className="p-2"
                >
                    <Ionicons name="pencil-outline" size={24} color="#16a34a" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleDelete(item.$id, item.name)}
                    className="p-2"
                >
                    <Ionicons name="trash-outline" size={24} color="#ef4444" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
            <View className="flex-row items-center justify-between px-5 pt-4 pb-6 bg-white shadow-sm z-10 mb-4">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-bold">Manage Medicines</Text>
                <View className="flex-row">
                    <TouchableOpacity onPress={() => router.push('/(admin)/create-medicine' as any)}>
                        <Ionicons name="add-circle" size={28} color="#16a34a" />
                    </TouchableOpacity>
                </View>
            </View>

            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#16a34a" />
                </View>
            ) : (
                <FlatList
                    data={menuItems}
                    keyExtractor={(item) => item.$id}
                    renderItem={renderItem}
                    contentContainerClassName="pb-20 px-2"
                    ListEmptyComponent={
                        <View className="items-center justify-center pt-20">
                            <Ionicons name="medkit-outline" size={60} color="#ccc" />
                            <Text className="text-gray-500 text-lg mt-4">No Medicines found.</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
};

export default AdminMenu;
