import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { updateUserProfile } from '@/lib/appwrite';
import useAuthStore from '@/store/auth.store';

const EditProfile = () => {
    const { user, updateUserLocal } = useAuthStore();
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: user?.name || '',
        phone: user?.phone ? String(user.phone) : '',
        address: user?.address || '',
    });

    const handleSave = async () => {
        if (!user) return;

        setIsSubmitting(true);

        try {
            const parsedPhone = parseInt(form.phone.replace(/[^0-9-]/g, ''), 10);

            if (isNaN(parsedPhone)) {
                Alert.alert('Error', 'Please enter a valid phone number (digits only).');
                setIsSubmitting(false);
                return;
            }

            // Send to Appwrite Database
            const updatedDoc = await updateUserProfile(user.$id, {
                name: form.name,
                phone: parsedPhone,
                address: form.address,
            });

            // Update local Zustand store so changes show immediately
            updateUserLocal({
                name: form.name,
                phone: parsedPhone,
                address: form.address,
            });

            Alert.alert('Success', 'Profile updated successfully!');
            router.back();
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to update profile');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 py-4">
                    <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold">Edit Profile</Text>
                    <View className="w-8" />
                </View>

                {/* Form fields */}
                <View className="px-5 mt-4 gap-y-4">
                    <CustomInput
                        label="Full Name"
                        placeholder="John Doe"
                        value={form.name}
                        onChangeText={(text) => setForm(prev => ({ ...prev, name: text }))}
                    />

                    <CustomInput
                        label="Phone Number"
                        placeholder="5551234567"
                        value={form.phone}
                        keyboardType="phone-pad"
                        onChangeText={(text) => setForm(prev => ({ ...prev, phone: text }))}
                    />

                    <CustomInput
                        label="Address"
                        placeholder="123 Main Street"
                        value={form.address}
                        onChangeText={(text) => setForm(prev => ({ ...prev, address: text }))}
                    />
                </View>

                {/* Save Button */}
                <View className="px-5 mt-10 mb-10">
                    <CustomButton
                        title="Save Details"
                        isLoading={isSubmitting}
                        onPress={handleSave}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfile;
