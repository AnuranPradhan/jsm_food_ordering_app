import { deleteOrder, getAllOrders, updateOrderStatus } from '@/lib/appwrite';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AdminOrders = () => {
    const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const data = await getAllOrders();
            setOrders(data);
        } catch (error: any) {
            Alert.alert("Error fetching orders", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            await updateOrderStatus(id, newStatus);
            fetchOrders();
        } catch (error: any) {
            Alert.alert("Error updating order", error.message);
        }
    };

    const handleDelete = async (id: string) => {
        Alert.alert(
            "Delete Order",
            "Are you sure you want to permanently delete this order?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteOrder(id);
                            fetchOrders();
                        } catch (error: any) {
                            Alert.alert('Error deleting order', error.message);
                        }
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }: { item: any }) => (
        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4 px-5">
            <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1 pr-3">
                    <Text className="text-lg font-bold text-gray-800">{item.customerName}</Text>
                    <Text className="text-gray-500 text-sm mt-1">Payment: {item.paymentMethod}</Text>
                    <Text className="text-gray-500 text-sm mt-1">Phone: {item.phone && item.phone !== 0 ? item.phone : 'Not Provided'}</Text>
                    <Text className="text-gray-500 text-sm mt-1" numberOfLines={2}>Address: {item.address}</Text>

                    {/* Ordered Items Details */}
                    <View className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <Text className="text-xs font-bold text-gray-500 uppercase mb-2">Order Items:</Text>
                        {item.items && (() => {
                            try {
                                const parsedItems = JSON.parse(item.items);
                                return parsedItems.map((prod: any, idx: number) => (
                                    <View key={idx} className="mb-2">
                                        <Text className="text-gray-800 font-semibold text-sm">
                                            {prod.quantity}x {prod.name}
                                        </Text>
                                        {prod.customizations && prod.customizations.length > 0 && (
                                            <Text className="text-gray-500 text-xs ml-4 mt-0.5">
                                                + {prod.customizations.map((c: any) => c.name).join(', ')}
                                            </Text>
                                        )}
                                    </View>
                                ));
                            } catch (e) {
                                return <Text className="text-red-400 text-xs text-italic">Failed to load payload.</Text>;
                            }
                        })()}
                    </View>
                </View>
                <View className={`px-3 py-1 rounded-full ${item.status === 'Delivered' ? 'bg-green-100' : 'bg-orange-100'}`}>
                    <Text className={`font-bold text-xs ${item.status === 'Delivered' ? 'text-green-600' : 'text-orange-600'}`}>{item.status}</Text>
                </View>
            </View>
            <View className="border-t border-gray-100 my-3" />
            <View className="flex-row justify-between items-center">
                <Text className="text-lg font-bold text-primary">${item.totalAmount?.toFixed(2)}</Text>
                {item.status !== 'Delivered' ? (
                    <TouchableOpacity
                        onPress={() => handleUpdateStatus(item.$id, 'Delivered')}
                        className="bg-primary/10 px-4 py-2 rounded-lg"
                    >
                        <Text className="text-primary font-bold">Mark Delivered</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => handleDelete(item.$id)}
                        className="bg-red-100 px-4 py-2 rounded-lg"
                    >
                        <Text className="text-red-500 font-bold">Delete Order</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
            <View className="flex-row items-center justify-between px-5 pt-4 pb-6 bg-white shadow-sm z-10 mb-4">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-bold">Pharmacy Orders</Text>
                <View className="w-8" />
            </View>

            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#16a34a" />
                </View>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.$id}
                    renderItem={renderItem}
                    contentContainerClassName="pb-20 px-2"
                    ListEmptyComponent={
                        <View className="items-center justify-center pt-20">
                            <Ionicons name="receipt-outline" size={60} color="#ccc" />
                            <Text className="text-gray-500 text-lg mt-4">No incoming orders found.</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
};

export default AdminOrders;
