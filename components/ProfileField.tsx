import { Ionicons } from '@expo/vector-icons';
import cn from 'clsx';
import { Text, View } from 'react-native';

interface ProfileFieldProps {
    icon: any;
    label: string;
    value: string;
    isLast?: boolean;
}

const ProfileField = ({ icon, label, value, isLast = false }: ProfileFieldProps) => {
    return (
        <View className={cn("flex-row items-center w-full", isLast ? "mb-0" : "mb-6")}>
            <View className="w-10 h-10 rounded-full bg-orange-50 items-center justify-center mr-4">
                <Ionicons name={icon} size={20} color="#F59E0B" />
            </View>
            <View className="flex-1">
                <Text className="text-gray-400 text-xs mb-1">{label}</Text>
                <Text className="text-black font-semibold text-[15px]">{value}</Text>
            </View>
        </View>
    );
}

export default ProfileField;
