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
    try {
      const response = await fetch(
        "https://test.vipersurf.com/wp-json/wp/v2/posts?_embed=true",
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            Accept: "application/json",
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
        console.log("Data is:", data[0]);
      } else {
        console.error("No posts found.");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  const processShortcodes = (content) => {
    return content
      .replace(/\[et_pb_section.*?\]/g, "<div>") // Replace Divi sections with <div>
      .replace(/\[\/et_pb_section\]/g, "</div>")
      .replace(/\[et_pb_column.*?\]/g, '<div class="column">') // Replace columns
      .replace(/\[\/et_pb_column\]/g, "</div>")
      .replace(/\[et_pb_text.*?\]/g, "<p>") // Replace text
      .replace(/\[\/et_pb_text\]/g, "</p>");
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

  // Process shortcodes only when `post` is available
  const cleanedContent = processShortcodes(post.content?.rendered || "<p>No content available</p>");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{post.title.rendered}</Text>
      <Text style={styles.date}>
        {new Date(post.date).toLocaleDateString()}
      </Text>
      <RenderHTML contentWidth={width} source={{ html: cleanedContent }} />
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