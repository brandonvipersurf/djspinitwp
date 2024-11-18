import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

export default function App() {
  useEffect(() => {
    // Automatically open the URL when the component mounts
    WebBrowser.openBrowserAsync('https://test.vipersurf.com/dj-spinit-profile')
      .catch((error) => console.log("Error opening WebBrowser:", error));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Loading Profile...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  postContainer: {
    padding: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
