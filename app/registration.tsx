import { Text, View, StyleSheet, TextInput, ActivityIndicator, Button, Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import React, { useState } from 'react';
import {FirebaseAuth, FirebaseGoogleProvider} from '@/FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup } from "firebase/auth";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConirm, setPasswordConfirm] = useState('');
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FirebaseAuth;

    const signUp = async () => {
        if(email==='' || password===''){
            alert('Empty fields!');
            return;
        }
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

    return (
        <SafeAreaProvider>
            <KeyboardAvoidingView style={{flex:1}}>
                <SafeAreaView style={{flex: 1}}>
                    <View style={styles.container}>
                        <Text>Sign up</Text>
                        <Text>Create account to get started</Text>
                        <Text>Name</Text>
                        <TextInput value={name} style={styles.input} placeholder='John' 
                        placeholderTextColor={Colors.neutral.dark.l5} autoCapitalize="none" 
                        onChangeText={setName}></TextInput>
                        <Text>Surname</Text>
                        <TextInput value={surname} style={styles.input} placeholder='Smith' 
                        placeholderTextColor={Colors.neutral.dark.l5} autoCapitalize="none" 
                        onChangeText={setSurname}></TextInput>
                        <Text>Email Address</Text>
                        <TextInput value={email} style={styles.input} placeholder='name@email.com' 
                        placeholderTextColor={Colors.neutral.dark.l5} autoCapitalize="none" 
                        onChangeText={setEmail}></TextInput>
                        <Text>Password</Text>
                        <TextInput value={password} style={styles.input} placeholder='Create a password' 
                        placeholderTextColor={Colors.neutral.dark.l5} autoCapitalize="none" 
                        onChangeText={setPassword} secureTextEntry={true}></TextInput>
                        <TextInput value={passwordConirm} style={styles.input} placeholder='Confirm password' 
                        placeholderTextColor={Colors.neutral.dark.l5} autoCapitalize="none" 
                        onChangeText={setPasswordConfirm} secureTextEntry={true}></TextInput>
                        {loading ? (
                            <ActivityIndicator size='large' color="0000ff" />
                        ) : (
                            <TouchableOpacity onPress={signUp}>
                                <Text>Register</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
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
});
