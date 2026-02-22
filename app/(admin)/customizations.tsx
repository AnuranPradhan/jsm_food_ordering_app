import { deleteCustomization, getAllCustomizations } from '@/lib/appwrite';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AdminCustomizations = () => {
    const router = useRouter();
    const [customizations, setCustomizations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCustomizations = async () => {
        setIsLoading(true);
        try {
            const data = await getAllCustomizations();
            setCustomizations(data);
        } catch (error: any) {
            Alert.alert("Error fetching Customizations", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomizations();
    }, []);

    const handleDelete = (id: string, name: string) => {
        Alert.alert(
            "Delete Customization",
            `Are you sure you want to delete '${name}'?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteCustomization(id);
                            fetchCustomizations();
                        } catch (error: any) {
                            Alert.alert('Error', error.message);
                        }
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }: { item: any }) => (
        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-row items-center justify-between mb-3 px-5">
            <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-4">
                    <Ionicons name="options-outline" size={20} color="#3b82f6" />
                </View>
                <View className="flex-1 pr-4">
                    <Text className="text-base font-bold text-gray-800" numberOfLines={1}>{item.name}</Text>
                    <Text className="text-gray-500 text-sm mt-1">Multi-Select: {item.isMultipleChoice ? 'Yes' : 'No'}</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => handleDelete(item.$id, item.name)}
                className="p-2"
            >
                <Ionicons name="trash-outline" size={24} color="#ef4444" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50 bg-white" edges={['top']}>
            <View className="flex-row items-center justify-between px-5 pt-4 pb-6 bg-white shadow-sm z-10 mb-4">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-bold">Manage Customizations</Text>
                <View className="flex-row">
                    <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'Customization creation mapped to Version 2.')}>
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
                    data={customizations}
                    keyExtractor={(item) => item.$id}
                    renderItem={renderItem}
                    contentContainerClassName="pb-20 px-2"
                    ListEmptyComponent={
                        <View className="items-center justify-center pt-20">
                            <Ionicons name="options-outline" size={60} color="#ccc" />
                            <Text className="text-gray-500 text-lg mt-4">No Customizations found.</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
};

export default AdminCustomizations;
