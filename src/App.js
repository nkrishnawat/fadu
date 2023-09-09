import * as React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Details from './screens/Details';
import PaymentScreen from './screens/PaymentScreen';
import { StripeProvider } from '@stripe/stripe-react-native';
import { getUsers } from './screens/Home';
import SMS from './screens/SMS';


const Stack = createNativeStackNavigator();

const HeaderComponent = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.staticTextContainer}>
        <Text style={styles.staticText}>F A D U       </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.menuItems}>
          <Text style={styles.menuItem} onPress={() => {
             navigation.navigate('Home', {count: 1});
          }}>Ayurvedic</Text>
          <Text style={styles.divider}>|</Text>
          <Text style={styles.menuItem}  onPress={() => {
             navigation.navigate('Home', {count: 2});
          }}>Gifts</Text>
          <Text style={styles.divider}>|</Text>
          <Text style={styles.menuItem}   onPress={() => {
             navigation.navigate('Home', {count: 7});
          }}>HandBags</Text>
          <Text style={styles.divider}>|</Text>
          <Text style={styles.menuItem}>Mens TShirt</Text>
          <Text style={styles.divider}>|</Text>
          <Text style={styles.menuItem}>Women's Jewellery</Text>
          {/* Add more menu items as needed */}
        </View>
      </ScrollView>
    </View>
  );
};

const MyStack = () => {
  return (
    <StripeProvider
    publishableKey="pk_test_TYooMQauvdEDq54NiTphI7jx" 
    urlScheme="your-url-scheme" 
    merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}">
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header: ()=> <HeaderComponent/>,}}>
        <Stack.Screen
          name="Home"
          component={Home} initialParams={{count: 10}}/>
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="SMS" component={SMS}/>
      </Stack.Navigator>
    </NavigationContainer>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  staticTextContainer: {
    marginRight: 20,
  },
  staticText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem: {
    marginRight: 8,
    marginLeft: 6,
    fontSize: 10,
    color: 'grey'
  },
  divider: {
    color: '#ccc',
  },
});

export default MyStack;