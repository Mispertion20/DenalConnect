import { Text, View, StyleSheet, TextInput, ActivityIndicator, Button, Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import React, { useState } from 'react';
import {FirebaseAuth, FirebaseGoogleProvider} from '@/FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup } from "firebase/auth";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useRouter } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const auth = FirebaseAuth;

    const signIn = async () => {
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch(error) {
            console.log(error);
            alert('Incorrect email or password');
        } finally {
            setLoading(false);
        }
    }

    const signInWithGoogle = async () => {
        setLoading(true);
        try{
            const response = await signInWithPopup(auth, FirebaseGoogleProvider);
            console.log(response);
        } catch(error) {
            console.log(error);
            alert('Error!');
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Greate!');
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const resetPassword = async () => {
        const response = await sendPasswordResetEmail(auth, email);
    }

    return (
        <SafeAreaProvider>
            <KeyboardAvoidingView style={{flex:1}}>
                <SafeAreaView style={{flex: 1}}>
                    <View style={styles.container}>
                        <View style={styles.imageContainer}>
                            <Image source={require('@/assets/images/logo.png')} style={{width: '60%'}} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.headerText}>Welcome!</Text>
                            </View>
                            <View style={styles.formContainer}>
                                <View style={styles.inputFields}>
                                    <TextInput value={email} style={styles.input} placeholder='Email' placeholderTextColor={Colors.neutral.dark.l5} autoCapitalize="none" onChangeText={setEmail}></TextInput>
                                    <TextInput value={password} style={styles.input} placeholder='Password' placeholderTextColor={Colors.neutral.dark.l5} autoCapitalize="none" onChangeText={setPassword} secureTextEntry={true}></TextInput>
                                    <TouchableOpacity style={styles.forgotPasswordContainer} onPress={resetPassword}>
                                        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonsContainer}>
                                    {loading ? (
                                        <ActivityIndicator style={{marginTop: 20}} size="large" color="0000ff"/>
                                    ) : (
                                        <>
                                            <TouchableOpacity onPress={signIn} style={styles.loginButtonContainer}>
                                                <Text style={{color:Colors.neutral.light.l5, fontFamily: Fonts.i600, fontSize: 14}}>
                                                    Login
                                                </Text>
                                            </TouchableOpacity>
                                            <View style={styles.notAMemberContainer}>
                                                <Text style={styles.notAMemberText}>Not a member? </Text>
                                                <TouchableOpacity style={styles.registerButton} onPress={() => router.replace('/registration')}>
                                                    <Text style={{color:Colors.highlight.l1, fontFamily: Fonts.i600, fontSize: 12}}>Register now</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    )}
                                </View>
                            </View>
                            <View style={styles.line} />
                            <View style={styles.alternativeContainer}>
                                <Text style={styles.alternativeText}>
                                    Or continue with
                                </Text>
                                <TouchableOpacity style={{justifyContent: 'center', alignItems:'center', width: '100%'}} onPress={signInWithGoogle}>
                                    <AntDesign name="google" size={40} color="red"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>

        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    line: {
        borderWidth: 0.5,
        borderColor: Colors.neutral.light.l2
    },
    container: {
        flex:1,
        flexDirection: 'column',
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: Colors.neutral.light.l1,
        fontFamily: Fonts.i600,
        fontSize: 14,
        paddingVertical: 12, 
        paddingHorizontal: 16,
        backgroundColor: 'fff',
        marginBottom: 18,
    },
    imageContainer: {
        flex: 12/27,
        backgroundColor: Colors.highlight.l5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        paddingHorizontal: 24,
        paddingVertical: 40,
        flex: 19/27,
        flexDirection: 'column',
        gap: 24,
        backgroundColor: Colors.neutral.light.l5
    },
    headerContainer: {
        
    },
    headerText: {
        color: Colors.neutral.dark.l1,
        fontFamily: Fonts.i800,
        fontSize: 24,
        
    },
    formContainer: {
        flexDirection: 'column',
    },
    inputFields: {

    },
    forgotPasswordContainer: {

    },
    forgotPasswordText: {
        color: Colors.highlight.l1,
        fontFamily: Fonts.i600,
        fontSize: 12,
    },
    buttonsContainer: {
        flexDirection: 'column',
        gap: 15,
        marginTop: 20,
        alignItems: 'center'
    },
    loginButtonContainer: {
        width: '100%',
        padding: 12,
        backgroundColor: Colors.highlight.l1,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notAMemberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    notAMemberText: {
        color: Colors.neutral.dark.l4,
        fontSize: 12,
        fontFamily: Fonts.i400
    },
    alternativeContainer: {
        flexDirection:'column',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alternativeText: {
        color: Colors.neutral.dark.l4,
        fontSize: 12,
        fontFamily: Fonts.i400,
    },
    registerButton: {

    }
});
