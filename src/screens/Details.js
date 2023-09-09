import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Text, View, Image, Pressable, StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { cartIT, setCartIT } from "./PaymentScreen";
import { useEffect, useState } from "react";

const dimensions = Dimensions.get('window');   
const imageWidth = dimensions.width;
const imageHeight = dimensions.height;

const Details = ({route, navigation} ) => {
    const [singleItem, setSingleItem] = useState([]);
    const { it } = route.params;
    const backToHome = () => navigation.navigate('Home');

    async function _getData()  {
        try {
            const arrOB = await AsyncStorage.getItem("cartItems");
            if(arrOB !== null) {
                console.log((arrOB));
                console.log(JSON.parse(arrOB).length);
                setSingleItem(JSON.parse(arrOB));
            }
        } catch (error) {
            alert('Err: ', error);
        }
    }


    useEffect(() => {
        _getData()
    }, []);


    async function _storeData(itemOB) {
        if(singleItem.filter(itemThis => itemThis.picture.thumbnail === itemOB.picture.thumbnail).length > 0) {
            alert('Item is already in the cart..');
            return;
        }

        //alert('PRE'+singleItem.length);
        singleItem.push(itemOB);
        //alert('POST'+singleItem.length);
        try {
            console.log('Pushed'+JSON.stringify(singleItem));
            await AsyncStorage.setItem(
                "cartItems", 
                JSON.stringify(singleItem)
            );
        } catch (error) {
            alert('Err: ', error);
        }
    }

    return (
    <View>
        <Image style={{height: imageHeight/2, width: imageWidth}} source={{ uri: it.picture.large }}/>
        <Pressable onPress= {() => {_storeData(it)}} title='Remove' style={({pressed})=> {
                    return [styles.row, {opacity: pressed? 0.3 : 1 }]
            }}>
            <Image style={styles.image} source={require("../../assets/Add2Order.png")}/>
            <Text style={styles.text}>Add to Order</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('PaymentScreen', {it: it}) } title='Remove' style={({pressed})=> {
                    return [styles.row, {opacity: pressed? 0.3 : 1 }]
            }}>
            <Image style={styles.image} source={require("../../assets/icons8-order-64.png")}/>
            <Text style={styles.text}>Checkout</Text>
        </Pressable>
        
    </View>);
}


const styles = StyleSheet.create({
      image: {
        width: 36,
        height: 36
      },
      row: {
        flexDirection: 'row'
      },
      text: {
        fontWeight: 'bold',
        margin: 10,
        color: 'grey'
      }
  });

export default Details;