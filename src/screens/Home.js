import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ScrollView, StyleSheet, ActivityIndicator, StatusBar, TouchableOpacity, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Home = ({route, navigation}) => {
  const {count} = route.params;

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

   const getUsers = (count) => {
    alert('Called with count ' + count)
    setIsLoading(true);
    axios.get(`https://randomuser.me/api/?page=${currentPage}&results=${count}`)
      .then(res => {
        alert('API call happened..')
        //setUsers(res.data.results);
        setUsers([...users, ...res.data.results]);
        setIsLoading(false); 
      });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemWrapperStyle}>
        <TouchableOpacity activeOpacity = {0.5} onPress={() =>
        navigation.navigate('Details', {it: item})
        }>
          <Image style={styles.itemImageStyle} source={{ uri: item.picture.large }}/>
        </TouchableOpacity>
        <View style={styles.contentWrapperStyle}>
          <Text style={styles.txtNameStyle}>{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
          <Text style={styles.txtEmailStyle}>{item.email}</Text>
        </View>
      </View>
    );
  };

  const renderLoader = () => {
    return (
      isLoading ?
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#aaa" />
        </View> : null
    );
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getUsers(count);
  }, [currentPage, count]);

  return (
    <>
      <StatusBar backgroundColor="#000" />
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.email}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
    </>
  );
};

const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemImageStyle: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: "space-around",
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    color: "#777",
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});

export default Home;