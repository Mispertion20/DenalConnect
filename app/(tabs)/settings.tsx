import { Text, View, TouchableOpacity } from "react-native";
import { FirebaseAuth } from "@/FirebaseConfig";

export default function Settings() {
    const signOut =() => {
        FirebaseAuth.signOut();
    }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{
        fontFamily: "Inter_300Light"
      }}>Settings</Text>
    <TouchableOpacity style={{padding: 5, backgroundColor: 'black'}} onPress={signOut}>
        <Text style={{color: 'white'}}>Good bye {FirebaseAuth.currentUser?.email}</Text>
    </TouchableOpacity>
    </View>
  );
}
