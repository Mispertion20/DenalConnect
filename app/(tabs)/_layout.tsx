import { Tabs } from "expo-router";
import { View, Pressable } from "react-native";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";

function HomeLogo() {
    return (
        <View style={{ 
            flexDirection: "row", 
            justifyContent: "space-between", 
            alignItems: "center", 
            width: "100%",
            backgroundColor: 'fff',
        }}>
            <Pressable onPress={() => alert("Search Pressed")}>
                <Octicons name="search" size={30} color={Colors.neutral.dark.l1} />
            </Pressable>
            <Pressable onPress={() => alert("Inbox Pressed")}>
                <Octicons name="inbox" size={30} color={Colors.neutral.dark.l1} />
            </Pressable>
        </View>
    );
}

export default function TabLayout() {
    return (
        <Tabs 
            screenOptions={{
                tabBarStyle: {
                    height: 80,
                    paddingTop: 12,
                    justifyContent: "center",             
                    borderTopWidth: 0,          
                    shadowOpacity: 0,     
                    elevation: 0,
                },
                tabBarLabelStyle: {
                    fontFamily: "Inter_400Regular",
                    fontSize: 10,
                },
                tabBarActiveTintColor: Colors.highlight.l2,
                tabBarInactiveTintColor: Colors.neutral.light.l1,
                tabBarLabelPosition: "below-icon",
                headerShadowVisible: false,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerTitle: () => <HomeLogo/>,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" size={24} color={color} />
                    ),
                    headerTitleContainerStyle: {
                        width:'100%',
                    }
                }}
            />
            <Tabs.Screen
                name="daily-routine"
                options={{
                    title: "Daily Routine",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="clock" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="chatbot"
                options={{
                    title: "Chatbot",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="comment-question" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="consultation"
                options={{
                    title: "Consultation",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-heart" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cog" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
