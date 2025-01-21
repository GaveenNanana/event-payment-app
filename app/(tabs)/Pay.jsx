import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Colors } from "../../constants/Colors";

export default function Pay() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  useEffect(() => {
    if (permission && permission.granted) {
      // Just update state or UI instead of auto-navigation
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
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Scan to pay</Text>
        <Image
          source={require('../../assets/images/scan.png')}
          style={styles.image}
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
  subContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 30,
    fontFamily: "outfit-bold",
    textAlign: "center",
    padding: 40,
  },
  image: {
    width: 300,
    height: 540,
  },
  button: {
    padding: 16,
    paddingHorizontal: 32,
    borderRadius: 99,
    marginTop: 32,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});