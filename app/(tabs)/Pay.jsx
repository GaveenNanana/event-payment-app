import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Colors } from "../../constants/Colors";

export default function Pay() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  useEffect(() => {
    if (permission?.granted) {
      router.push("/scanner/Camera");  // Automatically navigate if permission is already granted
    }
  }, [permission]);

  const handlePress = async () => {
    if (!permission?.granted) {
      const response = await requestPermission();
      if (response.granted) {
        router.push("/scanner/Camera");
      } else {
        alert("Please allow camera access to continue.");
      }
    } else {
      router.push("/scanner/Camera");
    }
  };

  return (
  
<View style={{
            display:'flex',
            alignItems:'center',
            marginTop:40
        }}>

        <View style={styles.subContainer}>
            <Text style={{
                fontSize:30,
                fontFamily:'outfit-bold',
                textAlign:'center',
                padding:40,
            }}>Scan to pay</Text>
        <Image source={require('../../assets/images/scan.png')}
            style={{
                width:300,
                height:540,
            }}
        />
        </View>

         <TouchableOpacity
        onPress={handlePress}
        style={[styles.button, { backgroundColor: permission?.granted ? Colors.PRIMARY : "gray" }]}
         >
        <Text style={styles.buttonText}>
          {permission?.granted ? "Continue" : "Request Permission & Scan"}
        </Text>
        </TouchableOpacity>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 32,
    marginBottom: 20,
  },
  button: {
    backgroundColor:Colors.PRIMARY,
    padding:16,
    paddingHorizontal:32,
    borderRadius:99,
    marginTop: 32,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});