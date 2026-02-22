import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderConfirmed = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white items-center justify-center px-5">
            <View className="items-center justify-center flex-1">
                {/* Visual Success Indicator */}
                <View className="w-24 h-24 rounded-full bg-green-100 items-center justify-center mb-6">
                    <Text className="text-4xl">🎉</Text>
                </View>

                <Text className="text-2xl font-bold text-center mb-2">
                    Order Confirmed!
                </Text>
                <Text className="text-gray-500 text-center text-base mb-10">
                    Your delicious meal is being prepared and will be with you shortly!
                </Text>
            </View>

            <View className="w-full mb-10">
                <CustomButton
                    title="Back to Home"
                    onPress={() => router.replace('/(tabs)')}
                />
            </View>
        </SafeAreaView>
    );
};

export default OrderConfirmed;
