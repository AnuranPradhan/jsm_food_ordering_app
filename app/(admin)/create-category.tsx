import { createCategory } from '@/lib/appwrite';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateCategory = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        name: '',
        description: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = async () => {
        if (!form.name || !form.description) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            await createCategory({
                name: form.name,
                description: form.description,
            });

            Alert.alert("Success", "Category created successfully!");
            router.back();
        } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to create category");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
            <View className="flex-row items-center justify-between px-5 pt-4 pb-6 bg-white shadow-sm z-10 mb-4">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-bold">Add Category</Text>
                <View className="w-8" />
            </View>

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
                <View className="mb-4">
                    <Text className="text-sm font-bold text-gray-500 mb-2">Category Name</Text>
                    <TextInput
                        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-base"
                        placeholder="e.g. Pain Relief"
                        value={form.name}
                        onChangeText={(text) => setForm({ ...form, name: text })}
                    />
                </View>

                <View className="mb-8">
                    <Text className="text-sm font-bold text-gray-500 mb-2">Description</Text>
                    <TextInput
                        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-base"
                        placeholder="Category details..."
                        value={form.description}
                        multiline
                        textAlignVertical="top"
                        style={{ height: 100 }}
                        onChangeText={(text) => setForm({ ...form, description: text })}
                    />
                </View>

                <TouchableOpacity
                    onPress={handleCreate}
                    disabled={isLoading}
                    className={`bg-[#16a34a] py-4 rounded-xl items-center justify-center mb-10 ${isLoading ? 'opacity-70' : ''}`}
                >
                    {isLoading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white text-base font-bold">Create Category</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CreateCategory;
