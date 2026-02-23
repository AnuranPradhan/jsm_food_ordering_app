import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { TabBarIconProps } from "@/type";
import cn from "clsx";
import { Redirect, Tabs } from "expo-router";
import { Image, Platform, Text, View } from "react-native";

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
    <View className="tab-icon flex-1 justify-center items-center h-full">
        <Image source={icon} className="size-6 mb-1" resizeMode="contain" tintColor={focused ? '#FE8C00' : '#5D5F6D'} />
        <Text className={cn('text-[11px] font-bold leading-none', focused ? 'text-primary' : 'text-gray-200')}>
            {title}
        </Text>
    </View>
)

export default function TabLayout() {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) return <Redirect href="/sign-in" />

    const isWeb = Platform.OS === 'web';

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                borderTopLeftRadius: isWeb ? 0 : 50,
                borderTopRightRadius: isWeb ? 0 : 50,
                borderBottomLeftRadius: isWeb ? 0 : 50,
                borderBottomRightRadius: isWeb ? 0 : 50,
                marginHorizontal: isWeb ? 0 : 20,
                height: isWeb ? 65 : 80,
                position: isWeb ? 'fixed' as any : 'absolute',
                bottom: isWeb ? 0 : 40,
                maxWidth: isWeb ? 480 : 'auto',
                width: '100%',
                backgroundColor: 'white',
                shadowColor: '#1a1a1a',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5,
                borderTopWidth: isWeb ? 1 : 0,
                borderTopColor: '#e5e5e5'
            }
        }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Home" icon={images.home} focused={focused} />
                }}
            />
            <Tabs.Screen
                name='search'
                options={{
                    title: 'Search',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Search" icon={images.search} focused={focused} />
                }}
            />
            <Tabs.Screen
                name='cart'
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Cart" icon={images.bag} focused={focused} />
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Profile" icon={images.person} focused={focused} />
                }}
            />
        </Tabs>
    );
}