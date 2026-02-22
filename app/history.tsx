import CustomHeader from "@/components/CustomHeader";
import { getUserOrders } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const History = () => {
    const { user } = useAuthStore();
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.$id) return;
            try {
                const data = await getUserOrders(user.$id);
                setOrders(data);
            } catch (error: any) {
                Alert.alert("Error fetching orders", error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const renderItem = ({ item }: { item: any }) => {
        const orderDate = new Date(item.$createdAt);
        const formattedDate = format(orderDate, "MMM dd, yyyy • hh:mm a");

        return (
            <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
                <View className="flex-row justify-between items-center border-b border-gray-100 pb-3 mb-3">
                    <View>
                        <Text className="text-xs text-gray-500 font-medium">Order ID: #{item.$id.slice(-6).toUpperCase()}</Text>
                        <Text className="text-gray-400 text-xs mt-0.5">{formattedDate}</Text>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${item.status === 'Delivered' ? 'bg-green-100' : 'bg-orange-100'}`}>
                        <Text className={`font-bold text-xs ${item.status === 'Delivered' ? 'text-green-600' : 'text-orange-600'}`}>
                            {item.status}
                        </Text>
                    </View>
                </View>

                {item.items && (() => {
                    try {
                        const parsedItems = JSON.parse(item.items);
                        return parsedItems.map((prod: any, idx: number) => (
                            <View key={idx} className="flex-row justify-between mb-2">
                                <View className="flex-1 pr-2">
                                    <Text className="text-gray-800 font-semibold text-sm">
                                        {prod.quantity}x {prod.name}
                                    </Text>
                                    {prod.customizations && prod.customizations.length > 0 && (
                                        <Text className="text-gray-500 text-xs mt-0.5">
                                            + {prod.customizations.map((c: any) => c.name).join(', ')}
                                        </Text>
                                    )}
                                </View>
                                <Text className="text-gray-800 font-semibold text-sm">
                                    ${(prod.price * prod.quantity).toFixed(2)}
                                </Text>
                            </View>
                        ));
                    } catch (e) {
                        return <Text className="text-red-400 text-xs text-italic">Failed to load items.</Text>;
                    }
                })()}

                <View className="flex-row justify-between items-center border-t border-gray-100 mt-3 pt-3">
                    <Text className="text-gray-500 font-medium">Total Amount</Text>
                    <Text className="text-lg font-bold text-primary">${item.totalAmount.toFixed(2)}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={(item) => item.$id}
                contentContainerClassName="pb-28 px-5 pt-5"
                ListHeaderComponent={() => <CustomHeader title="Order History" />}
                ListEmptyComponent={() => (
                    <View className="flex-1 justify-center items-center mt-20">
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#0286FF" />
                        ) : (
                            <Text className="text-gray-500 text-base">You haven't placed any orders yet.</Text>
                        )}
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default History;
