import { CardField, useConfirmPayment, useStripe, BillingDetails, Address } from '@stripe/stripe-react-native';
import { Button, Text, View, Image, TextInput, StyleSheet, Dimensions, FlatList, Pressable} from "react-native";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';


const dimensions = Dimensions.get('window');   
const imageWidth = dimensions.width;
const imageHeight = dimensions.height;

   function PaymentScreen({route, navigation}) {
    const [allItems, setAllItems] = useState([]);
    const { confirmPayment, loading } = useConfirmPayment();
    const {it} = route.params;

    async function _getData()  {
        try {
            const arrOB = await AsyncStorage.getItem("cartItems");
            if(arrOB !== null) {
                console.log((arrOB));
                console.log(JSON.parse(arrOB).length);
                setAllItems(JSON.parse(arrOB));
                //alert(JSON.parse(arrOB));
            }
        } catch (error) {
            alert('Err: ', error);
        }
    }

    async function _deleteItem(item_) {
        alert('before'+ allItems.length);
        for(i=0; i<999; i++) {console.log(i)}
        try {
            setAllItems(allItems.filter(na => na.picture.thumbnail != item_.picture.thumbnail))
            await AsyncStorage.clear();
            await AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys)).then(() => {
                alert('success'+ allItems.length);
                AsyncStorage.setItem(
                    "cartItems", 
                    JSON.stringify(allItems)
                )
            });
        } catch (e) {
            alert (e);
        }
    }

    useEffect(() => {
        _getData();
    }, []);

    const renderItem = ({ item }) => {
        return (
          <View style={styles.itemWrapperStyle}>
              <Image style={styles.itemImageStyle} source={{ uri: item.picture.large }}/>
            <View style={styles.contentWrapperStyle}>
              <Text style={styles.txtNameStyle}>{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
              <Text style={styles.txtEmailStyle}>{item.email}</Text>
            </View>
            <View>
                <Pressable onPress={() => {_deleteItem(item)} } title='Remove' style={({pressed})=> {
                            return [styles.row, {opacity: pressed? 0.3 : 1 }]
                    }}>
                    <Image style={styles.image} source={require("../../assets/delete.png")}/>
                    <Text style={styles.text}>Remove</Text>
                </Pressable>
            </View>
          </View>
        );
      };
    

    return (
    <View>
        <FlatList
        keyExtractor={item => item.picture.thumbnail}
        data={allItems}
        renderItem={renderItem}
      />
    </View>);
}

export default PaymentScreen;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', // Display items in a row
      alignItems: 'center', // Align items vertically in the center
      marginBottom: 10, // Add spacing between the rows
    },
    input: {
      flex: 1, // Allow the TextInput to take up remaining space in the row
    },
    itemWrapperStyle: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 8,
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
      image: {
        width: 30,
        height: 30
      },
      row: {
        flexDirection: 'row'
      },
      text: {
        fontWeight: 'bold',
        margin: 6,
        color: 'grey'
      }
  });