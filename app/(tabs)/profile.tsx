import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProfileField from '@/components/ProfileField';
import useAuthStore from '@/store/auth.store';

const Profile = () => {
    const { user, logout, isAdmin } = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace('/(auth)/sign-in');
    };

    return (
        <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top', 'left', 'right']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 py-4">
                    <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold">Profile</Text>
                    <TouchableOpacity className="p-2 -mr-2">
                        <Ionicons name="search" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Avatar Section */}
                <View className="items-center mt-6 mb-8">
                    <View className="relative">
                        <View className="w-28 h-28 rounded-full overflow-hidden bg-orange-100 items-center justify-center">
                            {user?.avatar ? (
                                <Image
                                    source={{ uri: user.avatar }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                            ) : (
                                <Ionicons name="person" size={50} color="#F59E0B" />
                            )}
                        </View>
                        {/* Edit Icon Badge */}
                        <TouchableOpacity className="absolute bottom-0 right-1 w-8 h-8 bg-[#F59E0B] rounded-full items-center justify-center border-2 border-white">
                            <Ionicons name="pencil" size={14} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Info Card */}
                <View className="px-5 mb-8">
                    <View
                        className="bg-white rounded-[24px] p-6 w-full"
                        style={Platform.OS === 'android' ? { elevation: 2, shadowColor: '#000' } : { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10 }}
                    >
                        <ProfileField
                            icon="person-outline"
                            label="Full Name"
                            value={user?.name || 'Guest User'}
                        />
                        <ProfileField
                            icon="mail-outline"
                            label="Email"
                            value={user?.email || 'Not logged in'}
                        />
                        <ProfileField
                            icon="call-outline"
                            label="Phone number"
                            value={user?.phone ? String(user.phone) : 'Not provided'}
                        />
                        <ProfileField
                            icon="location-outline"
                            label="Address"
                            value={user?.address || 'Not provided'}
                            isLast={true}
                        />
                    </View>
                </View>

                {/* Actions */}
                <View className="px-5 gap-y-4 mb-10">
                    {isAdmin && (
                        <TouchableOpacity
                            className="w-full py-[18px] rounded-full border border-green-600 items-center justify-center bg-green-50/30"
                            onPress={() => router.push('/(admin)/dashboard')}
                        >
                            <Text className="text-green-600 font-bold text-[15px]">Admin Dashboard</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        className="w-full py-[18px] rounded-full border border-[#F59E0B] items-center justify-center bg-orange-50/30"
                        onPress={() => router.push('/edit-profile')}
                    >
                        <Text className="text-[#F59E0B] font-bold text-[15px]">Edit Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="w-full py-[18px] rounded-full border border-blue-600 items-center justify-center bg-blue-50/30"
                        onPress={() => router.push('/history')}
                    >
                        <Text className="text-blue-600 font-bold text-[15px]">Order History</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="w-full py-[18px] rounded-full border border-[#EF4444] items-center justify-center bg-red-50/40 flex-row gap-x-2"
                        onPress={handleLogout}
                    >
                        <Ionicons name="log-out-outline" size={20} color="#EF4444" style={{ transform: [{ rotate: '180deg' }] }} />
                        <Text className="text-[#EF4444] font-bold text-[15px]">Logout</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;