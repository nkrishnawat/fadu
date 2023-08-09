import { Button, Text, View, Image } from "react-native";

const Details = ({navigation}, {it}) => {

    const backToHome = () => navigation.navigate('Home');

    return (
    <View>
        <Text>Details Page</Text>
        <Image source={{ uri: it.picture.large }}/>
        <Button onPress={backToHome} title="Home" style={{with: '20%'}}>Home</Button>
    </View>);
}

export default Details;