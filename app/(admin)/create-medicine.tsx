import { createMenuItem, getCategories } from '@/lib/appwrite';
import { Category } from '@/type';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateMedicine = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        image_url: '',
        categories: '',
    });

    const [categoriesList, setCategoriesList] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCats = await getCategories();
                setCategoriesList(fetchedCats);
                if (fetchedCats.length > 0) {
                    setForm(prev => ({ ...prev, categories: fetchedCats[0].$id }));
                }
            } catch {
                Alert.alert("Error", "Could not fetch categories");
            } finally {
                setIsLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCreate = async () => {
        if (!form.name || !form.description || !form.price || !form.categories) {
            Alert.alert("Error", "Please fill in all required fields");
            return;
        }

        setIsLoading(true);
        try {
            await createMenuItem({
                name: form.name,
                description: form.description,
                price: parseFloat(form.price),
                image_url: form.image_url,
                rating: 5.0, // Default rating for new products
                categories: form.categories,
            });

            Alert.alert("Success", "Medicine created successfully!");
            router.back();
        } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to create medicine");
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
                <Text className="text-xl font-bold">Add Medicine</Text>
                <View className="w-8" />
            </View>

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
                <View className="mb-4">
                    <Text className="text-sm font-bold text-gray-500 mb-2">Medicine Name</Text>
                    <TextInput
                        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-base"
                        placeholder="e.g. Paracetamol 500mg"
                        value={form.name}
                        onChangeText={(text) => setForm({ ...form, name: text })}
                    />
                </View>

                <View className="mb-4">
                    <Text className="text-sm font-bold text-gray-500 mb-2">Description</Text>
                    <TextInput
                        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-base"
                        placeholder="Medicine details..."
                        value={form.description}
                        multiline
                        textAlignVertical="top"
                        style={{ height: 100 }}
                        onChangeText={(text) => setForm({ ...form, description: text })}
                    />
                </View>

                <View className="flex-row gap-4 mb-4">
                    <View className="flex-1">
                        <Text className="text-sm font-bold text-gray-500 mb-2">Price ($)</Text>
                        <TextInput
                            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-base"
                            placeholder="0.00"
                            keyboardType="numeric"
                            value={form.price}
                            onChangeText={(text) => setForm({ ...form, price: text })}
                        />
                    </View>
                </View>

                <View className="mb-4">
                    <Text className="text-sm font-bold text-gray-500 mb-2">Image URL</Text>
                    <TextInput
                        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-base"
                        placeholder="https://example.com/image.png"
                        value={form.image_url}
                        onChangeText={(text) => setForm({ ...form, image_url: text })}
                    />
                    <Text className="text-xs text-gray-400 mt-1">Provide a direct link to an image representation.</Text>
                </View>

                <View className="mb-8">
                    <Text className="text-sm font-bold text-gray-500 mb-2">Category</Text>
                    {isLoadingCategories ? (
                        <ActivityIndicator color="#16a34a" />
                    ) : (
                        <View className="flex-row flex-wrap gap-2">
                            {categoriesList.map((cat) => (
                                <TouchableOpacity
                                    key={cat.$id}
                                    onPress={() => setForm({ ...form, categories: cat.$id })}
                                    className={`px-4 py-2 rounded-full border ${form.categories === cat.$id ? 'border-[#16a34a] bg-green-50' : 'border-gray-200 bg-white'}`}
                                >
                                    <Text className={`${form.categories === cat.$id ? 'text-[#16a34a] font-bold' : 'text-gray-500'}`}>{cat.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    onPress={handleCreate}
                    disabled={isLoading}
                    className={`bg-[#16a34a] py-4 rounded-xl items-center justify-center mb-10 ${isLoading ? 'opacity-70' : ''}`}
                >
                    {isLoading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white text-base font-bold">Create Medicine</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CreateMedicine;
