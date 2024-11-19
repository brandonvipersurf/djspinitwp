import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import RenderHTML from "react-native-render-html"; // Install this library if not already installed
import { useWindowDimensions } from "react-native";

export default function App() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions(); // Get the screen width for responsive HTML rendering

  // Function to fetch the WordPress post
  const fetchPost = async () => {
    try {
      const response = await fetch(
        "https://test.vipersurf.com/wp-json/wp/v2/posts?slug=dj-spinit-profile",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const text = await response.text();
      console.log("Response text:", text);
      const data = await response.json();
      if (data.length > 0) {
        setPost(data[0]); // Use the first item in the array
      } else {
        console.error("No post found for the given slug.");
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
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Profile...</Text>
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{post.title.rendered}</Text>
      <Text style={styles.date}>
        {new Date(post.date).toLocaleDateString()}
      </Text>
      <RenderHTML
        contentWidth={width}
        source={{ html: post.content.rendered }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
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
