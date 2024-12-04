import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { useWindowDimensions } from "react-native";

export default function App() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();

  const fetchPost = async () => {
    const username = "brandon"; // Replace with your WordPress username
    const password = "nEkOAKbGrEKH1@PQVvYLdiM#"; // Replace with your WordPress password
    const credentials = btoa(`${username}:${password}`); // Encode credentials

    try {
      const response = await fetch(
        "https://test.vipersurf.com/wp-json/wp/v2/posts?_embed=true",{
          headers: {
            Accept: "application/json",
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.length > 0) {
        setPost(data[0]);
      } else {
        console.error("No posts found.");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Post...</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Error loading post. Please try again later.</Text>
      </View>
    );
  }

  const htmlContent = post.content?.rendered || "<p>No content available</p>";

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{post.title.rendered}</Text>
      <Text style={styles.date}>
        {new Date(post.date).toLocaleDateString()}
      </Text>
      <RenderHTML contentWidth={width} source={{ html: htmlContent }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    color: "#888",
    marginBottom: 16,
  },
});
