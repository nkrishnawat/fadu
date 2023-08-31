import { Button, Text, View, Image } from "react-native";
import {Dimensions} from 'react-native';

const dimensions = Dimensions.get('window');   
const imageWidth = dimensions.width;
const imageHeight = dimensions.height;

const Details = ({route, navigation} ) => {
    const { it } = route.params;
    const backToHome = () => navigation.navigate('Home');

    return (
    <View>
        <Image style={{height: imageHeight/2, width: imageWidth}} source={{ uri: it.picture.large }}/>
        <Button title="Add to CART" style={{with: '20%'}} onPress={() =>
        navigation.navigate('PaymentScreen')
        }>Add to CART.</Button>
    </View>);
}

export default Details;