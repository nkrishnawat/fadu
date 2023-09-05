import { CardField, useConfirmPayment, useStripe, BillingDetails, Address } from '@stripe/stripe-react-native';
import { Button, Text, View, Image, TextInput, StyleSheet} from "react-native";
import { useState } from 'react';

function PaymentScreen() {

    const { confirmPayment, loading } = useConfirmPayment();

    const [billingDetails, setBillingDetails] = useState({
        email: 'sample@gmail.com', 
        phone: '781 354 1793',
        name: 'Nagendra',
        address: '3626 1/2 Hughes Ave'
    });

    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currency: 'usd',
            }),
        });
        const { clientSecret } = await response.json();

        return clientSecret;
    };

    const handlePayPress = async () => {

    // Fetch the intent client secret from the backend
    const clientSecret = await fetchPaymentIntentClientSecret();

    // Confirm the payment with the card details
    const {paymentIntent, error} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      console.log('Payment confirmation error', error);
    } else if (paymentIntent) {
      console.log('Success from promise', paymentIntent);
    }
  };

   const handleInputChange = (type, val) => {
 
   }

    return (
        <View>

            <CardField
                postalCodeEnabled={true}
                placeholders={{
                    number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                }}
                style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                    console.log('cardDetails', cardDetails);
                }}
                onFocus={(focusedField) => {
                    console.log('focusField', focusedField);
                }}
            />

            <View style={styles.container}>
                <Text>Email:</Text>
                <TextInput
                    value={billingDetails.email}
                    //onChangeText={(text) => handleInputChange('email', text)}
                    style={styles.input} 
                />
                </View>

                <View style={styles.container}>
                <Text>Phone:</Text>
                <TextInput
                    value={billingDetails.phone}
                    //onChangeText={(text) => handleInputChange('phone', text)}
                    style={styles.input} 
                />
                </View>

                <View style={styles.container}>
                <Text>Name:</Text>
                <TextInput
                    value={billingDetails.name}
                    //onChangeText={(text) => handleInputChange('name', text)}
                    style={styles.input} 
                />
                </View>

                <View style={styles.container}>
                    <Text>Address:</Text>
                    <TextInput
                        value={billingDetails.address}
                        //onChangeText={(text) => handleInputChange('address', text)}
                        style={styles.input} 
                    />
                </View>
                

            <CardField
                onCardChange={(cardDetails) => console.log('cardDetails', cardDetails)} />
            <Button onPress={handlePayPress} title="Pay" disabled={loading} />
        </View>
    );
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
  });