import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useState,useEffect} from 'react';
import { FlatList } from 'react-native-web';

export default function App() {
  const [allBlogs, setAllBlogs] = useState([]);
  const getAllBlogs= () => {
    var url = 'test.vipersurf.com/wp-json/wp/v2/posts?per_page=2';
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setAllBlogs(json);
      })
      .catch((error) => {
        console.error(error);})};

  console.log(allBlogs);

    useEffect(() => {
      getAllBlogs();
    });

  return (
    <View style={styles.container}>
      <FlatList
      data={allBlogs}
      keyExtractor={({id},index) => id}
      renderItem={({item}) => (
        <View>
          <Text>Blog ID: {item.id}</Text>
          <Text>Blog Title: {item.title.rendered}</Text>
          <Text>Blog Content: {item.content.rendered}</Text>
        </View>
      )}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:50,
  },
});
