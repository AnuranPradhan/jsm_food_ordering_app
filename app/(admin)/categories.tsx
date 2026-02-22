import { deleteCategory, getCategories } from '@/lib/appwrite';
import { Category } from '@/type';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AdminCategories = () => {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error: any) {
            Alert.alert("Error fetching Categories", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = (id: string, name: string) => {
        Alert.alert(
            "Delete Category",
            `Are you sure you want to delete '${name}'? This cannot be undone.`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteCategory(id);
                            // Refresh list
                            fetchCategories();
                        } catch (error: any) {
                            Alert.alert('Error', error.message);
                        }
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }: { item: Category }) => (
        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-row items-center justify-between mb-3 px-5">
            <View className="flex-row items-center">
                <View className="w-12 h-12 rounded-lg bg-green-100 mr-4 items-center justify-center">
                    <Ionicons name="grid-outline" size={24} color="#16a34a" />
                </View>
                <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
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
        <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
            <View className="flex-row items-center justify-between px-5 pt-4 pb-6 bg-white shadow-sm z-10 mb-4">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-bold">Manage Categories</Text>
                <View className="flex-row">
                    <TouchableOpacity onPress={() => router.push('/(admin)/create-category' as any)}>
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
                    data={categories}
                    keyExtractor={(item) => item.$id}
                    renderItem={renderItem}
                    contentContainerClassName="pb-20 px-2"
                    ListEmptyComponent={
                        <View className="items-center justify-center pt-20">
                            <Ionicons name="grid-outline" size={60} color="#ccc" />
                            <Text className="text-gray-500 text-lg mt-4">No Categories found.</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
};

export default AdminCategories;
