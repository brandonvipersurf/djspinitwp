import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useState,useEffect} from 'react';
import { FlatList } from 'react-native-web';

export default function App() {
  const [allBlogs, setAllBlogs] = useState([]);
  const getAllBlogs= () => {
    var url = 'test.vipersurf.com/wp-json';
    fetch(url,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setAllBlogs(JSON.stringify(json));
        console.log(JSON.stringify(json));
      })
      .catch((error) => {
        console.log(error);})};

  console.log(allBlogs);

    useEffect(() => {
      getAllBlogs();
    });

  return (
    console.log(allBlogs),
   <text>Hello World</text>,
  <div>{allBlogs}</div>)

    {/* <View style={styles.container}>
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
    </View> */}
  
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:50,
  },
});
