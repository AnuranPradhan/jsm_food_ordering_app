import CartItem from "@/components/CartItem";
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import { createOrder } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { useCartStore } from "@/store/cart.store";
import { PaymentInfoStripeProps } from "@/type";
import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentInfoStripe = ({ label, value, labelStyle, valueStyle, }: PaymentInfoStripeProps) => (
    <View className="flex-between flex-row my-1">
        <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
            {label}
        </Text>
        <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
            {value}
        </Text>
    </View>
);

const Cart = () => {
    const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore();
    const { user } = useAuthStore();
    const router = useRouter();

    const [isCheckoutModalVisible, setCheckoutModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();
    const finalTotal = totalPrice + 5 - 0.5;

    const handleCheckout = async () => {
        if (!user) {
            Alert.alert("Error", "You must be logged in to place an order.");
            return;
        }

        if (!user.phone || user.phone === 0 || !user.address || user.address.trim() === '') {
            Alert.alert(
                "Profile Incomplete",
                "Please add your phone number and address in the Profile section before confirming your order."
            );
            setCheckoutModalVisible(false);
            return;
        }

        setIsSubmitting(true);
        try {
            await createOrder({
                accountId: user?.$id || "Guest",
                customerName: user?.name || "Anonymous User",
                items: JSON.stringify(items),
                totalAmount: finalTotal,
                status: "Pending",
                paymentMethod: "Cash on Delivery",
                address: user?.address || "Pickup / Not Provided",
                phone: user?.phone || 0
            });

            clearCart();
            setCheckoutModalVisible(false);
            router.replace('/order-confirmed');
        } catch (error: any) {
            Alert.alert("Checkout Failed", error.message || "An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="bg-white h-full relative">
            <FlatList
                data={items}
                renderItem={({ item }) => <CartItem item={item} />}
                keyExtractor={(item) => item.id}
                contentContainerClassName="pb-28 px-5 pt-5"
                ListHeaderComponent={() => <CustomHeader title="Your Cart" />}
                ListEmptyComponent={() => <Text>Cart Empty</Text>}
                ListFooterComponent={() => totalItems > 0 && (
                    <View className="gap-5">
                        <View className="mt-6 border border-gray-200 p-5 rounded-2xl">
                            <Text className="h3-bold text-dark-100 mb-5">
                                Payment Summary
                            </Text>

                            <PaymentInfoStripe
                                label={`Total Items (${totalItems})`}
                                value={`$${totalPrice.toFixed(2)}`}
                            />
                            <PaymentInfoStripe
                                label={`Delivery Fee`}
                                value={`$5.00`}
                            />
                            <PaymentInfoStripe
                                label={`Discount`}
                                value={`- $0.50`}
                                valueStyle="!text-success"
                            />
                            <View className="border-t border-gray-300 my-2" />
                            <PaymentInfoStripe
                                label={`Total`}
                                value={`$${(finalTotal).toFixed(2)}`}
                                labelStyle="base-bold !text-dark-100"
                                valueStyle="base-bold !text-dark-100 !text-right"
                            />
                        </View>

                        <CustomButton title="Order Now" onPress={() => setCheckoutModalVisible(true)} />
                    </View>
                )}
            />

            {/* Checkout Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isCheckoutModalVisible}
                onRequestClose={() => setCheckoutModalVisible(false)}
            >
                <View className="flex-1 justify-end bg-black/50">
                    <View className="bg-white rounded-t-3xl p-6 w-full shadow-lg">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-xl font-bold">Select Payment</Text>
                            <TouchableOpacity onPress={() => setCheckoutModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        {/* Payment Options */}
                        <TouchableOpacity className="flex-row items-center border border-gray-200 rounded-xl p-4 mb-6 bg-gray-50">
                            <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center mr-4">
                                <Ionicons name="cash-outline" size={24} color="#16a34a" />
                            </View>
                            <View className="flex-1">
                                <Text className="font-bold text-base">Cash on Delivery</Text>
                                <Text className="text-gray-500 text-sm">Pay when your medicines arrive</Text>
                            </View>
                            <Ionicons name="checkmark-circle" size={24} color="#F59E0B" />
                        </TouchableOpacity>

                        <Text className="text-center text-gray-400 mb-6 text-sm">
                            More payment options coming soon.
                        </Text>

                        <CustomButton
                            title={`Confirm Order - $${finalTotal.toFixed(2)}`}
                            isLoading={isSubmitting}
                            onPress={handleCheckout}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default Cart