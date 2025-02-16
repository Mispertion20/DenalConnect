import { Stack, useRouter, useSegments } from "expo-router";
import { Inter_100Thin, Inter_200ExtraLight, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";
import {User} from 'firebase/auth';
import { FirebaseAuth } from "@/FirebaseConfig";
import { ActivityIndicator, View } from "react-native";
import { useRoute } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [user, setUser] = useState<User | null>(null);
    const [initializing, setInitializing] = useState(true);
    const segments = useSegments();
    const router = useRouter();
    const [loaded, error] = useFonts({
        Inter_900Black,
        Inter_100Thin,
        Inter_800ExtraBold,
        Inter_200ExtraLight,
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold
    }); 
    const onAuthStateChanged = (user: User | null) => {
        setUser(user);
        if(initializing) setInitializing(false);
    };

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    useEffect(() =>{
        const subscriber = FirebaseAuth.onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    useEffect(() => {
        if(initializing) return;
        const inAuthGroup = segments[0] === '(tabs)';
        if(user && !inAuthGroup) {
            router.replace('/(tabs)/home');
        } else if(!user && inAuthGroup) {
            router.replace('/');    
        }
    }, [user, initializing]);

    if (!loaded && !error) {
        return null;
    }

    if(initializing) {
        return (
            <View 
                style={{
                    alignItems: "center",
                    flex: 1,
                    justifyContent: 'center'
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <Stack screenOptions={{headerShown: false}} >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options = {{headerShown: false}}/>
            <Stack.Screen name="register" options = {{headerShown: false}}/>
        </Stack>
    );
}
