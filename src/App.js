import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StripeProvider } from '@stripe/stripe-react-native';
import Home from './screens/Home';
import Details from './screens/Details';
import PaymentScreen from './screens/PaymentScreen';
import SMS from './screens/SMS';
import SupplierLogin from './screens/SupplierLogin';
import ImagePickerExample from './screens/ImagePickerExample';

const Stack = createNativeStackNavigator();

const HeaderComponent = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.staticTextContainer}>
        <Pressable onPress={() => navigation.navigate('Login', {it: {}}) } title='Remove' style={({pressed})=> {
                    return [styles.row, {opacity: pressed? 0.3 : 1 }]
            }}>
            <Text style={styles.staticText}>F A D U       </Text>
        </Pressable>
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
          <Text style={styles.menuItem}>Women's Jewellery     ---</Text>
          <Text style={styles.supplierMenuItem} onPress={() => {
             navigation.navigate('SupplierLogin', {count: 1});
          }}>LogIn</Text>
          <Text style={styles.supplierMenuItem} onPress={() => {
             navigation.navigate('ImagePickerExample', {count: 1});
          }}>ImagePickerExample</Text>
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
        <Stack.Screen name='SupplierLogin' component={SupplierLogin}/>
        <Stack.Screen name='ImagePickerExample' component={ImagePickerExample}/>
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
  staticTextLogin: {
    fontWeight: 'bold',
    fontSize: 3,
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
  supplierMenuItem: {
    marginRight: 8,
    marginLeft: 6,
    fontSize: 10,
    color: 'green',
    textDecorationLine: 'underline'
  },
  divider: {
    color: '#ccc',
  },
});

export default MyStack;