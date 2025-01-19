import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";

export default function Pay() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>QR Code Scanner</Text>
      
      <TouchableOpacity onPress={requestPermission} style={styles.button}>
        <Text style={styles.buttonText}>Request Permissions</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={!permission?.granted}
        onPress={() => {
          if (permission?.granted) {
            router.push("/scanner/Camera");  // Navigate to scanner page
          } else {
            alert("Please allow camera access to continue.");
          }
        }}
        style={[
          styles.button,
          { backgroundColor: permission?.granted ? "#0E7AFE" : "gray" },
        ]}
      >
        <Text style={styles.buttonText}>Scan Code</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 32,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0E7AFE",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});