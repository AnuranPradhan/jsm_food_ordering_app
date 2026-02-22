import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { appwriteConfig, getMenuItemById } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import { useCartStore } from '@/store/cart.store';
import { MenuItem } from '@/type';

const ItemDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { addItem } = useCartStore();

    const { data: itemData, loading } = useAppwrite({
        fn: getMenuItemById,
        params: { id },
    });

    const item = itemData as unknown as MenuItem;

    if (loading || !item) {
        return (
            <SafeAreaView className="flex-1 bg-white items-center justify-center">
                <ActivityIndicator size="large" color="#FFBF00" />
            </SafeAreaView>
        );
    }

    const imageUrl = `${item.image_url}?project=${appwriteConfig.projectId}`;

    const handleAddToCart = () => {
        addItem({
            id: item.$id,
            name: item.name,
            price: item.price,
            image_url: imageUrl,
            customizations: []
        });
        router.back(); // Go back after adding
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 pt-4">
                    <TouchableOpacity onPress={() => router.back()} className="p-2">
                        <Ionicons name="arrow-back" size={28} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2">
                        <Ionicons name="search" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Title and Rating */}
                <View className="px-5 mt-6 z-10 relative">
                    <Text className="text-3xl font-extrabold text-black">{item.name}</Text>
                    <Text className="text-gray-400 mt-1 mb-2 text-base">{item.categories?.name || 'Medicine'}</Text>

                    <View className="flex-row items-center gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Ionicons key={i} name={i < Math.floor(item.rating || 4.5) ? "star" : (i + 0.5 === (item.rating || 4.5) ? "star-half" : "star-outline")} size={16} color="#FBBF24" />
                        ))}
                        <Text className="text-gray-500 ml-1 font-semibold">{item.rating || 4.9}/5</Text>
                    </View>

                    <Text className="text-3xl font-extrabold mt-2 text-black"><Text className="text-primary text-xl font-bold">$</Text>{item.price?.toFixed(2)}</Text>
                </View>

                {/* Large Image (Overlapping to the right) */}
                <View className="absolute right-[-60px] top-[120px] z-0">
                    <Image source={{ uri: imageUrl }} className="w-[320px] h-[320px]" resizeMode="contain" />
                </View>

                {/* Info Chips */}
                <View className="flex-row mt-[140px] px-5">
                    <View className="bg-orange-50 px-5 py-4 rounded-[20px] flex-row items-center justify-between w-full">
                        <View className="flex-row items-center gap-2">
                            <Text className="text-primary font-bold">$</Text>
                            <Text className="font-semibold text-xs">Free Delivery</Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <Ionicons name="time" size={16} color="#F59E0B" />
                            <Text className="font-semibold text-xs">20 - 30 mins</Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <Ionicons name="star" size={16} color="#F59E0B" />
                            <Text className="font-semibold text-xs">{item.rating || 4.5}</Text>
                        </View>
                    </View>
                </View>

                {/* Description */}
                <View className="px-5 mt-6 mb-8">
                    <Text className="text-lg font-bold mb-2">Description</Text>
                    <Text className="text-gray-500 leading-6 text-[14px]">{item.description}</Text>
                </View>
            </ScrollView>

            {/* Bottom Add to Cart Button */}
            <View className="absolute bottom-7 w-full px-5 py-3 bg-white" style={{ borderTopWidth: 1, borderTopColor: '#f3f4f6' }}>
                <TouchableOpacity
                    onPress={handleAddToCart}
                    className="bg-primary py-4 rounded-full items-center justify-center flex-row"
                >
                    <Text className="text-white text-base font-bold">Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default ItemDetails;
